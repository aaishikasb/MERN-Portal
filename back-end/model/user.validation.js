// Importing Modules

const joi = require('@hapi/joi');

// Schemas

const registerValidation = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
});

const loginValidation = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
});

// Exports

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;