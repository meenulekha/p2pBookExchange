const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  // Add other fields as needed
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
