const LocalStrategy = require('passport-local').Strategy
const bcyrpt = require('bcrypt')


const initialize = (passport, getUserByEmail) => {
    const autheticateUser = async (email, password, done) =>  {
        const user = getUserByEmail(email) 
        if (user == null) {
            // done must be returned from the function 
            // first parameter is the error 
            // second parameter is the user, in this case no user was found 
            // third parameter is an optional message 
            return done(null, false, {message: "Incorrect Email: No user found with that email"}) 
        }
        try { 
            // bcrypt.compare() takes in the provided password, followed 
            // by the hashed password 
            if (await bcyrpt.compare(passport, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (error) {
            return done(error)
        }
    }

    // password = password by default (no need to provide in options )
    passport.use(new LocalStrategy({usernameField: "email"}, autheticateUser )) 

    // serialization 
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize