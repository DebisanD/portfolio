const express = require('express');
const router = express.Router();
const { readDb, saveDb } = require('../utils/dbHelper');

// GET Profile
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.profile || {});
});

// PUT Profile (Update Bio/Details)
router.put('/', (req, res) => {
  const db = readDb();
  db.profile = { ...db.profile, ...req.body };
  if (saveDb(db)) {
    res.json({ success: true, profile: db.profile });
  } else {
    res.status(500).json({ error: 'Failed to update profile details' });
  }
});

module.exports = router;
