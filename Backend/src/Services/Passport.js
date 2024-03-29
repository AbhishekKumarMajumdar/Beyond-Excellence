const GoogleStategy = require('passport-google-oauth20')
const passport = require('passport')
require('dotenv').config();

passport.use(
    new GoogleStategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "/auth/google/callback",
            scope:['profile','email'],
        },
        function (accessToken,refreshToken,profile,callback){
            // user object to store the data of the google account
            callback(null,profile);

        }
    )
);

passport.serializeUser((user,done)=>{
    done(null,user)
});

passport.deserializeUser((user,done)=>{
    done(null,user);
})