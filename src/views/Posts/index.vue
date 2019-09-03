<template>
  <section class="posts">
    <section class="tool">
      <vs-button @click="handleAdd">ADD</vs-button>
      <div>
        <vs-button v-if="activePost._id" color="danger" @click="handleRemove">DELETE</vs-button>
        <vs-button @click="handleSave">SAVE</vs-button>
      </div>
    </section>

    <section class="container">
      <vs-card class="list">
        <vs-list>
          <vs-list-header title="Drafts" />
          <vs-list-item
            v-for="item in list.drafts"
            :key="item._id"
            :title="item.title"
            :subtitle="$date.format(item.date)"
            @click.native="setActivePost(item)"
          />

          <vs-list-header title="Posts" color="success" />
          <vs-list-item
            v-for="item in list.posts"
            :key="item._id"
            :title="item.title"
            :subtitle="$date.format(item.date)"
            @click.native="setActivePost(item)"
          />
        </vs-list>
      </vs-card>

      <Editor v-model="activePost" />
    </section>
  </section>
</template>

<script>
  import Editor from './components/Editor'

  export default {
    components: {
      Editor
    },

    data () {
      return {
        list: {
          drafts: [],
          posts: []
        },
        activePost: {}
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      async fetchData () {
        const posts = await this.$api.getPosts()
        this.list = posts
      },

      setActivePost (post) {
        this.activePost = post
      },

      async handleOpen (post) {
        await this.$api.openPostAsset(post.asset_dir)
      },

      handleAdd () {
        this.activePost = {}
      },

      async handleRemove () {
        const { full_source } = this.activePost

        await this.$api.removePost(full_source)
        this.fetchData()
        this.$vs.notify({
          title: 'Info',
          text: 'Done'
        })
      },

      async handleSave () {
        const { _id, title, full_source, raw } = this.activePost

        if (!title) {
          this.$vs.notify({
            title: 'Error',
            text: 'Invalid title',
            color: 'danger'
          })
          return
        }

        if (_id) {
          // update
          await this.$api.updatePost(full_source, raw)
        } else {
          // create
          const { path } = await this.$api.addPost(title)
          await this.$api.updatePost(path, raw)
        }
        this.fetchData()
        this.$vs.notify({
          title: 'Info',
          text: 'Done'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .posts {
    height: 100%;
  }

  .tool {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      button {
        margin-left: 12px;
      }
    }
  }

  .container {
    height: calc(100% - 64px);
    display: flex;
  }

  .list {
    width: 320px;
    margin-bottom: 0;
    overflow: auto;
  }
</style>
