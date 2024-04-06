// Import necessary modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import your User model
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

// Define local strategy for Passport.js
passport.use(new LocalStrategy({
    usernameField: 'email', // Assuming users login with email
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find the user by email in the database
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      // Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      // If user and password are correct, return the user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Define JWT strategy for Passport.js
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your-secret-key' // Replace with your own secret key
  },
  async (jwtPayload, done) => {
    try {
      // Find the user by ID from JWT payload
      const user = await User.findById(jwtPayload.id);
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      // If user is found, return the user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Export passport for usage in other files
module.exports = passport;


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  