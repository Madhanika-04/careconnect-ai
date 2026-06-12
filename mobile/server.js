const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8081;
const HTML_FILE = path.join(__dirname, '..', 'landing_page.html');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/home' || req.url === '/profile' || req.url === '/assistant' || req.url === '/health' || req.url === '/alerts') {
    fs.readFile(HTML_FILE, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading landing page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`CareConnect AI Frontend serving design mockup at http://localhost:${PORT}`);
});
