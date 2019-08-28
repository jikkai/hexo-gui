<template>
  <section class="posts">
    <vs-row>
      <vs-col vs-w="3">
        <vs-card>
          <vs-list>
            <vs-list-header title="Drafts" />
            <vs-list-item
              v-for="item in list.drafts"
              :key="item._id"
              :title="item.title"
              @click.native="setActivePost(item)"
            />

            <vs-list-header title="Posts" color="success" />
            <vs-list-item
              v-for="item in list.posts"
              :key="item._id"
              :title="item.title"
              @click.native="setActivePost(item)"
            />
          </vs-list>
        </vs-card>
      </vs-col>

      <vs-col vs-offset="1" vs-w="8">
        <vs-card>
          <div ref="editor" />
        </vs-card>
      </vs-col>
    </vs-row>
  </section>
</template>

<script>
  import Editor from 'tui-editor'
  import 'codemirror/lib/codemirror.css'
  import 'tui-editor/dist/tui-editor.css'
  import 'tui-editor/dist/tui-editor-contents.css'
  import 'highlight.js/styles/github.css'

  export default {
    data () {
      return {
        editor: null,
        list: {
          drafts: [],
          posts: []
        },
        activePost: {}
      }
    },

    async created () {
      const posts = await this.$api.getPosts()
      this.list = posts
    },

    mounted () {
      this.editor = new Editor({
        el: this.$refs.editor,
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '300px'
      })
    },

    methods: {
      setActivePost (post) {
        console.log(post)
        this.activePost = post
        this.editor.setValue(post._content)
        setTimeout(() => {
          const $images = this.$refs.editor.querySelectorAll('img')
          $images.forEach($img => {
            console.log($img)
            $img.src = `/${post.path}${$img.src.replace(`http://${location.host}/admin/`, '')}`
          })
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss">
  .posts {
  }
</style>
