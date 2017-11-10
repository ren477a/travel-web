const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const TourSchema = mongoose.Schema({
  title: {
    type: String
  },
  lastname: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  itinerary: {
    type: [String],
    required: true
  },
  inclusions: {
    type: [String],
    required: true
  },
  exclusions: {
    type: [String],
    required: true
  },
  validityInSeconds: {
    type: number,
    required: true
  },
  pricing: {
    ptype: {
      type: String,
      required: true
    },
    fixed: number,
    group: [{
          persons: number,
          price: number
        }]
  }
});

const Tour = module.exports = mongoose.model('Tour', TourSchema);

// module.exports.getUserById = function(id, callback) {
//   User.findById(id, callback);
// };

// module.exports.getUserByEmail = function(email, callback) {
//   const query = { email: email };
//   User.findOne(query, callback);
// };

// module.exports.addUser = function(newUser, callback) {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       if(err) throw err;
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   });
// };

// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// };
