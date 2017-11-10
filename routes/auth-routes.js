const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
  console.log('register');
  //TODO check first if user already exists before registering
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check is User exists in the database
  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({succes:false, msg:'User not found'});
    }
    // If user is found
    // Check if password is correct
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data:user}, process.env.JWT_SECRET, {
          // Token will expire in 3 days
          expiresIn: 259200
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            mobileNumber: user.mobileNumber,
            email: user.email
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
});

module.exports = router;
