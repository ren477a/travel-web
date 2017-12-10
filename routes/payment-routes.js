const router = require('express').Router(); // eslint-disable-line new-cap
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

router.post('/charge', (req, res, next) => {
    console.log(req.body);
    // Charge client
    // Save transaction to database
    stripe.charges.create({
        amount: req.body.amount,
        currency: "php",
        description: "Example charge",
        source: req.body.token.id,
    }, (err, charge) => {
        if(err) {
            res.json({success: false, charge: null});
        } else {
            res.json({success: true, charge: charge});
        }
    });
});



router.get('/', (req, res, next) => {
    console.log('asdasd');
});

module.exports = router;
