<template>
  <section class="hexo-container">
    <hexo-header />
    <section class="hexo-content">
      <hexo-menu :menus="menus" :activedId="activedId" @change="handleChange" />
      <hexo-editor class="hexo-main" :content="activedPost" />
    </section>
  </section>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Header from '~components/Header'
  import Menu from '~components/Menu'
  import Editor from '~components/Editor'

  @Component({
    components: {
      [Header.name]: Header,
      [Menu.name]: Menu,
      [Editor.name]: Editor
    }
  })
  export default class HomeRoute extends Vue {
    posts = []
    activedId = ''
    menus = []

    async created () {
      const resp = await this.$api.getPosts()
      this.posts = resp.data.sort((a, b) => this.$date.compare(a.date, b.date))

      this.activedId = this.posts[0]._id
      this.menus = this.posts.map(post => {
        const { title, date, _id } = post
        return { title, date, _id }
      })
    }

    // ===================================
    // Methods
    // ===================================
    handleChange (id) {
      this.activedId = id
    }

    get activedPost () {
      return this.posts.find(post => post._id === this.activedId) || {}
    }
  }
</script>
