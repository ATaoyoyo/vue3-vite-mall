import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

const path = (name) => resolve(__dirname, name)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  optimizeDeps: {
    include: ['vuex'],
  },
  resolve: {
    alias: {
      '/@': path('src'),
      '/cpn': path('src/components'),
      '/page': path('src/page'),
      '/view': path('src/view'),
      '/utils': path('src/utils'),
      '/api': path('src/api'),
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
