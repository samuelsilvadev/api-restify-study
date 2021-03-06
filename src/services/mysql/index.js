const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const errorHandler = (error, msg, rejectFunction) => {
	console.error(error);
	rejectFunction({ error: msg });
};

const personsModule = require('./persons')({ connection, errorHandler });
const carsModule = require('./cars')({ connection, errorHandler });
const authModule = require('./auth')({ connection, errorHandler });

module.exports = {
	persons: () => personsModule,
	cars: () => carsModule,
	auth: () => authModule,
};
