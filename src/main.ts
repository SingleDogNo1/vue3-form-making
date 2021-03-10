import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'
import store, { key } from '@/store'
import element from '@/plugins/element-ui'

app.use(element).use(router).use(store, key).mount('#app')
