'use strict';

const validate = require('./validate');
const lib = require('./lib');

module.exports = {

  index: {
    handler: (request, reply) => {
      reply({
        message: 'Google Calendar API'
      });
    }
  },

  create: {
    validate: validate.create,
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
        options.auth =  auth;

        lib.createEvent(options, (err, result) => {
          if (err) return reply(err);

          return reply(result);
        });
      });
    }
  },

  events: {
    handler: (request, reply) => {
      
      lib.authorize((err, auth) => {
        if (err) return reply(err);

        lib.listEvents(auth, (err, response) => {
          if (err) return reply(err);

          return reply(response);
        });
      });
    }
  }
}