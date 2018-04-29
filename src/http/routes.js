const db = require('./../services/mysql');

const routes = (server) => {
	server.get('/', (req, resp, next) => {
		resp.send('working...');
		next();
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
		const { name } = req.params;

		db.persons().save(name)
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
};

module.exports = routes;
