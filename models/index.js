// Database connection

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/airfare');

var Query = db.define('query', {
	uid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tripType: {
		type: Sequelize.ENUM('roundTrip', 'oneWay', 'multiDest'),
		allowNull: false
	},
	itinerary: {
		type: Sequelize.JSON(),
		allowNull: false
	},
	cabinClass: {
		type: Sequelize.ENUM('economy', 'premium', 'business', 'first')
		allowNull: true
		defaultValue: 'economy'
	}
});

module.exports = {
	Query: Query
};