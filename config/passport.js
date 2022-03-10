const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const usersService = require('../services/UsersService');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      const user = usersService.getOne(jwt_payload.sub);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
