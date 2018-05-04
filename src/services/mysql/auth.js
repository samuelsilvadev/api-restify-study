const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

const authModule = (deps) => {
	return {
		autenticate: (email, password) => {
			return new Promise((resolve, reject) => {
				const { connection } = deps;
				const queryString = 'SELECT personID as id, personName as name FROM persons WHERE personEmail = ? AND personPassword = ? LIMIT 1;';
				const queryData = [email, sha1(password)];

				connection.query(queryString, queryData, (error, results) => {
					if (error || !results.length) {
						reject(new Error('Error to autenticate'));
						return;
					}

					const secondsInDay = 60 * 60 * 24;
					const { id, name } = results[0];
					const token = jwt.sign(
						{ id, email },
						process.env.JWT_TOKEN_SECRET,
						{ expiresIn: secondsInDay },
					);

					resolve({
						person: {
							id, name, email, token,
						},
					});
				});
			});
		},
	};
};

module.exports = authModule;
