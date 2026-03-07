import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Use workspace shared/ for local dev, fallback to local copy for Netlify build
const sharedPath = fs.existsSync(path.resolve(__dirname, '../shared'))
  ? path.resolve(__dirname, '../shared')
  : path.resolve(__dirname, './shared')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5174,
    fs: {
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      '@shared': sharedPath,
      '@app': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
})
