import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig((conditionalConfig) => {

  const { mode } = conditionalConfig; // conditionalConfig对象包含4个字段
  const env = loadEnv(mode, __dirname); // 根据 mode 来判断当前是何种环境
  return {
    plugins: [
      vue(),
    ],
    root: process.cwd(), // 项目根目录（index.html 文件所在的位置）
    base: env.VITE_MODE === 'production' ? './' : '/', // 开发或生产环境服务的公共基础路径。
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
  }
})
