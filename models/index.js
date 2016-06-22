// Database connection

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/airfare', {
	logging: false
});

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
		type: Sequelize.ENUM('economy', 'premium', 'business', 'first'),
		allowNull: true,
		defaultValue: 'economy'
	},
	numPassengers: {
		type: Sequelize.INTEGER(),
		allowNull: true,
		defaultValue: 1
	},
	socketId: {
		type: Sequelize.STRING(),
		allowNull: true,
		defaultValue: ""
	}
});

var Results = db.define('results', {
	uid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	ota: {
		type: Sequelize.STRING(),
		allowNull: false
	},
	price: {
		type: Sequelize.STRING(),
		allowNull: false
	},
	duration: {
		type: Sequelize.STRING(),
		allowNull: false
	},
	url: {
		type: Sequelize.STRING(),
		allowNull: true
	},
	socket: {
		type: Sequelize.STRING(),
		allowNull: true
	}
});

module.exports = {
	Query: Query,
	Results: Results
};