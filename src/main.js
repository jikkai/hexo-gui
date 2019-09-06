import 'material-icons/iconfont/material-icons.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Vue from 'vue'
import VueMaterial from 'vue-material'

import Plugins from './plugins'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(Plugins)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
