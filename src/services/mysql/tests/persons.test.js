const test = require('ava');
const { connection, errorHandler } = require('./setup');

const personsModule = require('./../persons')({ connection, errorHandler });

function _clearPersonTable() {
	return connection.query('TRUNCATE TABLE persons;');
}

test.beforeEach(() => _clearPersonTable());
test.after.always(() => _clearPersonTable());

test('create person', async (t) => {
	const result = await personsModule.save('samuel');
	t.is(result.person.name, 'samuel');
});

test('update person', async (t) => {
	const result = await personsModule.update(1, 'katty');
	t.is(result.person.name, 'katty');
	t.is(result.affectedRows, 1);
});

test('delete person', async (t) => {
	const result = await personsModule.del(1);
	t.is(result.affectedRows, 1);
});

test('select 4 persons', async (t) => {
	await personsModule.save('samuel');

	const allList = await personsModule.all();

	t.is(allList.persons.length, 1);
	t.is(allList.persons[0].personName, 'samuel');
});

test('create person with empty name', async (t) => {
	const result = await t.throws(personsModule.save());
	t.is(result.message, 'name is a required Parameter');
});
