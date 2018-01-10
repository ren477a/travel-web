const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Transaction = require('../models/transaction');

router.get('/customer/:id', (req, res, next) => {
  Transaction.find({customerId: req.params.id}).sort({date:-1}).then(transactions => {
    res.send(transactions);
  });
});

router.get('/agency/:name', (req, res, next) => {
  Transaction.find({agency: req.params.name}).sort({date:-1}).then(transactions => {
    res.send(transactions);
  });
})

router.put('/claim/:id', (req, res, next) => {
  var conditions = { _id: req.params.id }
    , update = { claimed: true }
    , options = { multi: true };

  Transaction.update(conditions, update, options, (err, numAffected) => {
    // numAffected is the number of updated documents
    res.json({ numAffected: numAffected });
  });
});

module.exports = router;
