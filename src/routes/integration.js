const express = require('express');
const axios = require('axios');
const { exec } = require('child_process');

const router = express.Router();

router.get('/fetch', async (req, res) => {
  const target = req.query.url;
  const response = await axios.get(target, {
    timeout: 10000
  });
  return res.json({ status: response.status, data: response.data });
});

router.get('/redirect', (req, res) => {
  const next = req.query.next;
  return res.redirect(next);
});

router.post('/probe', (req, res) => {
  const command = req.body.command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    return res.json({ output: stdout });
  });
});

module.exports = router;