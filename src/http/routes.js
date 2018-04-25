const routes = (server) => {
	server.get('/', (req, resp, next) => {
		resp.send('working...');
		next();
	});

	server.get('/profile', (req, resp, next) => {
		resp.send(['1', 'Samuel', 'samuelsilvadev.github.io', 'Fortaleza - CE']);
		next();
	});

	server.post('/profile', (req, resp, next) => {
		const { name, website, place } = req.params;
		resp.send({ name, website, place });
		next();
	});
};

module.exports = routes;
