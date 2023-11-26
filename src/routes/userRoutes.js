const express = require('express');
const userRoute = express.Router();

const { UserController } = require('../controllers');
const userController = new UserController();

userRoute.post('/signup', userController.signUp);
userRoute.post('/emailauth', userController.emailAuth);

module.exports = userRoute;
