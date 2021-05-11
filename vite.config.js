import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from "path"

const path = name => resolve(__dirname, name)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': path('src'),
      '/cpn': path('src/components'),
      '/page': path('src/page'),
      '/view': path('src/view'),
      '/utils': path('src/utils')
    }
  },
  server: {
    open: true,
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://backend-api-01.newbee.ltd',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
