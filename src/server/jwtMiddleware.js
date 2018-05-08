const jwt = require('jsonwebtoken');

const jwtMiddleware = (exclusionRoutes) => {
	return async (req, resp, next) => {
		if (!exclusionRoutes.exclusions.includes(req.href())) {
			const token = req.headers['x-access-token'];

			if (!token) {
				resp.send(403, {
					error: 'Token not found',
				});
				return;
			}
			try {
				req.decoded = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
			} catch (error) {
				resp.send(403, {
					error: 'Fail to autenticate with this token',
				});
				return;
			}
		}
		next();
	};
};

module.exports = jwtMiddleware;
