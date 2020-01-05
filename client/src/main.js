import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./vuex/store"
import axios from 'axios'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './less/index.less'
import util from './util'
import tooltip from './util/tooltip'
import config from './config'
import E from 'wangeditor'
import VueLazyload from 'vue-lazyload'
// import directive from './directive/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueLazyload, {
  loading: '../static/img/load.png'
})

// axios.defaults.baseURL = config.BASE_URL  //线上
// axios.defaults.withCredentials = true  //线上
axios.interceptors.request.use(config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  if (util.getLocal('userToken')) {
    config.headers.Authorization = 'Bearer ' + util.getLocal('userToken')
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  for (let i in res) {
    if (i === 'statusText' || i === 'headers' || i === 'config' || i === 'request') {
      delete res[i]
    }
  }
  if (res.data.code === 401) {
    util.removeLocal('userToken')
    tooltip.tip('登录失效，请重新登陆', 'error')
    setTimeout(() => {
      router.go(0)
    }, 1000)
    return
  }
  return res
}, err => {
  return Promise.reject(err)
})

//拦截需要登陆验证的路由
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (util.isNullOrEmpty(util.getLocal('userToken'))) {
      next('/member/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

Vue.prototype.$axios = axios
Vue.prototype.$util = util
Vue.prototype.$tooltip = tooltip
Vue.prototype.$config = config
Vue.prototype.$eventBus = new Vue()
Vue.prototype.$E = E  //引用wangeditor

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")