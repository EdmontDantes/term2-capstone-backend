const express = require('express');
const router = express.Router();
const User = require('./models/User');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  const { email, password} = req.body;
  const user = new User({ email, password});
  user.save().then((savedUser) => {
    return res.status(200).json({ message: 'Suceess you have create a user', data: savedUser})
  }).catch((error) => res.status(500).json({message: 'Save Failed'}))

})

module.exports = router;
