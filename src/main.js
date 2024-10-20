import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 设置为非严格模式
app.config.isStrictMode = false;
app.use(router)

app.mount('#app')
