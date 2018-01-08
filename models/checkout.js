const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CheckoutSchema = mongoose.Schema({
  agencyId: {
    type: String
  },
  agency: {
    type: String
  },
  dataRequested: {
    type: Date,
    required: true
  },
  dateProcessed: {
    type: Date,
    required: true
  },
  bacnkAccount: { 
      accountNumber :{
        type: String,
        required: true},
      accountName: {
        type: String,
        required: true
      },
      bankName: {
        type: String,
        required: true
      }
  },
  msg: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Checkout = module.exports = mongoose.model('Checkout', CheckoutSchema);