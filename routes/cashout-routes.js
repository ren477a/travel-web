const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Cashout = require('../models/cashout');

// new checkout
router.post('/', (req, res, next) => {
    // Edit this
    let newCashout = new Cashout({
        agencyId: req.body.agencyId,
        agency: req.body.agency,
        bankAccount: {
            accountNumber: req.body.accountNumber,
            accountName: req.body.accountNumber,
            backName: req.body.bankAccount
        },
        msg: '',
        status: 'pending',
        amount: req.body.amount,
        transactions: req.body.transactions
    });
  
    Cashout.addCashout(newCashout, (err, cashout) => {
      if (err) {
        console.log(err);
        res.json({ success: false, cashout: null });
      } else {
        res.json({ success: true, cashout: cashout });
      }
    });
  });

module.exports = router;
