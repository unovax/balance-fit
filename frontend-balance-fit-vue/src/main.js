import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Store from './store'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(Store)
app.mount('#app')