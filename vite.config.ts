import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional, default for Vite
    proxy: {
      '/api': 'http://localhost:5000', // 👈 this connects to your Express server
    },
  },
})
