const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchemaDb = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: [true, 'Already Exist, Please Login'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8
        },
        image: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

userSchemaDb.pre('save', async function (next) {
    try {
        let hashedPassword = await bcrypt.hash(this.password, parseInt(process.env.SALT));
        this.password = hashedPassword;
        this.email = this.email.toLowerCase();
        next()
    } catch (err) {
        next(err);
    }
})

module.exports = mongoose.model('User', userSchemaDb)