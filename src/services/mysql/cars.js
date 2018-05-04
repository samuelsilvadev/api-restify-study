const _table = 'cars';
const carsModule = deps => (
	({
		all: () => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
				connection.query(`SELECT * FROM ${_table};`, (error, results) => {
					if (error) {
						errorHandler(
							error,
							'Error to list cars',
							reject,
						);
						return;
					}

					resolve({ cars: results });
				});
			});
		},
		save: (modelCar, yearCar, colorCar) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
				connection.query(`INSERT INTO ${_table}(modelCar, yearCar, colorCar) VALUES (?, ?, ?);`, [modelCar, yearCar, colorCar], (error, results) => {
					if (error) {
						errorHandler(
							error,
							'Error to save car',
							reject,
						);
						return;
					}

					resolve({
						car: {
							modelCar, yearCar, colorCar, carID: results.insertId,
						},
					});
				});
			});
		},
		update: (id, modelCar, yearCar, colorCar) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
				connection.query(`UPDATE ${_table} SET modelCar = ?, yearCar = ?, colorCar = ? WHERE carID = ?;`, [
					modelCar,
					yearCar,
					colorCar,
					id,
				], (error, results) => {
					if (error || !results.affectedRows) {
						errorHandler(
							error,
							'Error to update car',
							reject,
						);
						return;
					}

					resolve({
						car: {
							modelCar, yearCar, colorCar, carID: id,
						},
						affectedRows: results.affectedRows,
					});
				});
			});
		},
		del: (id) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
				connection.query(`DELETE FROM ${_table} WHERE carID = ?;`, [id], (error, results) => {
					if (error || !results.affectedRows) {
						errorHandler(
							error,
							'Error to delete car',
							reject,
						);
						return;
					}

					resolve({ message: 'Car removed successfully!', affectedRows: results.affectedRows });
				});
			});
		},
	})
);

module.exports = carsModule;
