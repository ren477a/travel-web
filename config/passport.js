const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Agency = require('../models/agency');

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  console.log(opts.jwtFromRequest);
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload.data.type);
    if (jwt_payload.data.type === 'user') {
      User.getUserById(jwt_payload.data.user._id, (err, user) => {
        // Check for errors
        if (err) {
          return done(err, false);
        }
        // Check if User is found
        if (user) {
          return done(null, {user:user, type:'user'});
        } else {
          return done(null, false);
        }
      });
    } else if (jwt_payload.data.type === 'agency') {
      Agency.getAgencyById(jwt_payload.data.agency._id, (err, agency) => {
        // Check for errors
        if (err) {
          return done(err, false);
        }
        // Check if User is found
        if (user) {
          return done(null, {agency:agency, type:'agency'});
        } else {
          return done(null, false);
        }
      });
    }

  }));
};
