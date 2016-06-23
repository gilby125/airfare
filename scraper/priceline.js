var casper = require('casper').create();
casper.options.waitTimeout = 40000;
// GLOBAL DATA TO SEND TO DATABASE
var globalInfo = {};

// url
// https://www.priceline.com/fly/#/search/JFK-PVG-20160630/PVG-JFK-20160705/1?input-arm-key=3F4A050A3E4B050A4R3HH00liE%23TMsr3%3DzOrMA5963&max-slice-duration1=0&min-slice-duration1=0&max-slice-duration2=0&min-slice-duration2=0&max-slice-duration3=0&min-slice-duration3=0&max-slice-duration4=0&min-slice-duration4=0&max-slice-duration5=0&min-slice-duration5=0&direction=outbound&slice1-alts=LGA:EWR:SWF:HPN:ISP-SHA&slice2-alts=SHA-LGA:EWR:SWF:HPN:ISP&country-code=US&v=

// Test URL
// var url = casper.cli.get('url');
var socketId = casper.cli.get('socketId');

casper.start(casper.cli.get('url'), function() {
	globalInfo.socketId = socketId;
	this.echo(socketId);
    this.echo(this.getTitle());
});

casper.waitForSelector('.top .clearfix', function() {
	// this.captureSelector('prices.png', '#flightModule0')
	// var page = this.getHTML('#flightModule0');
	console.log('got here');
	var price = this.evaluate(function() {
		return document.querySelector('.top .dollar').textContent;
	})
	var duration = this.evaluate(function() {
		return document.querySelector('.top .slice-duration').textContent;
	})

	// this.echo(price);
	// this.echo(duration);

	globalInfo.price = price;
	globalInfo.duration = duration;

});

casper.then(function(){
   casper.thenOpen("https://mighty-sierra-61956.herokuapp.com/api", {
      method: 'post',
      data: {
      		ota: 'PRICELINE-US',
            price: globalInfo.price,
            duration: globalInfo.duration,
            url: '',
            socket: globalInfo.socketId
        }
   });
   this.echo('PRICELINE STATUS: POST SUCCESS!\tSOCKET ID: ' + socketId);
});

casper.run();