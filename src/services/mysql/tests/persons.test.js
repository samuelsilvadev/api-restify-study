const test = require('ava');
const { connection, errorHandler } = require('./setup');

const personsModule = require('./../persons')({ connection, errorHandler });

function _clearPersonTable() {
	return connection.query('TRUNCATE TABLE persons;');
}

test.beforeEach(() => _clearPersonTable());
test.after.always(() => _clearPersonTable());

test('create person', async (t) => {
	const result = await personsModule.save('samuel', 'samuelteste@gmail.com');
	t.is(result.person.name, 'samuel');
	t.is(result.person.email, 'samuelteste@gmail.com');
});

test('update person', async (t) => {
	const savedPerson = await personsModule.save('samuel');
	const result = await personsModule.update(savedPerson.person.personID, 'katty');
	t.is(result.person.name, 'katty');
	t.is(result.affectedRows, 1);
});

test('delete person', async (t) => {
	const savedPerson = await personsModule.save('samuel');
	const result = await personsModule.del(savedPerson.person.personID);
	t.is(result.affectedRows, 1);
});

test('select 1 persons', async (t) => {
	await personsModule.save('samuel');

	const allList = await personsModule.all();

	t.is(allList.persons.length, 1);
	t.is(allList.persons[0].personName, 'samuel');
});

test('create person with empty name', async (t) => {
	const promise = personsModule.save();
	const result = await t.throws(promise);

	t.is(result.message, 'name is a required Parameter');
});
