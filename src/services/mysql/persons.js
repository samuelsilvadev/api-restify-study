
const personsModule = (deps) => {
	return {
		all: () => {
			const { connection, errorHandler } = deps;
			return new Promise((reject, resolve) => {
				connection.query('SELECT * FROM persons;', (error, results) => {
					if (error) {
						errorHandler(
							error,
							'Error to list users',
							reject,
						);
						return;
					}

					resolve({ persons: results });
				});
			});
		},
		save: (name) => {
			const { connection, errorHandler } = deps;

			if (!name) {
				errorHandler(null, 'name is a required Parameter', (data) => { console.error(data); });
				return Promise.reject();
			}

			return new Promise((reject, resolve) => {
				connection.query('INSERT INTO persons(personName) VALUES (?);', [name], (error, results) => {
					if (error) {
						errorHandler(
							error,
							'Error to save person',
							reject,
						);
					}

					resolve({ person: { name, personID: results.insertId } });
				});
			});
		},
		update: (id, name) => {
			const { connection, errorHandler } = deps;

			return new Promise((reject, resolve) => {
				connection.query('UPDATE persons SET personName = ? WHERE personID = ?;', [name, id], (error) => {
					if (error) {
						errorHandler(
							error,
							'Error to updata person',
							reject,
						);
					}

					resolve({ person: { name, personID: id } });
				});
			});
		},
		del: (id) => {
			const { connection, errorHandler } = deps;

			return new Promise((reject, resolve) => {
				connection.query('DELETE FROM persons WHERE personID = ?;', [id], (error) => {
					if (error) {
						errorHandler(
							error,
							'Error to delete a person',
							reject,
						);
					}

					resolve({ message: 'Person removed successfully!' });
				});
			});
		},
	};
};

module.exports = personsModule;
