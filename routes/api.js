var express = require('express');
var router = express.Router();
var models = require("../models");
var Results = models.Results;
var utils = require("../models/utils.js");

var returnRouter = function(io) {

	router.get('/', function(req, res, next) {
		res.send('api here');
	})

	router.post('/', function(req, res, next) {
		console.log(req.body);
		var form = req.body;
		var result = Results.build ( {
			ota: req.body['ota'],
			price: req.body['price'],
			duration: req.body['duration'],
			url: req.body['url'],
			socket: req.body['socket']
		})
		result.save()
			.then(function(savedEntry) {

			})
			.catch(function(error) {
				console.log(error);
			})
		res.end();
		// var itinerary = utils.parseItinerary(form);
		// var query = Query.build ( {
		// 	tripType: req.body['trip-type'],
		// 	itinerary: itinerary,
		// 	cabinClass: req.body['cabin-class'],
		// 	numPassengers: req.body['num-passengers'],
		// 	socketId: req.body['user-id']
		// })
		// query.save()
		// 	.then(function(savedEntry) {
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	})

		// console.log(req.body);
		// res.end();
		// res.redirect('/search');
	})

	return router;

}

module.exports = returnRouter;