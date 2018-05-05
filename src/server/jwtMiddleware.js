const jwt = require('jsonwebtoken');

const jwtMiddleware = () => {
	return async (req, resp, next) => {
		const token = req.headers['x-access-token'];

		if (!token) {
			resp.send(403, {
				error: 'Token not found',
			});
			return;
		}

		await jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, decoded) => {
			if (error) {
				resp.send(403, {
					error: 'Fail to autenticate with this token',
				});
			} else {
				req.decoded = decoded;
			}
		});

		next();
	};
};

module.exports = jwtMiddleware;
