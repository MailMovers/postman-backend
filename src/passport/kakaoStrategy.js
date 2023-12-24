const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

module.exports = () => {
    passport.use(
        new kakaoStrategy(
            {
                clientID: process.env.KAKAO_KEY,
                callbackURL: process.env.KAKAO_CALLBACK,
            },

            async (accessToken, refreshToken, profile, done) => {
                try {
                    done(null, profile);
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            }
        )
    );
};
