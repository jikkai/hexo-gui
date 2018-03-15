import Vue from 'vue'
import Router from 'vue-router'

import Post from './Post'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '',
      component: Post
    }
  ]
})
