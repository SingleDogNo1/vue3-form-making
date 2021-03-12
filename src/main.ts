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

// global mitt
// use: const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter
import mitt, {Emitter} from 'mitt'
const emitter: Emitter = mitt()
app.config.globalProperties.emitter = emitter

app.use(element).use(router).use(store, key).mount('#app')
