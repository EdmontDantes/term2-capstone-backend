const express = require('express');
const router = express.Router();
const ArtLikes = require('./models/ArtLikes');
const { restart } = require('nodemon');

/* GET home page. */
router.get('/art-likes', (req, res, next) => {
  ArtLikes.find().then((AllFoundLikes) => {
    // res.send('success your get art-likes route works')
    console.log('You get request is working for all find artlikes here\'s what is going to be passed down to frontend:', AllFoundLikes)
    return res.status(200).json({AllFoundLikes: AllFoundLikes})
  })

});

router.put('/art-likes', (req, res, next) => {
  console.log('Blank route loggged out works');
  // console.log('Req.body passed data', req.body);
  let { objectID } = req.body;
  // res.send("I'm a blank put route for now")
  ArtLikes.find({ObjectIdAPI: objectID}).then((foundObject) => {
    console.log('found object', foundObject);
    if(!foundObject.length) {
      let newArtLikeOfAnObject = new ArtLikes()
      if(objectID) newArtLikeOfAnObject.ObjectIdAPI = objectID;
      if(typeof req.body === 'object') newArtLikeOfAnObject.data = req.body;
      newArtLikeOfAnObject.likes = true;
      console.log(req.body);

      newArtLikeOfAnObject.save().then((savedNewArtLikeObj) => {
        return res.status(200).json({confirmation: 'Success for Saving New Liked Art', savedNewArtLikeObj})
      }).catch((error) => {
        return res.status(500).json({ message: "Sorry your save couldn't happen something is wrong with the backend", error: error})
      })
    } else {
      console.log('You already liked this art , this is console.log', foundObject);
      return res.status(200).json({message: 'you already liked this art', foundObject: foundObject});
    }
  }).catch((error) => {
    return res.status(500).json({ message: "Sorry your save couldn't happen something is wrong with the backend route", error: error})
  })
});

module.exports = router;
