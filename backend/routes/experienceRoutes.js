const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Experience = require('../models/Experience');
const { readDb } = require('../utils/dbHelper');

// GET experiences timeline
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let experiences = await Experience.find().sort({ createdAt: -1 });
      if (!experiences || experiences.length === 0) {
        const fileDb = readDb();
        if (fileDb.experiences && fileDb.experiences.length > 0) {
          experiences = await Experience.insertMany(fileDb.experiences);
        }
      }
      if (experiences) return res.json(experiences);
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Experience fetch error:', e);
  }

  const db = readDb();
  res.json(db.experiences || []);
});

module.exports = router;
