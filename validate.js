'use strict';

const Joi = require('joi');

module.exports = {
  create: {
    payload: {
      email: Joi.string().email().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required()
    }
  }
}