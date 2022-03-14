const jsonwebtoken = require('jsonwebtoken');

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

module.exports = issueJWT;
