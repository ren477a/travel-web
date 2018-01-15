const router = require('express').Router();
const transactionsController = require('../controllers/transaction.controller.js')

router.get('/customer/:customerId', transactionsController.findByCustomerId)

router.get('/agency/:agency', transactionsController.findByAgency)

router.put('/claim/:id', transactionsController.claim)

router.get('/', transactionsController.readAll)

module.exports = router
