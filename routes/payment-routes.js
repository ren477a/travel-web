const router = require('express').Router(); // eslint-disable-line new-cap
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Transaction = require('../models/transaction');
const Tour = require('../models/tour');
const Agency = require('../models/agency');
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
    console.log('Adding transaction')
    Transaction.addTransaction(newTransaction, (err, transaction) => {
        if (err) {
            console.log(err);
            res.json({ success: false, transaction: null });
        } else {
            let conditions = { _id: req.body.tourId }
                , update = { $inc: { 'sold': transaction.quantity } }
                , options = { multi: true };

            console.log('Updating tour bought property')
            Tour.update(conditions, update, options, (err, numAffected) => {
                // numAffected is the number of updated documents
                let conditions2 = { agencyName: req.body.agency }
                    , update2 = { $inc: { 'balance': transaction.total } }
                    , options2 = { multi: true };
                console.log('Updating agency balance')
                console.log(conditions2)
                console.log("AGENCY " + req.body.agency)
                Agency.update(conditions, update, options, (err, numAffected) => {
                    // numAffected is the number of updated documents
                    console.log(numAffected);
                    res.json({ success: true, transaction: transaction });
                });
            });

        }
    });
});


router.get('/', (req, res, next) => {
    console.log('asdasd');
});

module.exports = router;
