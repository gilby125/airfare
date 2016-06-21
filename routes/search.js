var express = require('express');
var router = express.Router();
var models = require("../models");
var Query = models.Query;

// var path = require('path');


var returnRouter = function(io) {

	router.get('/', function(req, res, next) {

		res.render('search');

	})

	router.post('/', function(req, res, next) {
		var query = Query.build ( {

			
		})
		res.redirect('/search');
	})

	return router;

}

module.exports = returnRouter;