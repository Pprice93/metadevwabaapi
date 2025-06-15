const fs = require('fs');
const path = require('path');
const { randomBytes } = require('crypto');

const KEY_FILE = path.join(__dirname, 'lender-keys.json');
let keys = {};

function loadKeys() {
  if (fs.existsSync(KEY_FILE)) {
    try {
      keys = JSON.parse(fs.readFileSync(KEY_FILE));
    } catch (err) {
      keys = {};
    }
  }
}

function saveKeys() {
  fs.writeFileSync(KEY_FILE, JSON.stringify(keys, null, 2));
}

function generateKey(lenderId) {
  const key = randomBytes(32).toString('hex');
  keys[lenderId] = key;
  saveKeys();
  return key;
}

function getKey(lenderId) {
  return keys[lenderId];
}

loadKeys();

module.exports = {
  generateKey,
  getKey
};
