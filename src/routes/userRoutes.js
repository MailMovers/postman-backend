const express = require('express');
const userRoute = express.Router();
const passport = require('passport');

const { UserController } = require('../controllers');
const userController = new UserController();

userRoute.post('/signup', userController.signUp);
userRoute.post('/emailauth', userController.emailAuth);
userRoute.post('/authnumber-check', userController.checkAuthNumber);

// social login
userRoute.get('/kakao', passport.authenticate('kakao', { session: false }));
userRoute.get(
    '/kakao/callback',
    passport.authenticate('kakao', { session: false }),
    userController.kakaoLogin
);

module.exports = userRoute;
