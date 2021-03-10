import ElementPlus from 'element-plus'
import './index.scss'
import { App } from 'vue'
import i18n from '@/i18n'

export default (app: App) => {
  app.config.globalProperties.$ELEMENT = { size: 'medium', zIndex: 3000 }
  app.use(ElementPlus, {
    i18n: i18n.global.t
  })
  app.use(i18n)
}
