import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, "./src/components"),
      'composables': path.resolve(__dirname, "./src/composables"),
      'design': path.resolve(__dirname, "./src/design"),
      'pages': path.resolve(__dirname, "./src/pages"),
      'routing': path.resolve(__dirname, "./src/routing"),
      'services': path.resolve(__dirname, "./src/services"),
      'stores': path.resolve(__dirname, "./src/stores"),
      'utils': path.resolve(__dirname, "./src/utils"),
    }
  },
  server: {
    port: 3000
  },
  plugins: [vue(), vueJsx()],
})
