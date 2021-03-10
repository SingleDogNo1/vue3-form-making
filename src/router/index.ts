import { createRouter, createWebHashHistory} from 'vue-router'
import { basicRoutes } from './routes/index'

const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes
})

export default router