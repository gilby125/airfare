// PhantomJS, CasperJS, SpookyJS, Cheerio, NodeJS and Coffeescript

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scraper = function (data) {

	request({
	    method: 'GET',
	    url: 'https://github.com/showcases'
	}, function(err, response, body) {
		console.log('thioos');
	    if (err) return console.error(err);

	    // Tell Cherrio to load the HTML
	    $ = cheerio.load(body);
	    $('h3').each(function() {
	          console.log($(this).text());
	    });
	});
}

module.exports = scraper;