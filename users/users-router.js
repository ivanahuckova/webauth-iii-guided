const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  const roles = req.decodedToken.roles;
  if (roles.includes('pm')) {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  } else {
    res.json({ message: "Sorry, you don't have permission to do that" });
  }
});

module.exports = router;
