import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

// const path = (name) => resolve(__dirname, name)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${ name }/style`,
        },
      ],
    }),
  ],
  optimizeDeps: {
    include: ['vuex'],
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      'cpn': path.resolve(__dirname, './src/components'),
      'page': path.resolve(__dirname, 'src/page'),
      'view': path.resolve(__dirname, 'src/view'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'api': path.resolve(__dirname, './src/api'),
    },
  },
  server: {
    open: true,
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://backend-api-01.newbee.ltd',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
