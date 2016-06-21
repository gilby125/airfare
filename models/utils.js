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

	}
}

module.exports = utils;