import 'babel-polyfill'
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/permission' // permission control

Vue.use(ElementUI, { locale })
// 开启debug模式
Vue.config.debug = true
Vue.config.productionTip = false
// 路由跳转
Vue.prototype.$goRoute = function(index) {
  this.$router.push(index)
}
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
