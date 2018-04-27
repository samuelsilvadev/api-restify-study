
const personsModule = (deps) => {
	return {
		all: () => {
			const { connection } = deps;
			return new Promise((reject, resolve) => {
				connection.query('SELECT * FROM persons;', (error, results) => {
					if (error) {
						reject(new Error(error));
					}

					resolve({ persons: results });
				});
			});
		},
		save: (name) => {
			const { connection } = deps;

			return new Promise((reject, resolve) => {
				connection.query(`INSERT INTO persons(name) VALUES (${name});`, (error, results) => {
					if (error) {
						reject(new Error(error));
					}

					resolve({ persons: results });
				});
			});
		},
		update: (id, name) => {},
		del: (id) => {},
	};
}

module.exports = personsModule;
