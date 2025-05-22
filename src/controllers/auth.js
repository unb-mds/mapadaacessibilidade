// src/controllers/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
