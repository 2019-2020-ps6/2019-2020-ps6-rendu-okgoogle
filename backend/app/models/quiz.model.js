const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  id:Joi.string(),
  name: Joi.string().required(),
  imageUrl:Joi.string().required(),
  questions: Joi.array(),
  creationDate: Joi.date(),
  themeId: Joi.string().required()
})