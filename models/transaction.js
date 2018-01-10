const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  tourId: {
    type: String
  },
  tourTitle: {
    type: String
  },
  agency: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  pricePerItem: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  voucherCodes: {
    type: [String],
    required: true
  },
  claimed: {
      type: Boolean,
      default: false
  },
  cashedOut: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  dateClaimed: {
    type: Date
  }
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

module.exports.addTransaction = function(newTransaction, callback) {
  newTransaction.save(callback);
};