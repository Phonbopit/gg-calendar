'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const lib = require('./lib');
const routes = require('./routes');

server.connection({
  host: 'localhost',
  port: 2345
});

server.route(routes);

server.start(() => {
  console.log(`Server is running at ${server.info.uri}`);
});