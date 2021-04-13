import Vue from 'vue'
import Vuex from 'vuex'
import {Loader} from 'google-maps';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    googleMapLoader : new Loader('AIzaSyB9E3oa8d364apiXxwe3vYa7kfaIq1ww1A', {}),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
