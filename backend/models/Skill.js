const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, default: 85 },
  icon: { type: String, default: 'Code2' }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
