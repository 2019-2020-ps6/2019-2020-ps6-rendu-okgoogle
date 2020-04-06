const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
    id: Joi.string(),
    userId: Joi.string(),
    quizId: Joi.string(),
    nameQuiz: Joi.string(),
    dateQuiz: Joi.string(),
    nbErreur: Joi.number(),
    nbCorrect: Joi.number(),
    nbAide: Joi.number(),
    questions: Joi.array(),
    answers: Joi.array(),
    dateJeu: Joi.string(),
    dureeJeu: Joi.number()
})