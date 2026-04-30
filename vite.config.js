import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vendors: resolve(__dirname, 'vendors/index.html'),
        attendees: resolve(__dirname, 'attendees/index.html'),
        venues: resolve(__dirname, 'venues/index.html'),
        cities: resolve(__dirname, 'cities/index.html'),
        legal: resolve(__dirname, 'legal/index.html'),
      }
    }
  }
})
