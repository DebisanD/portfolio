const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const { readDb, saveDb } = require('../utils/dbHelper');

// GET projects
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let projects = await Project.find().sort({ createdAt: -1 });
      if (!projects || projects.length === 0) {
        const fileDb = readDb();
        if (fileDb.projects && fileDb.projects.length > 0) {
          projects = await Project.insertMany(fileDb.projects);
        }
      }
      if (projects) return res.json(projects);
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Project fetch error:', e);
  }

  const db = readDb();
  res.json(db.projects || []);
});

// POST add project
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newProj = await Project.create({
        title: req.body.title || 'New Project',
        category: req.body.category || 'Fullstack',
        description: req.body.description || '',
        longDescription: req.body.longDescription || '',
        tags: Array.isArray(req.body.tags) ? req.body.tags : [],
        image: req.body.image || '/images/project_job_portal.jpg',
        github: req.body.github || 'https://github.com/DebisanD',
        demo: req.body.demo || 'https://github.com/DebisanD',
        featured: Boolean(req.body.featured)
      });
      return res.status(201).json(newProj);
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Project create error:', e);
  }

  const db = readDb();
  const newProject = {
    id: `proj-${Date.now()}`,
    title: req.body.title || 'New Project',
    category: req.body.category || 'Fullstack',
    description: req.body.description || '',
    longDescription: req.body.longDescription || '',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    image: req.body.image || '/images/project_job_portal.jpg',
    github: req.body.github || 'https://github.com/DebisanD',
    demo: req.body.demo || 'https://github.com/DebisanD',
    featured: Boolean(req.body.featured)
  };
  db.projects.unshift(newProject);
  saveDb(db);
  res.status(201).json(newProject);
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        await Project.findByIdAndDelete(req.params.id);
        return res.json({ success: true, deletedId: req.params.id });
      }
    }
  } catch (e) {
    console.error('[MongoDB Route Error] Project delete error:', e);
  }

  const db = readDb();
  db.projects = db.projects.filter(p => p.id !== req.params.id && p._id !== req.params.id);
  saveDb(db);
  res.json({ success: true, deletedId: req.params.id });
});

module.exports = router;
