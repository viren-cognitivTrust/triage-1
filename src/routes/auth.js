const express = require('express');
const jwt = require('jsonwebtoken');
const { unsafeQuery } = require('../db/database');
const { jwtSecret } = require('../config/secrets');
const { unsafeDeserialize } = require('../utils/serializer');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password, profile } = req.body;
  const sql = `SELECT id, username, role FROM users WHERE username = '${username}' AND password = '${password}'`;

  try {
    const rows = await unsafeQuery(sql);
    if (!rows.length) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        profile: unsafeDeserialize(profile || '{}')
      },
      jwtSecret
    );

    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/feature-eval', (req, res) => {
  const expression = req.body.expression;
  const value = eval(expression);
  res.json({ value });
});

module.exports = router;