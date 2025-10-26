const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('../db');
const app = express();

// General Steps
connectDB();
app.use(express.json());
app.use(morgan('dev'))

// const corsOptions = {
//     origin: [
//         "https://blogs-nu-ruby.vercel.app",
//         "http://localhost:5173"
//     ],
//     credentials: true,
// };
app.use(cors());

// File Imports
const errorHandling = require('../middlewares/errorHandling.middleware');
const usersRouter = require('../routes/users.route');
const blogsRouter = require('../routes/blogs.route');


// Routes
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

// Error Handling
app.use(errorHandling);

module.exports = app;

/*
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})
*/