const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8081;
const HOME_HTML = path.join(__dirname, '..', 'landing_page.html');
const ASSISTANT_HTML = path.join(__dirname, '..', 'assistant_page.html');
const HEALTH_HTML = path.join(__dirname, '..', 'health_page.html');
const EMERGENCY_HTML = path.join(__dirname, '..', 'emergency_page.html');
const PREDICTION_HTML = path.join(__dirname, '..', 'prediction_page.html');

const server = http.createServer((req, res) => {
  if (req.url === '/assistant') {
    fs.readFile(ASSISTANT_HTML, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading assistant page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/health') {
    fs.readFile(HEALTH_HTML, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading health page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/emergency-sos') {
    fs.readFile(EMERGENCY_HTML, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading emergency page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/prediction' || req.url === '/prediction-results') {
    fs.readFile(PREDICTION_HTML, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading prediction page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/' || req.url === '/home' || req.url === '/profile' || req.url === '/alerts') {
    fs.readFile(HOME_HTML, (err, data) => {
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
