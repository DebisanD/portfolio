const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Mount Modular Routes
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/auth', authRoutes);

// Root API Welcome Check
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to DEBISA DARICHA DABA Portfolio REST API',
    endpoints: [
      '/api/stats',
      '/api/profile',
      '/api/projects',
      '/api/skills',
      '/api/experiences',
      '/api/contact',
      '/api/auth/login'
    ]
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Dynamic Port Startup Logic
function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    console.log(`⚡ [Portfolio REST API] Server active on http://localhost:${portToTry}`);
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

startServer(DEFAULT_PORT);
