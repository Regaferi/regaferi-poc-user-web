import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import i18n from './i18n/vue-i18n'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyD-n8DfpYPaGQSeiM_ex1g0KG2aaFaUwtE',
    libraries: ['places'],
  },
})
new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
