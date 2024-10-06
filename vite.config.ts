import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    https: process.env.NODE_ENV === 'development'
      ? {
        key: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost.pem')),
      }
      : undefined, // Use undefined instead of false
  },
});
