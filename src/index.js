import Vue from 'vue'
import App from './App'
import router from './router'
import './style/main.css'

const app = new Vue({
  router,
  ...App
})

app.$mount('#app')
