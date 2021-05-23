import Vue from 'vue'
import Vuex from 'vuex'
import {Loader} from 'google-maps';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    googleMapLoader : new Loader('AIzaSyB9E3oa8d364apiXxwe3vYa7kfaIq1ww1A', {}),
    isMobile: false,
    isLogin: false,
    memberId: null,
  },
  mutations: {
    isMobile(state){
      state.isMobile = window.innerWidth < 600;
    },
    isLogin(state, login){
      state.isLogin = login;
    },
    isMemberId (state, memberId){
      state.memberId = memberId;
    }
  },
  actions: {
  },
  modules: {
  }
})
