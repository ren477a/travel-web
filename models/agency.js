const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AgencySchema = mongoose.Schema({
  
  agencyName: {
    type: String,
    required: true
  },
  ownedBy: {
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
  address: {
    type: String,
    required: true
  },
  dti: {
    type: String
  },
  business: {
    type: String
  },
  bir: {
    type: String
  }
});

const Agency = module.exports = mongoose.model('Agency', AgencySchema);

module.exports.addAgency = function(newAgency, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAgency.password, salt, (err, hash) => {
      if(err) throw err;
      newAgency.password = hash;
      newAgency.save(callback);
    });
  });
};