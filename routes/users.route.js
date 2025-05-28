const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const validationMW = require('../middlewares/validation.middleware');
const userSchema = require('../utils/validations/userValidation');

router
    .route('/')
    .get(usersController.getUsers)
    .post(validationMW(userSchema.signUpSchema), usersController.createUser);

router
    .route('/:id')
    .get(usersController.getUserById);

router
    .route('/login')
    .post(validationMW(userSchema.loginSchema), usersController.loginUser);

module.exports = router;