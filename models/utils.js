var utils = {
	parseItinerary: function(form) {
		var itinObj = {};
		if (form['trip-type'] == 'roundTrip') {
			itinObj['departing-airport'] = form['departing-airport'];
			itinObj['arrival-airport'] = form['arrival-airport'];
			itinObj['departure-date'] = form['depart-date'];
			itinObj['return-date'] = form['return-date'];
			return itinObj;
		}
	},
	database: 'postgres://acswebafzhdjgj:xUR47oaC3peRZUcQ1dJyddYVvz@ec2-54-243-203-93.compute-1.amazonaws.com:5432/d29jidbh0qhh35',
	api: 'https://mighty-sierra-61956.herokuapp.com/api',
	phantomJSPath: '/Users/fullstack/airfare_scraper/scraper/phantomjs-2.1.1-macosx/bin',
	herokuDBPath: 'postgres://acswebafzhdjgj:xUR47oaC3peRZUcQ1dJyddYVvz@ec2-54-243-203-93.compute-1.amazonaws.com:5432/d29jidbh0qhh35',
	localDBPath: 'postgres://localhost:5432/airfare',
	herokuAPIPath: 'https://mighty-sierra-61956.herokuapp.com/api',
	localAPIPath: 'http://localhost:3001/api'
}

module.exports = utils;