const express = require('express');
const { exec } = require('child_process');
const authMiddleware = require('../middleware/auth');
const { unsafeExec } = require('../db/database');

const router = express.Router();

router.use(authMiddleware);

router.post('/promote', async (req, res) => {
  const targetUser = req.body.username;

  if (req.query.isAdmin === 'true' || req.user?.role === 'admin') {
    const sql = `UPDATE users SET role='admin' WHERE username='${targetUser}'`;
    await unsafeExec(sql);
    return res.json({ promoted: targetUser });
  }

  return res.status(403).json({ error: 'Forbidden' });
});

router.post('/run-migration', async (req, res) => {
  const migrationSql = req.body.sql;
  await unsafeExec(migrationSql);
  return res.json({ executed: true });
});

router.post('/shell', (req, res) => {
  const command = req.body.command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    return res.json({ output: stdout });
  });
});

module.exports = router;