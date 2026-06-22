import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let activeAvatarBuffer: Buffer | null = null;
let activeAvatarMime: string = 'image/png';

async function startServer() {
  const app = express();
  // Adjust limit for handling high quality base64 image uploads
  app.use(express.json({ limit: '15mb' }));

  // Serve dynamic avatar route
  app.get('/api/avatar', (req, res) => {
    if (activeAvatarBuffer) {
      res.setHeader('Content-Type', activeAvatarMime);
      res.setHeader('Cache-Control', 'public, max-age=60'); // 1 minute cache, bustable with ?t=...
      return res.end(activeAvatarBuffer);
    }
    
    // Check files
    const possibleFiles = ['avatar.png', 'avatar.jpg', 'avatar.jpeg', 'avatar.webp', 'avatar.svg'];
    for (const f of possibleFiles) {
      const distPath = path.join(__dirname, 'dist', f);
      if (fs.existsSync(distPath)) {
        res.setHeader('Content-Type', f.endsWith('.svg') ? 'image/svg+xml' : `image/${f.split('.').pop()}`);
        return res.sendFile(distPath);
      }
      const publicPath = path.join(__dirname, 'public', f);
      if (fs.existsSync(publicPath)) {
        res.setHeader('Content-Type', f.endsWith('.svg') ? 'image/svg+xml' : `image/${f.split('.').pop()}`);
        return res.sendFile(publicPath);
      }
    }

    // Default fallback to SVG placeholder
    res.redirect('/avatar.svg');
  });

  // API endpoint to directly save/upload an image file into the codebase
  app.post('/api/upload-avatar', async (req, res) => {
    try {
      const { image, filename } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'No image data provided. Please provide a base64 encoded image string.' });
      }

      // Extract raw base64 data by removing any standard data URLs headers
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');

      // Update in-memory server cache instantly
      activeAvatarBuffer = buffer;
      const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
      activeAvatarMime = mimeMatch ? mimeMatch[1] : 'image/png';

      // Determine standard target folder inside project code
      const publicFolder = path.join(__dirname, 'public');
      if (!fs.existsSync(publicFolder)) {
        fs.mkdirSync(publicFolder, { recursive: true });
      }

      // We will save it under public/avatar.png so it is served as standard /avatar.png
      const fileExt = filename ? path.extname(filename).toLowerCase() : '.png';
      const targetFilename = `avatar${fileExt}`;
      const targetPathPublic = path.join(publicFolder, targetFilename);

      // Write to project base folder
      try {
        fs.writeFileSync(targetPathPublic, buffer);
        console.log(`[UPLOADER] Saved avatar successfully to project source: ${targetPathPublic}`);
      } catch (e: any) {
        console.warn(`[UPLOADER] Public folder write skipped or read-only: ${e.message}`);
      }

      // We also copy to builder dist output if it's currently running (for instant render in production)
      const distFolder = path.join(__dirname, 'dist');
      if (fs.existsSync(distFolder)) {
        try {
          fs.writeFileSync(path.join(distFolder, targetFilename), buffer);
          console.log(`[UPLOADER] Copied avatar to active dist target: ${path.join(distFolder, targetFilename)}`);
        } catch (e: any) {
          console.warn(`[UPLOADER] Dist folder write skipped or read-only: ${e.message}`);
        }
      }

      // Return dynamic local URL resolution
      return res.status(200).json({
        success: true,
        message: 'Image successfully uploaded and written into your workspace codebase!',
        url: `/api/avatar?t=${Date.now()}` // Dynamic endpoint is much more robust!
      });
    } catch (error: any) {
      console.error('Error in /api/upload-avatar endpoint:', error);
      return res.status(500).json({ error: 'Server filesystem write error', details: error.message });
    }
  });

  // Serve static assets in production or use Vite dev middleware in development
  const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');
  
  if (isProd) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

startServer();
