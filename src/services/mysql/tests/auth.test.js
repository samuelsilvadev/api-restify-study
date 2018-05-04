const test = require('ava');
const { connection, errorHandler } = require('./setup');

const personsModule = require('./../persons')({ connection, errorHandler });
const authModule = require('./../auth')({ connection, errorHandler });

function _clearPersonTable() {
	return connection.query('TRUNCATE TABLE persons;');
}

test.beforeEach(() => _clearPersonTable());
test.after.always(() => _clearPersonTable());

test('it does login - success', async (t) => {
	await personsModule.save('samuel', 'samuelteste1@gmail.com', '123456');
	const result = await authModule.autenticate('samuelteste1@gmail.com', '123456');

	t.not(result, null);
	t.not(result.person.token, null);
	t.not(result.person.token.length, 0);
	t.is(result.person.id, 1);
	t.is(result.person.name, 'samuel');
	t.is(result.person.email, 'samuelteste1@gmail.com');
});

test('it does login - fail', async (t) => {
	await personsModule.save('samuel', 'samuelteste1@gmail.com', '123456');
	const promise = authModule.autenticate('koko@gmail.com', '123456');
	const result = await t.throws(promise);

	t.is(result.message, 'Error to autenticate');
});
