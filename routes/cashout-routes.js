const router = require('express').Router();
const cashoutController = require('../controllers/cashout.controller')
const passport = require('passport');
const jwt = require('jsonwebtoken');


// new checkout
router.post('/', cashoutController.issueCashout);

router.get('/', cashoutController.readAll);

router.put('/:id', cashoutController.update)
router.get('/:id', cashoutController.read)
router.delete('/:id', cashoutController.delete)

module.exports = router;
