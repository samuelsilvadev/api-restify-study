
const personsModule = (deps) => {
	return {
		all: () => {
			const { connection, errorHandler } = deps;
			return new Promise((reject, resolve) => {
				connection.query('SELECT * FROM persons;', (error, results) => {
					if (error) {
						errorHandler(
							error,
							'Error to list  users',
							reject,
						);
						return;
					}

					resolve({ persons: results });
				});
			});
		},
		save: (name) => {
			const { connection } = deps;

			return new Promise((reject, resolve) => {
				connection.query(`INSERT INTO persons(personName) VALUES (${name});`, (error, results) => {
					if (error) {
						reject(new Error(error));
					}

					resolve({ persons: results });
				});
			});
		},
		update: (id, name) => { },
		del: (id) => { },
	};
}

module.exports = personsModule;
