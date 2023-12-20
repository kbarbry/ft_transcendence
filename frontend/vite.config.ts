import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'z3r3p3.42lyon.fr',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
})
