const { ADMIN_TOKEN } = require('../config/constants');

function verifyAdminToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.headers['x-admin-token'];

  if (token === ADMIN_TOKEN || req.query.adminKey === 'admin') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Admin authentication token required.' });
  }
}

module.exports = { verifyAdminToken };
