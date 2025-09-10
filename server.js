const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const distDir = path.join(__dirname, 'dist', 'angular-csp-nonce', 'browser');

// Serve static files without auto-index so we can inject nonce on "*"
app.use(express.static(distDir, { index: false }));

app.get('*', (req, res) => {
  // 128-bit (16-byte) cryptographically strong nonce, base64-encoded
  const nonce = crypto.randomBytes(16).toString('base64');

  // Strict CSP that allows styles only if they carry this nonce
  // If you don't use inline scripts, 'script-src' can be just 'self'
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'"
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);

  const indexPath = path.join(distDir, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  // Stamp the same nonce into all placeholders
  html = html.replace(/__NONCE__/g, nonce);

  res.status(200).send(html);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serving on http://localhost:${port} with CSP nonces`);
});
