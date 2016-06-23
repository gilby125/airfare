var express = require('express');
var router = express.Router();
var models = require("../models");
var Query = models.Query;
var utils = require("../models/utils.js");
var pg = require('pg');
var os = require('os');

// FOR SCRAPING SUBPROCESS
const path = require('path');
var exec = require('child_process').exec;
// var scrape = require("../assets/scrapers/sample")

// CONNECT TO DB
// https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=postgres+listen+notify+node
// var path = require('path');

var returnRouter = function(io) {

	var scraperInstances = [];

	setInterval(function() {
		console.log('Looking for instances to process ...');
		while (scraperInstances.length > 10) {
			scraperInstances[0]();
			scraperInstances.shift();
			console.log('Running scraper instance: ');
		}
		console.log('Instances left: ' + scraperInstances.length);
	}, 3000);

	// DATABASE REAL-TIME IO - NOTIFY/LISTEN
	// LOCALHOST - postgres://localhost:5432/airfare
	pg.connect("postgres://acswebafzhdjgj:xUR47oaC3peRZUcQ1dJyddYVvz@ec2-54-243-203-93.compute-1.amazonaws.com:5432/d29jidbh0qhh35", function(err, client) {
    if(err) {
        console.log(err);
    }
	    client.on('notification', function(msg) {
	        if (msg.name === 'notification' && msg.channel === 'table_update') {
	            var pl = JSON.parse(msg.payload);
	            // if new database entry's socket id matches connected socket, emit payload
	            io.sockets.connected['/#' + pl.socket].emit("new_result", pl);
	        }
	    });
	    client.query("LISTEN table_update");
	});


	// SOCKET IO
	io.on('connection', function(socket) {
		console.log(socket.id);
		socket.on('search', function (socketId) {
			console.log(socketId);
			Query.findOne({where: {socketId: socketId}})
				.then( function (row) {
					console.log(process.env.PATH);
					// var query = row.dataValues; // not used right now
					// https://github.com/travis-ci/travis-ci/issues/3894
					// http://stackoverflow.com/questions/7824789/nodejs-set-environment-variable-for-exec
					// temp workaround FOR PROCESS ENV PATH
					// TEMP LINKS
					var links = ["https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:JFK,to:PVG,departure:06/30/2016TANYT&leg2=from:PVG,to:JFK,departure:07/05/2016TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:Y&mode=search",
								"https://www.travelocity.com/Flights-Search?trip=roundtrip&leg1=from:JFK,to:PVG,departure:06/30/2016TANYT&leg2=from:PVG,to:JFK,departure:07/05/2016TANYT&passengers=children:0,adults:2,seniors:0,infantinlap:Y&mode=search",
								"https://www.priceline.com/fly/#/search/JFK-PVG-20160630/PVG-JFK-20160705/1?input-arm-key=3F4A050A3E4B050A4R3HH00liE%23TMsr3%3DzOrMA5963&max-slice-duration1=0&min-slice-duration1=0&max-slice-duration2=0&min-slice-duration2=0&max-slice-duration3=0&min-slice-duration3=0&max-slice-duration4=0&min-slice-duration4=0&max-slice-duration5=0&min-slice-duration5=0&direction=outbound&slice1-alts=LGA:EWR:SWF:HPN:ISP-SHA&slice2-alts=SHA-LGA:EWR:SWF:HPN:ISP&country-code=US&v=",
								"http://www.vayama.com/home/searching.jsp?s=1226604703&vayamaVisit=0&clickThrough=N&originArray=JFK,PVG&destArray=PVG,JFK&dateArray=30052016,05062016&cabinClass=Y&carrPreferance=&noAdults=1&noSenior=0&noChild=0&noInfants=0&noStudents=0&nonStops=&timeArray=0,0,0,0&couponCode=&tripType=RT&random=0.5462337048197792",
								"https://www.orbitz.com/Flights-Search?affcid=ORBITZ-US.SRCOMP.PHG.CHEAPFLIGHTS.CHECKRATES-DESKTOP-13.FLIGHT&afflid=FLT.JFK.PVG&trip=roundtrip&leg1=from:JFK,to:PVG,departure:6/30/2016TANYT&leg2=from:PVG,to:JFK,departure:7/5/2016TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:Y&options=cabinclass:economy,sortby:price&mode=search&paandi=true"]
					

					var ota = ['expedia', 'travelocity', 'priceline', 'vayama', 'orbitz'];
					// var phantomJSPath = '/Users/fullstack/airfare_scraper/scraper/phantomjs-2.1.1-macosx/bin';
					// var phantomJSPath = 'phantomjs'
					console.log(__dirname);
					
					links.forEach(function (link, index) {
						var scraperPath = path.resolve(__dirname, '../scraper/' + ota[index] + '.js');
						console.log(scraperPath);
						var cmd = 'casperjs ' + scraperPath + ' --url="' + link + '" --socketId="' + socketId + '"';
						// Start Individual CasperJS Scraper Instance
						// exec(cmd, { env: { PATH: process.env.PATH + ':' + phantomJSPath}}, function(error, stdout, stderr) {
						// 	console.log("STDOUT: " + stdout);
						// });
						scraperInstances.push(function() {
							exec(cmd, function(error, stdout, stderr) {
													console.log(os.freemem());
													console.log("STDOUT: " + stdout);
												});
						})
					});

				})
				.then( function (row) {
					// temp
					// getQueriesFromDatabase(socket);
				})
				.catch("oops");
		});
	});

	router.get('/', function(req, res, next) {

		res.render('search');

	})

	router.post('/', function(req, res, next) {
		var form = req.body;
		var itinerary = utils.parseItinerary(form);
		var query = Query.build ( {
			tripType: req.body['trip-type'],
			itinerary: itinerary,
			cabinClass: req.body['cabin-class'],
			numPassengers: req.body['num-passengers'],
			socketId: req.body['user-id']
		})
		query.save()
			.then(function(savedEntry) {
			})
			.catch(function (error) {
				console.log(error);
			})

		console.log(req.body);
		res.end();
		// res.redirect('/search');
	})

	return router;

}

module.exports = returnRouter;