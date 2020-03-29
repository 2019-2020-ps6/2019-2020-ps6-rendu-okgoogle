const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Statistic', {
    quizzesId: Joi.array().required()
})