// required modules
const LocalStrategy = require('passport-local').Strategy;
const User = require('./Schemas/user');

// module exports
module.exports = (passport) => {
    passport.use('login', new LocalStrategy((username, password, done) => {

        // verify credentials
        User.findOne({username: username, password: password}).then(data => {

            // if not credentials verified
            if (!data) {
                return done(null, false, {message: "Incorrect Username or Password"});
            } else {        // if credentials verified
                return done(null, {
                    username: data.username
                });
            }
        }).catch(err=> {
            return done(err);
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.username);
        console.log(user);
    });

    passport.deserializeUser((username, done) => {
        done(null, {username: username});
    });
}