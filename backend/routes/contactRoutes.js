const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/Message');
const { readDb, saveDb } = require('../utils/dbHelper');
const { sendTelegramAlert } = require('../utils/telegramNotifier');

// POST contact form message
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  // Asynchronously trigger Telegram alert (non-blocking)
  sendTelegramAlert({ name, email, subject, message }).catch(err => {
    console.error('Telegram notification error:', err);
  });

  try {
    if (mongoose.connection.readyState === 1) {
      const newMsg = await Message.create({
        name,
        email,
        subject: subject || 'General Inquiry',
        message
      });
      console.log(`🍃 [MongoDB Contact API] Saved message from ${name} (${email})`);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been transmitted directly to DEBISA DARICHA DABA.',
        data: newMsg
      });
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Message create error:', e);
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

  db.messages = db.messages || [];
  db.messages.unshift(newMessage);
  saveDb(db);
  console.log(`[Contact API] Received new message from ${name} (${email})`);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been transmitted directly to DEBISA DARICHA DABA.',
    data: newMessage
  });
});

// GET contact messages (Public & Admin View)
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.json(messages);
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Message fetch error:', e);
  }

  const db = readDb();
  res.json(db.messages || []);
});

module.exports = router;

