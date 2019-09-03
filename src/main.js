import 'material-icons/iconfont/material-icons.css'
import 'vuesax/dist/vuesax.css'

import Vue from 'vue'
import Vuesax from 'vuesax'

import Plugins from './plugins'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuesax)
Vue.use(Plugins)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
