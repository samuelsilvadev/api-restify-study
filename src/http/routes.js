const routes = (server) => {
	server.get('/', (req, resp, next) => {
		resp.send('working...');
		next();
	});
};

module.exports = routes;
