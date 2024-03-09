import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { checkBtnShow, checkTabShow } from './utils/checkBtnAndTabShow'
import LitUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import '@/styles/index.scss'
import './icons' // icon
import './permission'

import i18n from '@/components/lang' // Internationalization
import * as echarts from 'echarts'

import initStepClick from '@libs/utils/v-step-click'

initStepClick(Vue)

import Tinymce from '@/components/tinymce/index.vue'
Vue.component('tinymce', Tinymce)
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.prototype.$echarts = echarts
Vue.prototype.$checkBtnShow = checkBtnShow
Vue.prototype.$checkTabShow = checkTabShow
Vue.use(LitUI, {
  size: 'small',
  effect: 'light',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
