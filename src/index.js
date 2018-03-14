import Vue from 'vue'
import iView from 'iview'

import App from './App'
import router from './router'

import './style/main.css'

Vue.use(iView)

const app = new Vue({
  router,
  ...App
})

app.$mount('#app')
