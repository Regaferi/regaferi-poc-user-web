import Vue from 'vue'
import Vuex from 'vuex'
import {Loader} from 'google-maps';

//引入vuex 数据持久化插件
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    Authorization: '',
    Content_length: '',
    roles: [], //用户角色
    tagsList: [], //打开的标签页个数,
    isCollapse: true, //侧边导航是否折叠
    lang:'zh',//默认语言
    breadList:['home'],//面包屑导航
    googleMapLoader : new Loader('AIzaSyB9E3oa8d364apiXxwe3vYa7kfaIq1ww1A', {}),
    isMobile: false,
    isLogin: false,
    memberId: null,
  },
  mutations: {
    //保存token
    COMMIT_TOKEN(state, object) {

      state.token = object.authorityToken;
    },
    //保存支付
    COMMIT_ZHIFU(state, object) {
      console.log(object,'vuex')
      state.Authorization = object

    },//保存支付
    COMMIT_Content(state, object) {
      console.log(object,'vuex')
      state.Content_length = object

    },
    //保存标签
    TAGES_LIST(state, arr) {
      state.tagsList = arr;
    },
    IS_COLLAPSE(state, bool) {
      state.isCollapse = bool;
    },
    //保存用户
    COMMIT_ROLE(state, roles) {
      state.roles = roles
    },
    GET_LANGUAGE(state,lang){
      state.lang=lang
    },
    SET_BREAD(state,breadList){
      state.breadList=breadList
    },
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
