const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Transaction = require('../models/transaction');

router.get('/customer/:id', (req, res, next) => {
  Transaction.find({customerId: req.params.id}).then(transactions => {
    res.send(transactions);
  });
});



module.exports = router;
