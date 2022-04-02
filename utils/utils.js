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
    expiresIn: expiresIn,
  };
};

const handleError = (res, error) => {
  const status =
    error.message.includes('validation failed') ||
    error.message.includes('arguments required') ||
    error.message.includes('duplicate key')
      ? 400
      : 500;

  const message = error.message || 'Internal server error';
  res.status(status).json({ message });
};

module.exports = { issueJWT, handleError };
