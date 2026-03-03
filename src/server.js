const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const debugRoutes = require('./routes/debug');
const fileRoutes = require('./routes/files');
const integrationRoutes = require('./routes/integration');
const opsRoutes = require('./routes/ops');
const paymentRoutes = require('./routes/payments');
const { renderUserTemplate } = require('./services/templateService');

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    service: 'critical-vuln-lab',
    status: 'running'
  });
});

app.post('/render', (req, res) => {
  const template = req.body.template || '<%= user %>';
  const html = renderUserTemplate(template, req.body);
  res.type('text/html').send(html);
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/debug', debugRoutes);
app.use('/files', fileRoutes);
app.use('/integration', integrationRoutes);
app.use('/ops', opsRoutes);
app.use('/payments', paymentRoutes);

app.listen(3100, '0.0.0.0', () => {
  console.log('critical-vuln-lab listening on port 3100');
});