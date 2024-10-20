import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],

  server: {
    host: "0.0.0.0",
    port: 3000, // 开发服务器端口
    open: false, // 是否自动在浏览器打开
    https: {
      cert: './server.crt', // 此处路径为自己项目实际为准
      key: './server.key',  // 此处路径为自己项目实际为准
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'views': fileURLToPath(new URL('./src/views', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
})
