const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  type: { type: String, default: 'Full-time' },
  description: { type: String },
  highlights: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
