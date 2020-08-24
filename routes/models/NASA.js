const mongoose = require('mongoose')

const NASALikesSchema = new mongoose.Schema({
  ObjectIdAPI: { type: String },
  likes: { type: Boolean },
  data: { type: Object }

});

module.exports = mongoose.model('NASALikes', NASALikesSchema);