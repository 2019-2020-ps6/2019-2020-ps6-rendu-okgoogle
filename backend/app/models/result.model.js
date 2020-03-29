const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
    id: Joi.number(),
    userId: Joi.number(),
    quizId: Joi.number(),
    nbErreur: Joi.number(),
    nbCorrect: Joi.number(),
    nbAide: Joi.number(),
    resultQuestions: Joi.array(),
    dateJeu: Joi.string(),
    dureeJeu: Joi.number()
})