'use strict';

const controller = require('./controller');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: controller.index
  }, {
    method: 'GET',
    path: '/events',
    config: controller.events
  }, {
    method: 'POST',
    path: '/events',
    config: controller.create
  }
]