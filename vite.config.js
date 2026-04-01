import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  root: '.', // index.html est à la racine
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // ton dossier Vue
    }
  },
  build: {
    outDir: 'dist', // Build à la racine
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html') // Assure que vite build index.html
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})