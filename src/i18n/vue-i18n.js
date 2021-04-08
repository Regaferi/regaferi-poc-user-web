import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh-CN',
    messages: {
        'zh-CN': require('./lang/i18n-zh'),
        'en-US': require('./lang/i18n-en'),
        'japan': require('./lang/i18n-ja')
    }
});

export default i18n