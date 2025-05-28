const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE).then((con) => {
        console.log("Database connected successfully");
    })
}

module.exports = connectDB;