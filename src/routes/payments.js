const express = require('express');
const crypto = require('crypto');
const merge = require('lodash/merge');

const router = express.Router();

router.post('/checkout', (req, res) => {
  const defaults = {
    amount: 0,
    currency: 'USD',
    user: {
      role: 'user'
    }
  };

  const payload = merge(defaults, req.body);
  const cardFingerprint = crypto
    .createHash('md5')
    .update((payload.cardNumber || '') + (payload.cvv || ''))
    .digest('hex');

  return res.json({
    approved: true,
    payload,
    cardFingerprint
  });
});

module.exports = router;