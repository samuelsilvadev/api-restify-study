const restify = require('restify');
const server = restify.createServer();
const routes = require('./../http/routes');
const cors = require('./../server/cors');

server.pre(cors.preflight);
server.use(cors.actual);

routes(server);

module.exports = server;
