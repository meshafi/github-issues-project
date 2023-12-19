const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/index')
const User = require('../models/user-model')

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: req.user._id }, config.SECRETKEY, { expiresIn: '1h' });
  res.json({ success: true, token });
});

module.exports = router;
