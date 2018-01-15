const router = require('express').Router(); // eslint-disable-line new-cap
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Transaction = require('../models/transaction');
const Tour = require('../models/tour');
const Agency = require('../models/agency');
const voucher = require('voucher-code-generator');
const nodemailer = require('nodemailer');

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

router.post('/transaction', async (req, res, next) => {
    let prefix = req.body.tourId.substr(req.body.tourId.length - 4) + "-";
    let data = req.body;
    data.voucherCodes = voucher.generate({
        length: 6,
        count: req.body.quantity,
        charset: 'alphanumeric',
        prefix: prefix
    });
    let newTransaction = new Transaction(data);
    let transaction = await newTransaction.save()
    console.log(transaction)
    // Update tour sold
    let updatedTour = await Tour.findByIdAndUpdate(req.body.tourId, { $inc: { 'sold': transaction.quantity } })
    console.log(updatedTour)
    // Add balance to agency
    let agency = await Agency.findOneAndUpdate(
        { agencyName: req.body.agency },
        { $inc: { 'balance': transaction.total } }
    )
    console.log(agency)
    // Send email
    let output = `
                    <h1>Thank you for using TravelCatalog!</h1>
                    <h3>Transaction Receipt</h3>
                    <ul>  
                      <li>TR#: ${transaction._id}</li>
                      <li>Tour: ${transaction.tourTitle}</li>
                      <li>Agency: ${transaction.agency}</li>
                      <li>Quantity: ${transaction.quantity}</li>
                      <li>Price per voucher: PHP ${transaction.pricePerItem}</li>
                      <li>Total Amount: PHP ${transaction.total}</li>
                    </ul>
                    <h3>Vouchers</h3>
                    <ul>`;

    for (v of transaction.voucherCodes) {
        output += `<li>${v}</li>`;
    }
    output += '</ul>';


    // EMAIL
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASS  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"TravelCatalog" <' + process.env.EMAIL + '>', // sender address
        to: transaction.customerEmail, // list of receivers
        subject: 'Tour Package Purchase', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    let mailInfo = transporter.sendMail(mailOptions)
    res.json({mailInfo: mailInfo})

});


router.get('/', (req, res, next) => {
    console.log('asdasd');
});

module.exports = router;
