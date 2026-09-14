const path = require('path');

module.exports = {
  DEFAULT_PORT: 5110,
  MAX_PORT: 5150,
  DATA_FILE: path.join(__dirname, '..', 'data', 'portfolio.json'),
  ADMIN_TOKEN: 'admin-secret-token-8832',
  DEFAULT_ADMIN_PASS: 'password123'
};
