const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const userController = require('../controllers/user.controller')
const agencyController = require('../controllers/agency.controller')

router.post('/user/register', userController.register)

router.post('/user/login', userController.login)

router.post('/agency/register', agencyController.register)

router.post('/agency/login', agencyController.login)

router.post('/admin/login', (req, res) => {
  console.log(req.body.password)
  if(req.body.password===process.env.ADMIN) {
    const token = jwt.sign(
      { data: { user: 'admin' } },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
  )
    res.json({success: true, token: 'JWT ' + token, user: 'admin'})
  } else {
    res.json({success: false, msg: 'Email and password does not match.' })
  }
})

module.exports = router;
