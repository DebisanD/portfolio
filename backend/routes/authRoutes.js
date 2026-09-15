const express = require('express');
const router = express.Router();
const { ADMIN_TOKEN, DEFAULT_ADMIN_PASS } = require('../config/constants');

const handleLogin = (req, res) => {
  const { password } = req.body || {};
  if (password === DEFAULT_ADMIN_PASS || password === 'Debi@1234') {
    res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: 'DEBISA DARICHA DABA (Admin)'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
  }
};

// POST login endpoints
router.post('/login', handleLogin);
router.post('/', handleLogin);

// GET status check
router.get(['/', '/login'], (req, res) => {
  res.json({ success: true, message: 'Auth API endpoint active. Send POST request with admin password to login.' });
});

module.exports = router;

