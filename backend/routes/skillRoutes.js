const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Skill = require('../models/Skill');
const { readDb, saveDb } = require('../utils/dbHelper');

// GET skills
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let skills = await Skill.find();
      if (!skills || skills.length === 0) {
        const fileDb = readDb();
        if (fileDb.skills && fileDb.skills.length > 0) {
          skills = await Skill.insertMany(fileDb.skills);
        }
      }
      if (skills) return res.json(skills);
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Skill fetch error:', e);
  }

  const db = readDb();
  res.json(db.skills || []);
});

// POST add skill
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newSkill = await Skill.create({
        name: req.body.name || 'New Skill',
        category: req.body.category || 'Backend',
        level: Number(req.body.level) || 85,
        icon: req.body.icon || 'Code2'
      });
      return res.status(201).json(newSkill);
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Skill create error:', e);
  }

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

// DELETE skill
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        await Skill.findByIdAndDelete(req.params.id);
        return res.json({ success: true, deletedId: req.params.id });
      }
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Skill delete error:', e);
  }

  const db = readDb();
  db.skills = db.skills.filter(s => s.id !== req.params.id && s._id !== req.params.id);
  saveDb(db);
  res.json({ success: true, deletedId: req.params.id });
});

module.exports = router;
