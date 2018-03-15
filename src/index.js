import 'babel-polyfill'
import Vue from 'vue'
import iView from 'iview'

import Plugins from '~plugins'
import App from './App'
import router from './router'

import './style/main.css'

Vue.use(iView)
Vue.use(Plugins)

const app = new Vue({
  router,
  ...App
})

app.$mount('#app')
