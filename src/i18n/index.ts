import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import en from './en_US.json'
import cn from './zh_CN.json'

const messages = {
  [enLocale.name]: {
    el: enLocale.el,
    ...en
  },
  [zhLocale.name]: {
    el: zhLocale.el,
    ...cn
  }
}

const i18n = createI18n({
  locale: zhLocale.name,
  fallbackLocale: enLocale.name,
  messages
})

export default i18n
