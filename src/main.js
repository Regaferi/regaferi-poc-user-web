import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import i18n from './i18n/vue-i18n'
import Antd from 'ant-design-vue';
import store from './store'

import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;

Vue.use(Antd)

import message from './components/message/message.js'
Vue.prototype.$message = message
//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//vant组件
import Vant,{Lazyload} from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Lazyload);

Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})

new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

