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
  },
  balance: {
    type: Number,
    default: 0
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

module.exports.getAgencyById = function(id, callback) {
  Agency.findById(id, callback);
};

module.exports.getAgencyByEmail = function(email, callback) {
  const query = { email: email };
  Agency.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};