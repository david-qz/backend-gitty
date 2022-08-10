const jwt = require('jsonwebtoken');

function isUserLoggedIn(sessionToken) {
  try {
    jwt.verify(sessionToken, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

function issueSessionToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
}

module.exports = {
  isUserLoggedIn,
  issueSessionToken
};
