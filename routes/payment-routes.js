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
                Agency.update(conditions2, update2, options2, (err, numAffected) => {
                    // numAffected is the number of updated documents
                    console.log(numAffected);

                    // Message
                    const output = `
                    <p>You have a new contact request</p>
                    <h3>Transaction Receipt</h3>
                    <ul>  
                      <li>TR#: ${transaction._id}</li>
                      <li>Name: ${transaction.tourTitle}</li>
                      <li>Name: ${transaction.agency}</li>
                      <li>Name: ${transaction.quantity}</li>
                      <li>Name: ${transaction.pricePerItem}</li>
                      <li>Name: ${transaction.total}</li>
                    </ul>
                    <h3>Vouchers</h3>
                    <ul>`;
                    
                    for(v of transaction.voucherCodes) {
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
                        from: '"TourCatalog" <' + process.env.EMAIL + '>', // sender address
                        to: transaction.customerEmail, // list of receivers
                        subject: 'Tour Package Purchase', // Subject line
                        text: 'Hello world?', // plain text body
                        html: output // html body
                    };

                    // send mail
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        res.json({ success: true, transaction: transaction });
                    });
                });
            });
        }
    });
});

router.get('/email', (req, res) => {
    console.log("email")
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: Ren</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
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
        from: '"TourCatalog" <' + process.env.EMAIL + '>', // sender address
        to: 'mercado.efrenjr@gmail.com', // list of receivers
        subject: 'Tour Package Purchase', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json({ success: true });
    });
})


router.get('/', (req, res, next) => {
    console.log('asdasd');
});

module.exports = router;
