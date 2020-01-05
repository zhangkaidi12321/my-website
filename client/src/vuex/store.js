import Vue from "vue"
import Vuex from "vuex"
import member from './modules/member'
import vuexTest from './modules/vuexTest'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    member, vuexTest
  },
  //状态属性
  state: {},
  //访问
  getters: {},
  //状态突变
  mutations: {},
  //异步分发
  actions: {}
})
