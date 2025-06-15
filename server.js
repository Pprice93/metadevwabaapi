const express = require('express');
const bodyParser = require('body-parser');
const { generateKey, getKey } = require('./lenderKeys');

const app = express();
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'YOUR_VERIFY_TOKEN';

app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.post('/generate-api-key', (req, res) => {
  const { lenderId } = req.body;
  if (!lenderId) {
    return res.status(400).json({ message: 'lenderId required' });
  }
  const key = generateKey(lenderId);
  res.json({ lenderId, apiKey: key });
});

app.get('/lender-api-key/:lenderId', (req, res) => {
  const { lenderId } = req.params;
  const key = getKey(lenderId);
  if (!key) {
    return res.status(404).json({ message: 'Key not found' });
  }
  res.json({ lenderId, apiKey: key });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook server is listening on port ${PORT}`));
