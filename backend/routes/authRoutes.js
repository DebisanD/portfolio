const express = require('express');
const router = express.Router();
const { ADMIN_TOKEN, DEFAULT_ADMIN_PASS } = require('../config/constants');

// POST admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === DEFAULT_ADMIN_PASS || password === 'admin') {
    res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: 'DEBISA DARICHA DABA (Admin)'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
  }
});

module.exports = router;
