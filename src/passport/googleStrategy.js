const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK,
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
