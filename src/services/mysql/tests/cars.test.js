const test = require('ava');
const { connection, errorHandler } = require('./setup');

const carsModule = require('./../cars')({ connection, errorHandler });

function _clearCarsTable() {
	return connection.query('TRUNCATE TABLE cars;');
}

test.beforeEach(t => _clearCarsTable());
test.after.always(t => _clearCarsTable());

test('create car', async (t) => {
	const result = await carsModule.save('GOL', 2004, 'pink');
	t.is(result.car.modelCar, 'GOL');
	t.is(result.car.yearCar, 2004);
	t.is(result.car.colorCar, 'pink');
});

test('update car', async (t) => {
	const savedCar = await carsModule.save('GOL', 2008, 'red');
	const result = await carsModule.update(savedCar.car.carID, 'GOL 101', 2009, 'blue');
	t.is(result.car.modelCar, 'GOL 101');
	t.is(result.car.yearCar, 2009);
	t.is(result.car.colorCar, 'blue');
	t.is(result.affectedRows, 1);
});

test('delete car', async (t) => {
	const savedCar = await carsModule.save('GOL TO DELETE', 2020, 'red');
	const result = await carsModule.del(savedCar.car.carID);
	t.is(result.affectedRows, 1);
	t.is(result.message, 'Car removed successfully!');
});

test('select 4 cars', async (t) => {
	await carsModule.save('GOL', 2021, 'red');
	await carsModule.save('GOL', 2022, 'red');
	await carsModule.save('GOL', 2023, 'red');
	await carsModule.save('GOL', 2008, 'red');

	const allList = await carsModule.all();

	t.is(allList.cars.length, 4);
	t.is(allList.cars[0].modelCar, 'GOL');
});
