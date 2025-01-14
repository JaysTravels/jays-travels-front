const express = require('express');
const next = require('next');

// Set the environment (development or production)
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Initialize the server
const server = express();

app.prepare().then(() => {
  // Custom API route (optional)
  server.get('/api/custom-route', (req, res) => {
    res.json({ message: 'Hello from custom API route!' });
  });

  // Catch-all route handler for Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
