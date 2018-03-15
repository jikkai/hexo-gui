<template>
  <section class="hexo-container">
    <hexo-header />
    <section class="hexo-content">
      <hexo-menu :menus="menus" :activedId="activedId" @change="handleMenuChange" />
      <hexo-editor
        class="hexo-main"
        :content="activedPost"
        @save="handleSave"
        @add="handleAdd"
        @remove="handleRemove"
      />
    </section>
  </section>
</template>

<script>
  import Header from '~components/Header'
  import Menu from '~components/Menu'
  import Editor from '~components/Editor'

  export default {
    data () {
      return {
        posts: [],
        activedId: '',
        menus: []
      }
    },
    async created () {
      const resp = await this.$api.getPosts()
      this.posts = resp.data.sort((a, b) => this.$date.compare(a.date, b.date))

      this.activedId = this.posts[0]._id
      this.menus = this.posts.map(post => {
        const { title, date, _id } = post
        return { title, date, _id }
      })
    },
    methods: {
      handleMenuChange (id) {
        this.activedId = id
      },
      async handleAdd (title) {
        await this.$api.addPost(title)
        this.$Message.success('新建成功')
        location.reload()
      },
      async handleSave (content) {
        await this.$api.updatePost(content.full_source, content.raw)
        this.$Message.success('保存成功')
      },
      async handleRemove (content) {
        await this.$api.removePost(content.full_source)
        this.$Message.success('删除成功')
        location.reload()
      }
    },
    components: {
      [Header.name]: Header,
      [Menu.name]: Menu,
      [Editor.name]: Editor
    },
    computed: {
      activedPost () {
        return this.posts.find(post => post._id === this.activedId) || {}
      }
    }
  }
</script>
