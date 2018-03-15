import api from './api'

function plugins (Vue) {}
plugins.install = function (Vue) {
  Vue.prototype.$api = api
}

export default plugins
