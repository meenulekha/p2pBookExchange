const express = require('express');
const passport = require('passport');
const passportConfig = require('./passport-config'); 
const app = express();

app.use(passport.initialize());

passportConfig(passport);

