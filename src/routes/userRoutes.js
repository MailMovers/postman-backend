const express = require('express');
const userRoute = express.Router();

const { userController } = require('../controllers');
const { signUpController } = userController;

userRoute.post('/signup', signUpController);

module.exports = userRoute;
