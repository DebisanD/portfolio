const express = require('express');
const router = express.Router();
const { readDb, saveDb } = require('../utils/dbHelper');

// GET all projects
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.projects || []);
});

// GET single project by ID
router.get('/:id', (req, res) => {
  const db = readDb();
  const project = (db.projects || []).find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// POST create project
router.post('/', (req, res) => {
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

// PUT update project
router.put('/:id', (req, res) => {
  const db = readDb();
  const index = db.projects.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });
  db.projects[index] = { ...db.projects[index], ...req.body };
  saveDb(db);
  res.json(db.projects[index]);
});

// DELETE project
router.delete('/:id', (req, res) => {
  const db = readDb();
  const initialLen = db.projects.length;
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  if (db.projects.length === initialLen) return res.status(404).json({ error: 'Project not found' });
  saveDb(db);
  res.json({ success: true, deletedId: req.params.id });
});

module.exports = router;
