const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// Environment Variables
require('dotenv').config();

mongoose.connect(process.env.DB_CONN_STRING);

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
const toursRoutes = require('./routes/tour-routes');
const paymentRoutes = require('./routes/payment-routes');

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
app.use('/api/tours', toursRoutes);
app.use('/api/payment', paymentRoutes);

// app.use(function(req, res, next) {
// 	res.redirect('/#' + req.originalUrl);
// });

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started at port ' + port);
});
