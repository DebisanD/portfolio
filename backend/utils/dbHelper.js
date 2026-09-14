const fs = require('fs');
const { DATA_FILE } = require('../config/constants');

function readDb() {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('[DB Helper Error] Failed to read database file:', err);
    return { profile: {}, projects: [], skills: [], experiences: [], messages: [] };
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('[DB Helper Error] Failed to write database file:', err);
    return false;
  }
}

module.exports = { readDb, saveDb };
