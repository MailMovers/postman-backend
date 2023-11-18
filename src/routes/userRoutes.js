const express = require('express');
const userRoute = express.Router();

const { userController } = require('../controllers');
const { siginUpController } = userController;

userRoute.post('/signup', siginUpController);

module.exports = userRoute;
