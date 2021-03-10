import { RouteRecordRaw } from 'vue-router'
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About/index.vue')
  }
]
