const joi = require('joi');

const passwordComplexity = joi.string()
    .min(8)
    .pattern(new RegExp('(?=.*[A-Z])'))
    .pattern(new RegExp('(?=.*[0-9])'))
    .pattern(new RegExp('(?=.*[!@#$%^&*])'))
    .required()
    .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and one special character',
        'string.min': 'Password must be at least 8 characters long',
    });

const signUpSchema = joi.object({
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    password: passwordComplexity,
    image: joi.string().trim().optional()
});

const loginSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required()
});

module.exports = { signUpSchema, loginSchema };