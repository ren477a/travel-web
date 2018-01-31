const router = require('express').Router();
const cashoutController = require('../controllers/cashout.controller')
const passport = require('passport');
const jwt = require('jsonwebtoken');


// new checkout
router.post('/', cashoutController.issueCashout);

router.get('/', cashoutController.readAll);

module.exports = router;
