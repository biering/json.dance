import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/json.dance/',
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
  },
})
