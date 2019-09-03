import api from './api'
import date from './date'

function plugins (Vue) {}
plugins.install = function (Vue) {
  Vue.prototype.$api = api
  Vue.prototype.$date = date
}

export default plugins
