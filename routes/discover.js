var express = require('express');
var router = express.Router();
// var path = require('path');

var returnRouter = function(io) {

	router.get('/', function(req, res, next) {
		
		res.render('discover');

	})

	return router;

}

module.exports = returnRouter;