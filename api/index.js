const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('../db');
const serverless = require('serverless-http');
const app = express();

// General Steps
connectDB();
app.use(express.json());
app.use(morgan('dev'))
const corsOptions = {
    origin: [
        "https://blogs-nu-ruby.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true,
};

app.use(cors(corsOptions));

// File Imports
const errorHandling = require('../middlewares/errorHandling.middleware');
const usersRouter = require('../routes/users.route');
const blogsRouter = require('../routes/blogs.route');


// Routes
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);

// Error Handling
app.use(errorHandling);

module.exports = serverless(app);

// app.listen(process.env.PORT, () => {
//     console.log(`Server is listening on port ${process.env.PORT}`);
// })
