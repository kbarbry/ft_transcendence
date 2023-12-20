import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Charger les variables d'environnement
const { VITE_COMPUTER_ADRESS_CORS } = process.env

export default defineConfig({
  plugins: [react()],
  server: {
    host: VITE_COMPUTER_ADRESS_CORS,
    port: 5173
  }
})
