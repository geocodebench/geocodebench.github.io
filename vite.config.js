import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages at https://geocodebench.github.io/ is served from root
  base: '/',
  build: {
    outDir: 'dist',
  },
}))
