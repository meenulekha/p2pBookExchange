// Import necessary modules
const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const User = require('../models/User');

router.post('/join-community', async (req, res) => {
    try {
      const { communityId } = req.body;
      const user = req.user; 
      
      const community = await Community.findById(communityId);
      if (!community) {
        return res.status(404).json({ message: 'Community not found.' });
      }
  
      user.communities.push(community);
      await user.save();
  
      res.status(200).json({ message: 'User joined the community successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

module.exports = router;
