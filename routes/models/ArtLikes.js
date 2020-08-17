const mongoose = require('mongoose')

const ArtLikesSchema = new mongoose.Schema({
  IdAPI: { type: String },
  likes: { type: Boolean },
  dislikes: { type: Boolean},
  data: { type: Object }

});

module.exports = mongoose.model('ArtLikes', ArtLikesSchema);