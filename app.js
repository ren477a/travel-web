const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// Environment Variables
require('dotenv').config();

mongoose.connect(process.env.DB_CONN_STRING, {
  useMongoClient: true
});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + process.env.DB_CONN_STRING);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const authRoutes = require('./routes/auth-routes');
const agencyRoutes = require('./routes/agency-routes');
const toursRoutes = require('./routes/tour-routes');
const paymentRoutes = require('./routes/payment-routes');
const transactionRoutes = require('./routes/transaction-routes');
const cashoutRoutes = require('./routes/cashout-routes');

const port = process.env.PORT || 8080;


// MIDDLEWARES
// Allow requests from other domain
app.use(cors());

// Path static pages / front end routes
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());
// Initialize passport config
require('./config/passport')(passport);

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/tours', toursRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/cashout', cashoutRoutes);

const upload = require('./config/upload');
app.post('/upload', (req, res) => {
  upload.single('avatar')(req, res, (err) => {
    if(err){
      res.json({
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.json({
          msg: 'Error: No File Selected!'
        });
      } else {
        res.json({
          msg: 'File Uploaded!',
          file: `${req.file.location}`
        });
      }
    }
  });
});
// app.post('/upload', upload.single('avatar'),  function(req, res) {
//   res.send(req.file.originalname);
// });
// app.use(function(req, res, next) {
// 	res.redirect('/#' + req.originalUrl);
// });

app.get('*', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started at port ' + port);
});
