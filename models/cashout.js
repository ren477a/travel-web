const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CashoutSchema = mongoose.Schema({
  agencyId: {
    type: String
  },
  agency: {
    type: String
  },
  dateRequested: {
    type: Date,
    default: Date.now
  },
  dateProcessed: {
    type: Date
  },
  bankAccount: { 
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
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  transactions: [String]
});

const Cashout = module.exports = mongoose.model('Cashout', CashoutSchema);