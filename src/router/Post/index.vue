<template>
  <section class="hexo-container">
    <hexo-header />
    <section class="hexo-content">
      <hexo-list :posts="posts" />
      <main class="hexo-main">
        {{posts}}
      </main>
    </section>
  </section>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Header from '~components/Header'
  import List from '~components/List'

  @Component({
    components: {
      [Header.name]: Header,
      [List.name]: List
    }
  })
  export default class HomeRoute extends Vue {
    posts = []

    async created () {
      const resp = await this.$api.getPosts()
      this.posts = resp.data
    }
  }
</script>
