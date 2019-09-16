<template>
  <section class="posts">
    <md-snackbar :md-active.sync="snackbar.visible" md-persistent>
      {{snackbar.text}}
    </md-snackbar>

    <section class="tool">
      <div>
        <md-button
          class="md-raised md-primary"
          @click="handleAdd"
        >
          ADD
        </md-button>
      </div>
      <div>
        <md-button
          v-if="activePost._id"
          class="md-raised md-accent"
          color="danger"
          @click="handleRemove"
        >
          DELETE
        </md-button>
        <md-button
          class="md-raised md-primary"
          @click="handleSave"
        >
          SAVE
        </md-button>
      </div>
    </section>

    <section class="container">
      <md-content class="list md-card md-scrollbar">
        <md-list class="md-double-line">
          <md-subheader>Drafts</md-subheader>
          <md-list-item
            v-for="item in posts.drafts"
            :key="item._id"
            @click="setActivePost(item)"
          >
            <div class="md-list-item-text">
              <span>{{item.title}}</span>
              <span>{{$date.format(item.date)}}</span>
            </div>
          </md-list-item>

          <md-divider />

          <md-subheader>Posts</md-subheader>
          <md-list-item
            v-for="item in posts.posts"
            :key="item._id"
            @click="setActivePost(item)"
          >
            <div class="md-list-item-text">
              <span>{{item.title}}</span>
              <span>{{$date.format(item.date)}}</span>
            </div>
          </md-list-item>
        </md-list>
      </md-content>

      <md-content class="content md-scrollbar">
        <Editor v-model="activePost" />
      </md-content>
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
      snackbar: {
        visible: false,
        text: ''
      },
      posts: {
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
      this.posts = await this.$api.getPosts()
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
      this.snackbar = {
        visible: true,
        text: 'Done'
      }
    },

    async handleSave () {
      const { _id, title, full_source, raw } = this.activePost

      if (!title) {
        this.snackbar = {
          visible: true,
          text: 'nvalid title'
        }
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
      this.snackbar = {
        visible: true,
        text: 'Done'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.posts {
  height: 100%;

  .md-button {
    margin: 0;
  }
}

.tool {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
  justify-content: space-between;

  .md-card {
    height: 100%;
    margin: 0;
    overflow: auto;
  }

  .list {
    width: 360px;
  }

  .content {
    width: calc(100% - 360px);
  }
}
</style>
