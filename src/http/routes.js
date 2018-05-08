const db = require('./../services/mysql');

const routes = (server) => {
	server.get('/', (req, resp, next) => {
		resp.send('working...');
		next();
	});

	server.post('/auth', (req, resp, next) => {
		const { email, password } = req.params;

		db.auth().autenticate(email, password)
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});


	server.get('/persons', (req, resp, next) => {
		db.persons().all()
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});

	server.post('/persons', (req, resp, next) => {
		const { name, email, password } = req.params;

		db.persons().save(name, email, password)
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});

	server.put('/persons', (req, resp, next) => {
		const { name, id } = req.params;

		db.persons().update(id, name)
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});

	server.del('/persons', (req, resp, next) => {
		const { id } = req.params;

		db.persons().del(id)
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});

	server.get('/cars', (req, resp, next) => {
		db.cars().all()
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});

	server.post('/cars', (req, resp, next) => {
		const { model, year, color } = req.params;

		db.cars().save(model, year, color)
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});

	server.put('/cars', (req, resp, next) => {
		const {
			model, year, color, id,
		} = req.params;

		db.cars().update(id, model, year, color)
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});

	server.del('/cars', (req, resp, next) => {
		const { id } = req.params;

		db.cars().del(id)
			.then((data) => {
				resp.send(data);
				next();
			})
			.catch((err) => {
				resp.send(err);
				next();
			});
	});
};

module.exports = routes;
