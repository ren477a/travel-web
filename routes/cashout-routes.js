const router = require('express').Router();
const cashoutController = require('../controllers/cashout.controller')
const passport = require('passport');
const jwt = require('jsonwebtoken');


// new checkout
router.post('/', cashoutController.issueCashout);

module.exports = router;
