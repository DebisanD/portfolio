const express = require('express');
const router = express.Router();
const { readDb, saveDb } = require('../utils/dbHelper');

// POST contact form message
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  const db = readDb();
  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    date: new Date().toISOString(),
    read: false
  };

  db.messages.unshift(newMessage);
  saveDb(db);
  console.log(`[Contact API] Received new message from ${name} (${email})`);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been transmitted directly to DEBISA DARICHA DABA.',
    data: newMessage
  });
});

// GET contact messages (Admin View)
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.messages || []);
});

module.exports = router;
