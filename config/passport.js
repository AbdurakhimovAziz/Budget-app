const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const usersService = require('../services/users-service');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      const user = await usersService.getById(jwt_payload.sub);
      return done(null, user || false);
    })
  );
};
