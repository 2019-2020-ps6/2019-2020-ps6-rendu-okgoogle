const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    id:Joi.string(),
    label: Joi.string().required(),
    indice: Joi.string(),
    aideUtilise: Joi.boolean(),
    answers: Joi.array(),
    quizId: Joi.number()
})