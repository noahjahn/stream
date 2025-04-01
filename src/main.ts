import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './routing/routes'

createApp(App).use(router).mount('#app')
