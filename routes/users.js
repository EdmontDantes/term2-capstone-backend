const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res) {
  const { email, password } = req.body;
  let user = new User({ email: email, password: password });
  user.save().then((savedUser) => {
    return res.status(200).json({ message: 'Succeess you have create a user', data: savedUser})
  }).catch((error) => res.status(500).json({message: 'Save Failed'}))

})

router.post('/authenticate', (req, res) => {
  const { email, password} = req.body;
  User.findOne({ email: email}).then((foundUser) => {
    if(!foundUser) {
        return res.status(200).json({message: 'Sorry no User have been found by this email'})
    } else {
      if (bcrypt.compareSync(password, foundUser.password)) {
        const payload = { email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });
        res.cookie('token', token, { httpOnly: true})
        return res.status(200).json({ message: 'Your password is match and cookie is on the way'})


      } else {
        return res.json({ message: 'Password Failed no match'})
      }
    }
  })
})
// router.post('/authenticate', (req, res) => {
//   const { email, password} = req.body;
//   User.findOne({ email: email}, (err, foundUser) => {
//     if(err) {
//       return res.status(500).json({message: 'error occured'})
//     } else if(!foundUser) {
//         return res.status(200).json({message: 'Sorry no User have been found by this email'})
//       } else {
//       foundUser.comparePassword(password).then((val) => console.log(val))
//     //     foundUser.comparePassword(password, (err, same) => {
//     //       if(err) {
//     //         console.log(object);
//     //         return res.status(500).json({ message: 'Something is wrong with cp internal error'})
//     //       } else if(!same) {
//     //         return res.json({ message: 'Password Failed no match'})
//     //       } else {
//     //         // const payload = { email };
//     //         // const token = jwt.sign(payload, process.env.JWT_SECRET, {
//     //         //   expiresIn: '1h'
//     //         // });
//     //         // res.cookie('token', token, { httpOnly: true})
//     //         return res.status(200).json({ message: 'Your password is match and cookie is on the way'})
//     //       }
          
//     //     })
//       }
//     })
// })


module.exports = router;
