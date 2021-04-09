import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import i18n from './i18n/vue-i18n'

Vue.config.productionTip = false

Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})


new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
