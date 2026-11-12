import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distPath = path.resolve(__dirname, 'dist');

// Middleware for JSON
app.use(express.json());

// Cloud Run health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', app: 'Shishu Pathshala', uptime: process.uptime() });
});

// Download Android native Capacitor project ZIP
app.get('/api/download-android-project', (_req, res) => {
  const zipPath = path.resolve(__dirname, 'public', 'shishu-pathshala-android-project.zip');
  if (fs.existsSync(zipPath)) {
    res.download(zipPath, 'shishu-pathshala-android-project.zip');
  } else {
    res.status(404).send('ZIP not found');
  }
});

// Serve compiled PWA & static assets
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1d' }));
}

// SPA fallback to index.html
app.get('*', (_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Shishu Pathshala is compiling. Please refresh in a moment.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Shishu Pathshala production server listening on http://0.0.0.0:${PORT}`);
});
