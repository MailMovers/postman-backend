const passport = require('passport');
const { Strategy: NaverStrategy } = require('passport-naver-v2');

module.exports = () => {
    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.NAVER_ID,
                clientSecret: process.env.NAVER_SECRET,
                callbackURL: process.env.NAVER_CALLBACK,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    done(null, profile);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};
