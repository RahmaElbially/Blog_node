const User = require('../models/User');
const APIError = require('../utils/errors/APIError');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users.length) {
            throw new APIError('No Users in database', 404);
        }
        res.status(200).json({ message: 'Users fetched successfully', data: users });
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new APIError('User not found', 404);
        }
        res.status(200).json({ message: 'User fetched successfully', data: user });
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase();
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'Email already exists, Please login.' });
        }
        const newUser = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', data: newUser })
    } catch (err) {
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    const user = req.body;
    user.email = user.email.toLowerCase();

    let foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
        return res.status(400).json({ message: 'Invalid Email / Password' });
    };

    let checkPass = await bcrypt.compare(user.password, foundUser.password);
    if (!checkPass) {
        return res.status(400).json({ message: "Invalid Email / Password" });
    };

    let token = await jwt.sign(
        {
            id: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email
        },
        process.env.SECRETKEY,
        { expiresIn: "24h" }
    );

    res.status(200).json({
        message: 'Logged In successfully',
        token,
        user: {
            image: foundUser.image
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    loginUser
}