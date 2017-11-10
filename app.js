const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const authRoutes = require('./routes/auth-routes');
const toursRoutes = require('./routes/tour-routes');

const port = process.env.PORT || 8080;


// MIDDLEWARES
// Allow requests from other domain
app.use(cors());

// Path
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());
// Initialize passport config
require('./config/passport')(passport);

// ROUTES
app.use('/auth', authRoutes);
app.use('/tours', toursRoutes);

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});
// Start Server
app.listen(port, () => {
  console.log('Server started at port ' + port);
});
