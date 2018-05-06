const restify = require('restify');
const server = restify.createServer();
const routes = require('./../http/routes');
const cors = require('./../server/cors');
const jwtMiddleware = require('./jwtMiddleware');

const exclusionsRoutes = ['/auth'];

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());
server.use(jwtMiddleware({ exclusions: exclusionsRoutes }));

routes(server);

module.exports = server;
