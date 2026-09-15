const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String },
  location: { type: String },
  department: { type: String },
  university: { type: String },
  degree: { type: String },
  avatar: { type: String },
  tagline: { type: String },
  shortBio: { type: String },
  githubBio: { type: String },
  cvSummary: { type: String },
  about: { type: String },
  careerGoal: { type: String },
  fullBiography: { type: mongoose.Schema.Types.Mixed },
  coreTechnologies: [String],
  professionalFocus: [String],
  stats: {
    yearsExperience: { type: String },
    completedProjects: { type: mongoose.Schema.Types.Mixed },
    codeCommits: { type: String },
    clientSatisfaction: { type: String }
  },
  social: {
    github: { type: String },
    facebook: { type: String },
    telegram: { type: String },
    telegram2: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    freelance: { type: String },
    phone: { type: String },
    email: { type: String }
  }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Profile', profileSchema);

