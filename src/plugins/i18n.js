import { createI18n } from 'vue-i18n'

const messages = {
    zh: {
        message: {
            navs: '当前',
            tunnelNumbers: '隧道数量：1000个'
        }
    },
    en: {
        message: {
            navs: 'current',
            tunnelNumbers: 'Tunnel Numbers: 1000'
        }
    }
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'zh',
    globalInjection: true,
    messages
})

export default i18n