const router = require('express').Router()
const passport = require('passport')

const userController = require('../controllers/user.controller')
const agencyController = require('../controllers/agency.controller')

router.post('/user/register', userController.register)

router.post('/user/login', userController.login)

router.post('/agency/register', agencyController.register)

router.post('/agency/login', agencyController.login)

module.exports = router;
