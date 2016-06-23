var casper = require('casper').create();
casper.options.waitTimeout = 40000;
// GLOBAL DATA TO SEND TO DATABASE
var globalInfo = {};

// url
// http://www.vayama.com/home/searching.jsp?s=1226604703&vayamaVisit=0&clickThrough=N&originArray=JFK,PVG&destArray=PVG,JFK&dateArray=30052016,05062016&cabinClass=Y&carrPreferance=&noAdults=1&noSenior=0&noChild=0&noInfants=0&noStudents=0&nonStops=&timeArray=0,0,0,0&couponCode=&tripType=RT&random=0.5462337048197792

// Test URL
// var url = casper.cli.get('url');
var socketId = casper.cli.get('socketId');

casper.start(casper.cli.get('url'), function() {
	globalInfo.socketId = socketId;
	this.echo(socketId);
    this.echo(this.getTitle());
});

casper.waitForSelector('.resultItinBox', function() {
	// this.captureSelector('prices.png', '#flightModule0')
	// var page = this.getHTML('#flightModule0');
	var price = this.evaluate(function() {
		return document.querySelector('.resultItinBox .price').textContent;
	})
	var duration = this.evaluate(function() {
		return document.querySelector('.resultItinBox .resFlightDuration').textContent;
	})

	// this.echo(price);
	// this.echo(duration);

	globalInfo.price = price;
	globalInfo.duration = duration;

});
// http://localhost:3001/api
casper.then(function(){
   casper.thenOpen("https://mighty-sierra-61956.herokuapp.com/api", {
      method: 'post',
      data: {
      		ota: 'VAYAMA-US',
            price: globalInfo.price,
            duration: globalInfo.duration,
            url: '',
            socket: globalInfo.socketId
        }
   });
   this.echo('VAYAMA STATUS: POST SUCCESS!\tSOCKET ID: ' + socketId);
});

casper.run();