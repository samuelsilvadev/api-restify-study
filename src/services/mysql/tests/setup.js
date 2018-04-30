require('dotenv').config();
const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE_TEST,
});

const errorHandler = (error, msg, rejectFunction) => {
	rejectFunction(error);
};


module.exports = {
	connection,
	errorHandler,
};
