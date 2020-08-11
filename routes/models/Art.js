const mongoose = require('mongoose')

const ArtSchema = new mongoose.Schema({
  IdAPI: {type: String },
  owner: { type: String, default: 'unknown' },
  subject: { type: String, default: '' },
  article: { type: String, default: '' }
});

module.exports = mongoose.model('Blog', BlogSchema);