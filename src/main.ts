// reset-css
import '@/assets/scss/index.scss'
// vue-core
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// vue-router
import router from './router'
// vuex
import store, { key } from '@/store'
// element-ui
import element from '@/plugins/element-ui'
// vue-draggable
import draggable from 'vuedraggable'

app.component('draggable', draggable)

app.use(element).use(router).use(store, key).mount('#app')
