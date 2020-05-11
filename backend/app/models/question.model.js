const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    id:Joi.string(),
    label: Joi.string(),
    imgUrl: Joi.string().allow(''),
    sonUrl: Joi.string().allow(''),
    nomFichier: Joi.string().allow(''),
    indice: Joi.string().allow(''),
    aideUtilise: Joi.boolean(),
    answers: Joi.array(),
    quizId: Joi.number()
})