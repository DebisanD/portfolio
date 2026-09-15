const fs = require('fs');
const path = require('path');
const os = require('os');
const { DATA_FILE } = require('../config/constants');

const TMP_FILE = path.join(os.tmpdir(), 'portfolio.json');
let memoryDb = null;

function readDb() {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    if (fs.existsSync(DATA_FILE)) {
      const rawData = fs.readFileSync(DATA_FILE, 'utf8');
      memoryDb = JSON.parse(rawData);
      return memoryDb;
    }
  } catch (err) {
    console.error('[DB Helper Error] Reading DATA_FILE failed:', err.message);
  }

  try {
    if (fs.existsSync(TMP_FILE)) {
      const rawTmp = fs.readFileSync(TMP_FILE, 'utf8');
      memoryDb = JSON.parse(rawTmp);
      return memoryDb;
    }
  } catch (err) {
    console.error('[DB Helper Error] Reading TMP_FILE failed:', err.message);
  }

  memoryDb = { profile: {}, projects: [], skills: [], experiences: [], messages: [] };
  return memoryDb;
}

function saveDb(data) {
  memoryDb = data;
  let saved = false;

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    saved = true;
  } catch (err) {
    console.warn('[DB Helper Warning] Primary DATA_FILE not writable (e.g. serverless read-only FS). Using memory and /tmp cache.');
  }

  if (!saved) {
    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2), 'utf8');
      saved = true;
    } catch (err) {
      console.warn('[DB Helper Warning] /tmp write fallback also failed. Using memory state.');
    }
  }

  return true; // Memory DB updated successfully
}

module.exports = { readDb, saveDb };

