const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AgencySchema = mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  agency: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dti: {
    type: String,
    required: true
  },
  business: {
    type: String,
    required: true
  },
  bir: {
    type: String,
    required:true
    
  }
  
});

const Agency = module.exports = mongoose.model('Agency', AgencySchema);