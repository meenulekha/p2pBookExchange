// Import necessary modules
const express = require('express');
const passport = require('passport');
const passportConfig = require('./passport-config'); // Import your Passport.js configuration
const app = express();

app.use(passport.initialize());

passportConfig(passport);

