const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const { username, password } = req.headers;

  if (token) {
    jwt.verify(token, 'secret dont put it in the code', (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        //put the decoded token so it is available  to the enpoint on the req object
        req.decodedToken = decodedToken;
        //move the request along
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
