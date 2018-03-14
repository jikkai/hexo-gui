import Vue from 'vue'
import Router from 'vue-router'

import Layout from '~components/Layout'
import Post from './Post'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Post
        }
      ]
    }
  ]
})
