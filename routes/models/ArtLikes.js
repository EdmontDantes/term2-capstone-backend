const mongoose = require('mongoose')

const ArtLikesSchema = new mongoose.Schema({
  ObjectIdAPI: { type: String },
  likes: { type: Boolean },
  data: { type: Object }

});

module.exports = mongoose.model('ArtLikes', ArtLikesSchema);