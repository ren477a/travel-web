const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  tourId: {
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
      type: Boolean
  }
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

module.exports.addTransaction = function(newTransaction, callback) {
  newTransaction.save(callback);
};