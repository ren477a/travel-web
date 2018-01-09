const router = require('express').Router(); // eslint-disable-line new-cap
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Transaction = require('../models/transaction');
const Tour = require('../models/tour');
const voucher = require('voucher-code-generator');

router.post('/charge', (req, res, next) => {
    stripe.charges.create({
        amount: req.body.amount,
        currency: "php",
        description: "Example charge",
        source: req.body.token.id,
    }, (err, charge) => {
        if (err) {
            res.json({ success: false, charge: null, err: err });
        } else {
            res.json({ success: true, charge: charge, err: null });
            // Generate voucher codes
            // Save to database
            // Email receipt

        }
    });
});

router.post('/transaction', (req, res, next) => {
    let prefix = req.body.tourId.substr(req.body.tourId.length - 4) + "-";
    let data = req.body;
    data.voucherCodes = voucher.generate({
        length: 6,
        count: req.body.quantity,
        charset: 'alphanumeric',
        prefix: prefix
    });
    console.log(data);
    let newTransaction = new Transaction(data);

    Transaction.addTransaction(newTransaction, (err, transaction) => {
        if (err) {
            console.log(err);
            res.json({ success: false, transaction: null });
        } else {
            var conditions = { _id: req.body.tourId }
                , update = {$inc : {'sold' : 1}}
                , options = { multi: true };

            Tour.update(conditions, update, options, (err, numAffected) => {
                // numAffected is the number of updated documents
                res.json({ success: true, transaction: transaction });
            });
            
        }
    });
});


router.get('/', (req, res, next) => {
    console.log('asdasd');
});

module.exports = router;
