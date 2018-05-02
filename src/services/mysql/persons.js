
const personsModule = deps => (
	({
		all: () => {
			const { connection, errorHandler } = deps;

			return new Promise((resolve, reject) => {
				connection.query('SELECT personID, personName, personEmail FROM persons;', (error, results) => {
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
		save: (name, email = '', password = '') => {
			const { connection, errorHandler } = deps;

			return new Promise((resolve, reject) => {
				if (!name) {
					errorHandler(new Error('name is a required Parameter'), 'name is a required Parameter', reject);
					return;
				}

				connection.query('INSERT INTO persons(personName, personEmail, personPassword) VALUES (?, ?, ?);', [name, email, password], (error, results) => {
					if (error) {
						errorHandler(
							error,
							'Error to save person',
							reject,
						);
						return;
					}

					resolve({ person: { name, email, personID: results.insertId } });
				});
			});
		},
		update: (id, name) => {
			const { connection, errorHandler } = deps;

			return new Promise((resolve, reject) => {
				connection.query('UPDATE persons SET personName = ? WHERE personID = ?;', [name, id], (error, results) => {
					if (error || !results.affectedRows) {
						errorHandler(
							error,
							'Error to update person',
							reject,
						);
						return;
					}

					resolve({ person: { name, personID: id }, affectedRows: results.affectedRows });
				});
			});
		},
		del: (id) => {
			const { connection, errorHandler } = deps;

			return new Promise((resolve, reject) => {
				connection.query('DELETE FROM persons WHERE personID = ?;', [id], (error, results) => {
					if (error || !results.affectedRows) {
						errorHandler(
							error,
							'Error to delete a person',
							reject,
						);
						return;
					}

					resolve({ message: 'Person removed successfully!', affectedRows: results.affectedRows });
				});
			});
		},
	})
);

module.exports = personsModule;
