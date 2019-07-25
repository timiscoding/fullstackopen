const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const makeToken = ({ id, username, name }) => jwt.sign({ id, username, name }, process.env.SECRET);

loginRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isPasswordCorrect = user
      ? bcrypt.compareSync(req.body.password, user.passwordHash)
      : false;

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Username or password incorrect' });
    }

    const payload = {
      id: user._id.toString(),
      username: user.username,
      name: user.name,
    };

    res.json({ token: makeToken(payload) });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  loginRouter,
  makeToken,
};
