const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db');
const app = express();

// General Steps
connectDB();
app.use(express.json());
app.use(morgan('dev'))
const corsOptions = {
    credentials: true,
    origin: ["http://localhost:5173", "https://blogs-nu-ruby.vercel.app/"]
};
app.use(cors(corsOptions));

// File Imports
const errorHandling = require('./middlewares/errorHandling.middleware');
const usersRouter = require('./routes/users.route');
const blogsRouter = require('./routes/blogs.route');


// Routes
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

// Error Handling
app.use(errorHandling);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})