const Blog = require("../models/Blog");
const User = require('../models/User');
const APIError = require('../utils/errors/APIError');

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ isDeleted: false }).populate({
            path: 'userId',
            select: "firstName lastName email image"
        });
        if (!blogs.length) {
            throw new APIError('No blogs in database', 404);
        }
        res.status(200).json({ message: 'Fetched blogs successfully', data: blogs });
    } catch (err) {
        next(err);
    }
}

const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false }).populate({
            path: 'userId',
            select: "firstName lastName email image"
        });
        if (!blog) {
            throw new APIError('Post not found', 404);
        }
        res.status(200).json({ message: 'Post fetched successfully', data: blog })
    } catch (err) {
        next(err);
    }
}

const createBlog = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            throw new APIError('User not found', 404);
        }

        const blog = await Blog.create({
            userId: userId,
            ...req.body
        });
        res.status(201).json({ message: 'Post added successfully', data: blog });
    } catch (err) {
        next(err);
    }
}

const updateBlog = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            throw new APIError('Post not found', 404);
        }

        if (blog.userId.toString() != userId) {
            throw new APIError('You are not authorized to update this post', 403)
        }

        const updatedData = { ...blog.toObject(), ...req.body };

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Post updated successfully', data: updatedBlog })
    } catch (err) {
        next(err);
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            throw new APIError('Post not found', 404);
        }

        if (blog.userId.toString() != userId) {
            throw new APIError('You are not authorized to delete this post', 403)
        }

        blog.isDeleted = true;
        await blog.save();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}
