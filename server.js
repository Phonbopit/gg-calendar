'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 2345
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({message: 'Hello World'});
  }
});

server.start(() => {
  console.log(`Server is running at ${server.info.uri}`);
});