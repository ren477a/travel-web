const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  console.log(opts.jwtFromRequest);
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User.getUserById(jwt_payload.data._id, (err, user) => {
      // Check for errors
      if(err) {
        return done(err, false);
      }
      // Check if User is found
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};
