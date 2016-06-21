var express = require('express');
var router = express.Router();
// var path = require('path');

// Router takes in Socket IO as a parameter.
// http://stackoverflow.com/questions/29872317/express-4-routes-using-socket-io

var returnRouter = function() {

	router.get('/', function(req, res, next) {
		
		res.render('index');

	})

	return router;

}

module.exports = returnRouter;