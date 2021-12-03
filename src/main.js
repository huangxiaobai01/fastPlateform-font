import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'

// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// vueScroll
import vuescroll from 'vuescroll'
Vue.use(vuescroll)

// http
import api from '@/api/index.js'
Vue.prototype.api = api

// 引入echarts
import '@/utils/initEcharts.js';

import './permission/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
