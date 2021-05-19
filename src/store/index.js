import Vue from 'vue'
import Vuex from 'vuex'
import {Loader} from 'google-maps';

//引入vuex 数据持久化插件
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    googleMapLoader : new Loader('AIzaSyB9E3oa8d364apiXxwe3vYa7kfaIq1ww1A', {}),
    isMobile: false,
    isLogin: false,
  },
  mutations: {
    isMobile(state){
      state.isMobile = window.innerWidth < 600;
    },
    isLogin(state, login){
      state.isLogin = login;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    reducer(val) {
      return {
        // 只储存state中的token
        token: val.token,
        roles: val.roles,
        tagsList: val.tagsList,
        lang:val.lang,
        breadList:val.breadList
      }
    }
  })]
})
