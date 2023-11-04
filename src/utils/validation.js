const Joi = require('joi');

const letterSchema = Joi.object({
    sender: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
    }),
    recipient: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
    }),
    content: Joi.string().required(),
});

const customMessages = {
    'any.required': '{{#label}} is required.',
    'string.base': '{{#label}} must be a string.',
    'string.empty': '{{#label}} cannot be empty.',
};

module.exports = {
    letterSchema,
    customMessages,
};