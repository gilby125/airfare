var express = require('express');
var router = express.Router();
var models = require("../models");
var Query = models.Query;
var utils = require("../models/utils.js");

// var path = require('path');


var returnRouter = function(io) {

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
			numPssengers: req.body['num-passengers']
		})
		query.save()
			.then(function(savedEntry) {
				// do something with savedEntry
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