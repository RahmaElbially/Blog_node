const router = require('express').Router();
const blogsController = require('../controllers/blogs.controller');
const blogSchema = require('../utils/validations/blogValidation');
const validationMW = require('../middlewares/validation.middleware');
const protectMW = require('../middlewares/protect.middleware');

router
    .route('/')
    .get(blogsController.getBlogs)
    .post(
        protectMW,
        validationMW(blogSchema.blogSchema),
        blogsController.createBlog
    )

router
    .route('/:id')
    .get(
        // protectMW,
        blogsController.getBlogById
    )

router
    .route('/:id')
    .patch(
        protectMW,
        validationMW(blogSchema.updateBlogSchema),
        blogsController.updateBlog
    )

router
    .route('/:id')
    .delete(
        protectMW,
        blogsController.deleteBlog
    )

module.exports = router