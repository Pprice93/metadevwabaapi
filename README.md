# metadevwabaapi

This repository contains a very small demo web application for tracking a user's vehicle kilometres.

The demo provides:

- A simple login and profile page.
- Editable vehicle information.
- An inbox that receives update requests.
- A driving habits slider ranging from 0–140,000 km.

When the user answers an inbox update request with their current kilometres, the slider updates automatically. Previous updates are shown in the inbox and cannot be edited.

Open `index.html` in a web browser to try the example.

## Webhook Server for WhatsApp Business

This repository also includes a simple Express server that can act as a webhook endpoint for the WhatsApp Business API.

### Setup
1. Install Node.js dependencies:
   ```
   npm install
   ```
2. Start the server with your chosen verify token:
   ```
   WHATSAPP_VERIFY_TOKEN=your_token npm start
   ```
3. Expose `http://localhost:3000` to the internet using a tunneling service such as ngrok so Meta can reach it over HTTPS. Use the public URL as the callback URL when configuring the webhook in the Meta Business dashboard.

The server responds to the GET webhook verification request and logs incoming POST messages to the console.

### Lender API Key Management

Two helper endpoints allow you to generate and retrieve API keys for bank
lenders that want to integrate with the OpenAI assistant "Jen - Finance".

* `POST /generate-api-key` – pass a JSON body with `lenderId` to generate a
  persistent API key.
* `GET /lender-api-key/:lenderId` – retrieve the previously generated key for a
  lender.

Generated keys are stored in `lender-keys.json` in the project root.
