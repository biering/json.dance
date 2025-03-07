import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
  },
})
