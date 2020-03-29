const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
    id: Joi.number(),
    name: Joi.string().required(),
    surname: Joi.string(),
    age: Joi.number(),
    sexe: Joi.string(),
    description: Joi.string(),
    img: Joi.string()
})
