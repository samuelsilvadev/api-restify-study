const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'profiles',
});

const personsModule = require('./persons')({ connection });

module.exports = {
	persons: () => personsModule,
};
