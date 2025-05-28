const mongoose = require('mongoose');

const blogSchemaDb = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        category: {
            type: String,
            trim: true,
            required: true,
            default: 'Development',
        },
        image: {
            type: String,
            default: null,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchemaDb);