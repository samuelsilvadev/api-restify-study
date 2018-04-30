const test = require('ava');
const { connection, errorHandler } = require('./setup');

const personsModule = require('./../persons')({ connection, errorHandler });

function _clearPersonTable() {
	return connection.query('TRUNCATE TABLE persons');
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
