const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/dbHelper');

// GET telemetry stats
router.get('/', (req, res) => {
  const db = readDb();
  res.json({
    status: 'online',
    serverTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    counts: {
      projects: db.projects.length,
      skills: db.skills.length,
      experiences: db.experiences.length,
      messages: db.messages.length,
      unreadMessages: db.messages.filter(m => !m.read).length
    }
  });
});

module.exports = router;
