const joi = require('joi');

const blogSchema = joi.object({
    title: joi.string().trim().required(),
    description: joi.string().trim().required(),
    category: joi.string().trim().required(),
    image: joi.string().trim().required(),
})

const updateBlogSchema = joi.object({
    title: joi.string().trim(),
    description: joi.string().trim(),
    category: joi.string().trim(),
    image: joi.string().trim()
}).min(1)

module.exports = { blogSchema, updateBlogSchema };