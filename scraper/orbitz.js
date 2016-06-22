var casper = require('casper').create();
casper.options.waitTimeout = 20000;

// GLOBAL DATA TO SEND TO DATABASE
var globalInfo = {};


// url
// https://www.orbitz.com/Flights-Search?affcid=ORBITZ-US.SRCOMP.PHG.CHEAPFLIGHTS.CHECKRATES-DESKTOP-13.FLIGHT&afflid=FLT.JFK.PVG&trip=roundtrip&leg1=from:JFK,to:PVG,departure:6/30/2016TANYT&leg2=from:PVG,to:JFK,departure:7/5/2016TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:Y&options=cabinclass:economy,sortby:price&mode=search&paandi=true
// Test URL
// var url = casper.cli.get('url');
var socketId = casper.cli.get('socketId');

casper.start(casper.cli.get('url'), function() {
	globalInfo.socketId = socketId;
	// this.echo(socketId);
 //    this.echo(this.getTitle());
});

casper.waitForSelector('.flex-content', function() {
	// this.captureSelector('prices.png', '#flightModule0')
	// var page = this.getHTML('#flightModule0');

	var price = this.evaluate(function() {
		return document.querySelector('.flex-content .dollars').textContent;
	})
	var duration = this.evaluate(function() {
		return document.querySelector('.flex-content .duration-emphasis').textContent;
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
      		ota: 'ORBITZ-US',
            price: globalInfo.price,
            duration: globalInfo.duration,
            url: '',
            socket: globalInfo.socketId
        }
   });
   this.echo('ORBITZ STATUS: POST SUCCESS!\tSOCKET ID: ' + socketId);
});

casper.run();