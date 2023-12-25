const express = require('express');
const userRoute = express.Router();
const passport = require('passport');
const auth = require('../middlewares/auth.middleware');

const { UserController } = require('../controllers');
const userController = new UserController();

userRoute.post('/signup', userController.signUp);
userRoute.post('/emailauth', userController.emailAuth);
userRoute.post('/authnumber-check', userController.checkAuthNumber);
userRoute.post('/signin', userController.signIn);

// kakao login
userRoute.get('/kakao', passport.authenticate('kakao', { session: false }));
userRoute.get(
    '/kakao/callback',
    passport.authenticate('kakao', { session: false }),
    userController.kakaoLogin
);

// naver login
userRoute.get('/naver', passport.authenticate('naver', { authType: 'reprompt', session: false }));
userRoute.get(
    '/naver/callback',
    passport.authenticate('naver', { session: false }),
    userController.naverLogin
);

// google login
userRoute.get(
    '/google',
    passport.authenticate('google', { session: false, scope: ['email', 'profile'] })
);
userRoute.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    userController.googleLogin
);

// regenerate access token
userRoute.post('/refresh', userController.refresh);

// get user-info
userRoute.get('/info', auth, userController.getUserInfo);

// update password
userRoute.post('/update-password', auth, userController.updatePassword);

module.exports = userRoute;
