const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      // check if username or email exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists.' });
      }
  
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

  //function to generate JWT token
function generateJWTToken(user) {
    const jwt = require('jsonwebtoken');
    function generateJWTToken(user) {
        const payload = {
            id: user.id,
        };
        const secretKey = 'tgifhgir'; 
        const options = {
            expiresIn: '1h' 
        };
        return jwt.sign(payload, secretKey, options);
    }
    const secretKey = 'tgifhgir'; 
    
    const payload = {
      id: user._id
    };
  
    const options = {
      expiresIn: '1h' 
    };
  
    return jwt.sign(payload, secretKey, options);
  }

router.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You are authorized to access this route.' });
  });

module.exports = router;

  