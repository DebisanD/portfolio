const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String },
  location: { type: String },
  avatar: { type: String },
  tagline: { type: String },
  about: { type: String },
  stats: {
    yearsExperience: { type: String },
    completedProjects: { type: Number },
    codeCommits: { type: String },
    clientSatisfaction: { type: String }
  },
  social: {
    github: { type: String },
    telegram: { type: String },
    telegram2: { type: String },
    phone: { type: String },
    email: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
