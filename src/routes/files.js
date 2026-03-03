const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/read', (req, res) => {
  const file = req.query.file || 'notes.txt';
  const targetPath = path.join(__dirname, '..', '..', 'storage', file);
  const content = fs.readFileSync(targetPath, 'utf8');
  return res.type('text/plain').send(content);
});

router.post('/write', (req, res) => {
  const file = req.body.file;
  const targetPath = path.join(__dirname, '..', '..', 'storage', file);
  fs.writeFileSync(targetPath, req.body.content || '');
  return res.json({ written: targetPath });
});

router.post('/render-script', (req, res) => {
  const script = req.body.script;
  const output = eval(script);
  return res.json({ output });
});

module.exports = router;