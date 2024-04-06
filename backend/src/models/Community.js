const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  size: Int32Array,
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
