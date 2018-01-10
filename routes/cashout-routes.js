const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Cashout = require('../models/cashout');
const Agency = require('../models/agency');
const Transaction = require('../models/transaction');

// new checkout
router.post('/', (req, res, next) => {
    // Edit this


    let conditions = { agency: req.body.agency, cashedOut: false }
        , update = { cashedOut: true }
        , options = { multi: true };

    Transaction.find(conditions, '_id', (err, doc) => {
        let transactions = doc.map(val => val._id);
        console.log(transactions);
        Transaction.update(conditions, update, options, (err, numAffected) => {
            if (err) {
                console.log(err);
                res.json({ success: false, cashout: null });
            }
            else {
                console.log({
                    action: "Mark cashouts",
                    numAffected: numAffected
                });
                let conditions2 = { _id: req.body.agencyId }
                    , update2 = { balance: 0 }
                    , options2 = { multi: true };
                Agency.update(conditions2, update2, options2, (err2, numAffected2) => {
                    if (err2) {
                        console.log(err2);
                        res.json({ success: false, cashout: null });
                    }
                    else {
                        console.log({
                            action: "Subract cashout to balance",
                            numAffected2: numAffected2
                        })
                        let newCashout = new Cashout({
                            agencyId: req.body.agencyId,
                            agency: req.body.agency,
                            bankAccount: req.body.bankAccount,
                            msg: '',
                            status: 'pending',
                            amount: req.body.amount,
                            transactions: transactions
                        });
                        Cashout.addCashout(newCashout, (err, cashout) => {
                            if (err) {
                                console.log(err);
                                res.json({ success: false, cashout: null });
                            } else {
                                res.json({ success: true, cashout: cashout });
                            }
                        });
                    }
                });
            }
        });
    })





});

module.exports = router;
