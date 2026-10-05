import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: false,
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
})