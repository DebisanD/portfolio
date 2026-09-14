const express = require('express');
const router = express.Router();
const { readDb, saveDb } = require('../utils/dbHelper');

// GET skills
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.skills || []);
});

// POST add skill
router.post('/', (req, res) => {
  const db = readDb();
  const newSkill = {
    id: `sk-${Date.now()}`,
    name: req.body.name || 'New Skill',
    category: req.body.category || 'Backend',
    level: Number(req.body.level) || 85,
    icon: req.body.icon || 'Code2'
  };
  db.skills.push(newSkill);
  saveDb(db);
  res.status(201).json(newSkill);
});

// PUT update skill
router.put('/:id', (req, res) => {
  const db = readDb();
  const index = db.skills.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Skill not found' });
  db.skills[index] = { ...db.skills[index], ...req.body };
  saveDb(db);
  res.json(db.skills[index]);
});

// DELETE skill
router.delete('/:id', (req, res) => {
  const db = readDb();
  db.skills = db.skills.filter(s => s.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, deletedId: req.params.id });
});

module.exports = router;
