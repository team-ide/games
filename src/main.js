import '@mdi/font/css/materialdesignicons.css'


import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'

import './assets/main.css'

const app = createApp(App)

// 设置为非严格模式
app.config.isStrictMode = false;
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')
