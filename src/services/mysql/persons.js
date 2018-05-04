const sha1 = require('sha1');
const personsModule = deps => (
	({
		all: () => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
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
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
				if (!name) {
					reject(new Error('name is a required Parameter'));
					return;
				}

				connection.query('INSERT INTO persons(personName, personEmail, personPassword) VALUES (?, ?, ?);', [name, email, sha1(password)], (error, results) => {
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
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
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
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
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
