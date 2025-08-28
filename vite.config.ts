import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath, URL} from 'node:url'
import react from '@vitejs/plugin-react-swc'
import {resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { 
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
