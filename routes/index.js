const express = require('express');
const router = express.Router();
const ArtLikes = require('./models/ArtLikes');
const { restart } = require('nodemon');

/* GET home page. */
router.get('/art-likes', (req, res, next) => {
  ArtLikes.find().then((AllFoundLikes) => {
    return res.status(200).json({AllFoundLikes: AllFoundLikes})
  })

});

router.put('/art-likes', (req, res, next) => {
  console.log('Blank route loggged out works');
  // console.log('Req.body passed data', req.body);
  let { objectID } = req.body;
  // res.send("I'm a blank put route for now")
  ArtLikes.find({ObjectIdAPI: objectID}).then((foundObject) => {
    if(!foundObject.length) {
      let newArtLikeOfAnObject = new ArtLikes()
      if(objectID) newArtLikeOfAnObject.ObjectIdAPI = objectID;
      if(typeof req.body === 'object') newArtLikeOfAnObject.data = req.body;
      newArtLikeOfAnObject.likes = true;

      newArtLikeOfAnObject.save().then((savedNewArtLikeObj) => {
        return res.status(200).json({confirmation: 'Success for Saving New Liked Art', savedNewArtLikeObj})
      }).catch((error) => {
        return res.status(500).json({ message: "Sorry your save couldn't happen something is wrong with the backend", error: error})
      })
    } else {
      return res.status(200).json({message: 'you already liked this art', foundObject: foundObject});
    }
  }).catch((error) => {
    return res.status(500).json({ message: "Sorry your save couldn't happen something is wrong with the backend route", error: error})
  })
});


router.delete('/art-likes/:objectID', async (req, res, next) => {
  try {
    let { objectID } = req.params;
    await ArtLikes.findOneAndDelete({ObjectIdAPI: objectID})
    return res.status(200).json({message: "Successfully removed liked item from DB backend"})
  } catch (error) {
    return res.status(500).json({ message: "Sorry your dislike couldn't happen something is wrong with the backend route", error: error})
  }



  
});

router.get('/art-likes/:objectID', async (req, res, next) => {
  try {
    let { objectID } = req.params;
    await ArtLikes.findOne({ObjectIdAPI: objectID}).then((foundObject) => {
      return res.status(200).json({ alreadyLiked: true, objectID: foundObject.objectID })
    }).catch((error) => console.log(error))
  } catch (error) {
    return res.status(500).json({ message: "Sorry your dislike couldn't happen something is wrong with the backend route", error: error})
  }



  
});



module.exports = router;
