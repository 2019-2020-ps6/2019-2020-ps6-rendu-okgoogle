const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
    id: Joi.number(),
    userId: Joi.number(),
    quizId: Joi.number(),
    nbMauvaiseReponses: Joi.number(),
    nbBonneReponses: Joi.number(),
    nbAide: Joi.number(),
    answers: Joi.array(),
    dateJeu: Joi.string(),
    dureeJeu: Joi.number()
})