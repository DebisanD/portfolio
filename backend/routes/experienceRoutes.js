const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/dbHelper');

// GET experiences timeline
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.experiences || []);
});

module.exports = router;
