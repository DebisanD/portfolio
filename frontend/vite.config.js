import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

let backendPort = 5110;
try {
  const portFile = path.resolve(__dirname, '../backend/data/server-port.json');
  if (fs.existsSync(portFile)) {
    const data = JSON.parse(fs.readFileSync(portFile, 'utf8'));
    if (data.port) backendPort = parseInt(data.port, 10);
  }
} catch (e) {}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: `http://localhost:${backendPort}`,
        changeOrigin: true
      }
    }
  }
});
