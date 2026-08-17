const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de cabeceras de seguridad y Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com https://aistudio.google.com https://*.google.com https://*.gstatic.com blob: data:; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; " +
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; " +
    "img-src 'self' data: https: http: blob:; " +
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https: http: wss: ws:; " +
    "media-src 'self' data: https: http: blob:; " +
    "worker-src 'self' blob: data: https://aistudio.google.com https://*.google.com https://*.gstatic.com; " +
    "frame-src 'self' https://www.youtube.com https://youtube.com; " +
    "object-src 'none';"
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Servir archivos estáticos del directorio raíz
app.use(express.static(__dirname));

// Fallback para rutas HTML
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
