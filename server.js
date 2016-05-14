'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const lib = require('./lib');

server.connection({
  host: 'localhost',
  port: 2345
});

server.route([{
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({message: 'Hello World'});
  }
}, {
  method: 'POST',
  path: '/create',
  handler: (request, reply) => {

    let payload = request.payload;

    let summary = payload.summary;
    let description = payload.description;
    let email = payload.email;
    let startDate = payload.startDate;
    let endDate = payload.endDate;

    lib.authorize((err, auth) => {
      if (err) return reply(err);

      let options = lib.eventBuilder(payload);

      lib.createEvent(options, (err, result) => {
        if (err) return reply(err);

        return reply(result);
      });
    })
  }
}]);

server.start(() => {
  console.log(`Server is running at ${server.info.uri}`);
});