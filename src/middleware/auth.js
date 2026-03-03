const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256', 'none']
    });
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = authMiddleware;