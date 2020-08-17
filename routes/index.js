const express = require('express');
const router = express.Router();
const ArtLikes = require('./models/ArtLikes')

/* GET home page. */
router.get('/art-likes', (req, res, next) => {
  ArtLikes.find().then((AllFoundLikes) => {
    res.send('success your get art-likes route works')
  })

});

router.put('/art-likes', (req, res, next) => {

  
});

module.exports = router;
