import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['alzheimer.knowhy.app', '.knowhy.app'],
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true
    },
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  }
})

