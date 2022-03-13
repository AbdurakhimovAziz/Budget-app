const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const issueJWT = (user) => {
  const { id } = user;

  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
};

const mapUser = (user) => {
  return {
    id: Date.now(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    gender: user.gender,
    country: user.country,
    role: user.role,
  };
};

module.exports.issueJWT = issueJWT;
module.exports.mapUser = mapUser;
