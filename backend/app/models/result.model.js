const Joi = require('joi')
const {Quiz} = require('../models/quiz.model')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
    id: Joi.string(),
    userId: Joi.string(),
    quiz: Joi.object(),
    nbErreur: Joi.number(),
    nbCorrect: Joi.number(),
    nbAide: Joi.number(),
    dateJeu: Joi.string(),
    dureeJeu: Joi.number()
})