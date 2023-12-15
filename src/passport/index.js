const passport = require('passport');

const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');

module.exports = (app) => {
    app.use(passport.initialize());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    kakao();
    naver();
};
