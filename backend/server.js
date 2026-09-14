require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const connectDB = require('./config/db');
const { DEFAULT_PORT, MAX_PORT } = require('./config/constants');
const { requestLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');

// Route Modules
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statsRoutes = require('./routes/statsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect MongoDB Database
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Serve Static Uploads & Public Images
const imagesPath = path.join(__dirname, '../frontend/public/images');
if (fs.existsSync(imagesPath)) {
  app.use('/images', express.static(imagesPath));
}

// Mount Modular Routes
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/auth', authRoutes);

// Root API Welcome Data Generator
const getWelcomeData = () => ({
  status: 'online',
  message: 'Welcome to DEBISA DARICHA DABA Portfolio REST API (MongoDB Powered)',
  developer: 'DEBISA DARICHA DABA',
  role: 'Senior Full Stack Software Engineer',
  database: 'MongoDB',
  serverTime: new Date().toISOString(),
  endpoints: {
    stats: '/api/stats',
    profile: '/api/profile',
    projects: '/api/projects',
    skills: '/api/skills',
    experiences: '/api/experiences',
    contact: '/api/contact (POST)',
    auth: '/api/auth/login (POST)'
  }
});

// Root URL GET / (Fixes "Cannot GET /" 404 error)
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    const port = req.socket.localPort || process.env.PORT || DEFAULT_PORT;
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DEBISA DARICHA DABA | Portfolio REST API</title>
        <style>
          body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #030712; color: #f8fafc; margin: 0; padding: 40px 20px; display: flex; justify-content: center; align-items: center; min-height: 80vh; }
          .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; max-width: 600px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
          .badge { background: #06b6d4; color: #030712; font-weight: 800; padding: 4px 12px; border-radius: 20px; font-size: 12px; display: inline-block; margin-bottom: 12px; letter-spacing: 0.5px; }
          h1 { margin: 0 0 6px 0; font-size: 26px; color: #ffffff; letter-spacing: -0.5px; }
          p { color: #94a3b8; font-size: 14px; margin: 0 0 24px 0; }
          .endpoint { background: #1e293b; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #334155; }
          .endpoint span { font-size: 13px; color: #cbd5e1; font-weight: 600; }
          .endpoint a { color: #38bdf8; text-decoration: none; font-family: 'Consolas', monospace; font-size: 14px; font-weight: 700; }
          .endpoint a:hover { text-decoration: underline; color: #7dd3fc; }
          .method { background: #10b981; color: #030712; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px; margin-left: 8px; }
          .method-post { background: #8b5cf6; color: #ffffff; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">🟢 REST API ACTIVE & LIVE</div>
          <h1>DEBISA DARICHA DABA</h1>
          <p>Portfolio REST API Backend (MongoDB Powered)</p>
          <div>
            <div class="endpoint"><span>Profile API</span> <a href="/api/profile" target="_blank">/api/profile <span class="method">GET</span></a></div>
            <div class="endpoint"><span>Projects API</span> <a href="/api/projects" target="_blank">/api/projects <span class="method">GET</span></a></div>
            <div class="endpoint"><span>Skills API</span> <a href="/api/skills" target="_blank">/api/skills <span class="method">GET</span></a></div>
            <div class="endpoint"><span>Experiences API</span> <a href="/api/experiences" target="_blank">/api/experiences <span class="method">GET</span></a></div>
            <div class="endpoint"><span>Stats Overview</span> <a href="/api/stats" target="_blank">/api/stats <span class="method">GET</span></a></div>
            <div class="endpoint"><span>Contact Form</span> <a href="/api/contact" target="_blank">/api/contact <span class="method method-post">POST</span></a></div>
          </div>
          <div class="footer">Server active on port ${port} | MongoDB Connected</div>
        </div>
      </body>
      </html>
    `);
  }
  res.json(getWelcomeData());
});

// Root API Endpoint GET /api
app.get('/api', (req, res) => {
  res.json(getWelcomeData());
});

// 404 Fallback Handler for Unknown API Endpoints
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl });
});

// Centralized Error Handler
app.use(errorHandler);

// Dynamic Port Startup Logic
function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    console.log(`⚡ [Portfolio MongoDB REST API] Server active on http://localhost:${portToTry}`);
    try {
      fs.writeFileSync(path.join(__dirname, 'data', 'server-port.json'), JSON.stringify({ port: portToTry }), 'utf8');
    } catch (e) {}
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE' && portToTry < MAX_PORT) {
      console.log(`[Port Warning] Port ${portToTry} in use, attempting ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('[Server Start Error]', err);
    }
  });
}

startServer(process.env.PORT || DEFAULT_PORT);
