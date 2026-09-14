const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const { readDb, saveDb } = require('../utils/dbHelper');

// GET Profile
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let profile = await Profile.findOne();
      if (!profile) {
        // Auto-seed MongoDB from portfolio.json fallback
        const fileDb = readDb();
        if (fileDb.profile && fileDb.profile.name) {
          profile = await Profile.create(fileDb.profile);
        }
      }
      if (profile) return res.json(profile);
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Profile fetch error:', e);
  }

  // Fallback to JSON store
  const db = readDb();
  res.json(db.profile || {});
});

// PUT Profile
router.put('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let profile = await Profile.findOne();
      if (profile) {
        Object.assign(profile, req.body);
        await profile.save();
        return res.json({ success: true, profile });
      } else {
        profile = await Profile.create(req.body);
        return res.json({ success: true, profile });
      }
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Profile update error:', e);
  }

  const db = readDb();
  db.profile = { ...db.profile, ...req.body };
  if (saveDb(db)) {
    res.json({ success: true, profile: db.profile });
  } else {
    res.status(500).json({ error: 'Failed to update profile details' });
  }
});

module.exports = router;
