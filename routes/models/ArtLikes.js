const mongoose = require('mongoose')

const ArtLikesSchema = new mongoose.Schema({
  IdAPI: { type: String },
  likes: { type: Boolean },
  dislikes: { type: Boolean},
  data: { type: Object },
  owner: { type: String, default: 'unknown' },
  subject: { type: String, default: '' },
  article: { type: String, default: '' }
});

module.exports = mongoose.model('ArtLikes', ArtLikesSchema);