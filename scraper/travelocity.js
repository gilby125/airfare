var casper = require('casper').create();
casper.options.waitTimeout = 20000;

// GLOBAL DATA TO SEND TO DATABASE
var globalInfo = {};

// url
// https://www.travelocity.com/Flights-Search?trip=roundtrip&leg1=from:JFK,to:PVG,departure:06/30/2016TANYT&leg2=from:PVG,to:JFK,departure:07/05/2016TANYT&passengers=children:0,adults:2,seniors:0,infantinlap:Y&mode=search

// Test URL
// var url = casper.cli.get('url');
var socketId = casper.cli.get('socketId');

casper.start(casper.cli.get('url'), function() {
	globalInfo.socketId = socketId;
	// this.echo(socketId);
 //    this.echo(this.getTitle());
});

casper.waitForSelector('#flightModule0', function() {
	// this.captureSelector('prices.png', '#flightModule0')
	// var page = this.getHTML('#flightModule0');

	var price = this.evaluate(function() {
		return document.querySelector('#flightModule0 .dollars').textContent;
	})
	var duration = this.evaluate(function() {
		return document.querySelector('#flightModule0 .duration-emphasis').textContent;
	})

	// this.echo(price);
	// this.echo(duration);

	globalInfo.price = price;
	globalInfo.duration = duration;

});

casper.then(function(){
   casper.thenOpen("http://localhost:3001/api", {
      method: 'post',
      data: {
      		ota: 'TRAVELOCITY-US',
            price: globalInfo.price,
            duration: globalInfo.duration,
            url: '',
            socket: globalInfo.socketId
        }
   });
   this.echo('TRAVELOCITY STATUS: POST SUCCESS!\tSOCKET ID: ' + socketId);
});

casper.run();