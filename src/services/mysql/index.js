const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'profiles',
});

const errorHandler = (error, msg, rejectFunction) => {
	console.error(error);
	rejectFunction({ error: msg });
};

const personsModule = require('./persons')({ connection, errorHandler });

module.exports = {
	persons: () => personsModule,
};
