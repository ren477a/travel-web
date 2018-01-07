const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TourSchema = mongoose.Schema({
  title: {
    type: String
  },
  agency: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  type: { // Local International
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
  terms: {
    type: String,
    required: true
  },
  validityInDays: {
    type: Number,
    required: true
  },
  pricing: {
    ptype: {
      type: String,
      required: true
    },
    fixed: Number,
    group: [{
          persons: Number,
          price: Number
        }]
  },
  status: {
    type: String,
    default: 'pending'
  }, // onsale pending notonsale
  sold: {
    type: Number,
    default: 0
  }
});

const Tour = module.exports = mongoose.model('Tour', TourSchema);

module.exports.addTour = function(newTour, callback) {
  newTour.save(callback);
};

module.exports.getAllTours = function() {

};

module.exports.getMostRecent = function(resultCount, pageNum) {

};

module.exports.getFeatured = function() {

};

module.exports.getTours = function(query, resultCount, pageNum) {
  // query can have:
  // price range
  // destination
  // duration

};


// module.exports.getUserById = function(id, callback) {
//   User.findById(id, callback);
// };

// module.exports.getUserByEmail = function(email, callback) {
//   const query = { email: email };
//   User.findOne(query, callback);
// };



// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// };
