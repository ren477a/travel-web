const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const userController = require('../controllers/user.controller')
const agencyController = require('../controllers/agency.controller')

const User = require('../models/user')
const Agency = require('../models/agency')

router.post('/user/register', userController.register)

router.post('/user/login', userController.login)

router.post('/agency/register', agencyController.register)

router.post('/agency/login', agencyController.login)

router.post('/register/agency', (req, res, next) => {
  console.log('register agency');
  //TODO check first if user already exists before registering
  let newAgency = new Agency({
    agencyName: req.body.agencyName,
    ownedBy: req.body.ownedBy,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    dti: req.body.dti,
    business: req.body.business,
    bir: req.body.bir
  });

  Agency.addAgency(newAgency, (err, user) => {
    if(err) {
      res.json({success: false, msg:'Failed to register agency'});
    } else {
      res.json({success: true, msg:'Agency registered'});
    }
  });
});

router.get('/getusertype', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({
    type: req.user.type
  });
});

router.get('/agency/:id', (req, res) => {
  Agency.findOne({ _id: req.params.id }).then(agency => {
    res.json({
      _id: agency._id,
      agencyName: agency.agencyName,
      balance: agency.balance
    })
  });
})

router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
});

module.exports = router;
