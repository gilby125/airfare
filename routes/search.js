var express = require('express');
var router = express.Router();
// var path = require('path');


var returnRouter = function(io) {

	router.get('/', function(req, res, next) {

		res.render('search');

	})

	router.post('/', function(req, res, next) {
		console.log(req.body);
		res.redirect('/search');
	})

	return router;

}

module.exports = returnRouter;