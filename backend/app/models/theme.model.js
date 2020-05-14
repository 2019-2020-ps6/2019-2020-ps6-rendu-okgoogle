const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
  id:Joi.string(),
  name: Joi.string().required(),
  imageUrl: Joi.string().required(),
  quiz:Joi.array()
})