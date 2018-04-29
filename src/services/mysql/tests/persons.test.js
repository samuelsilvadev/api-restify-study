require('dotenv').config();
const test = require('ava');
const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE_TEST,
});

const errorHandler = (error, msg, rejectFunction) => {
	console.error(error);
	rejectFunction({ error: msg });
};

const personsModule = require('./../persons')({ connection, errorHandler });

test('create person', async (t) => {
	const result = await personsModule.save('samuel');
	t.is(result.person.name, 'samuel');
});

test('update person', async (t) => {
	const result = await personsModule.update(1, 'katty');
	t.is(result.person.name, 'katty');
});

test('delete person', async (t) => {
	const result = await personsModule.del(1);
	t.is(result.affectedRows, 1);
});
