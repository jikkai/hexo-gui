<template>
  <section class="home">
    <md-card>
      <md-card-header>
        <div class="md-title">{{configs.global.title}}</div>
        <div class="md-subhead">{{configs.global.subtitle}}</div>
      </md-card-header>
      <md-card-content>
        Author: {{configs.global.author}}
      </md-card-content>
      <md-card-actions md-alignment="left">
        <md-button class="md-raised md-primary" :href="baseUrl" target="_blank">
          Preview
        </md-button>
      </md-card-actions>
    </md-card>

    <section class="container">
      <md-card>
        <md-card-header>
          <div class="md-title">THEME</div>
        </md-card-header>
        <md-card-content class="md-body-1">
          <div>
            <span class="md-body-2">name: </span>
            <span class="md-caption">{{configs.global.theme}}</span>
          </div>
          <div v-for="(item, key) in configs.theme" :key="key">
            <span class="md-body-2">{{key}}: </span>
            <span class="md-caption">
              {{['string', 'number'].includes(typeof(item)) ? item : typeof(item)}}
            </span>
          </div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-header>
          <div class="md-title">POSTS</div>
        </md-card-header>
        <md-card-content class="md-body-1">
          <div>
            <span class="md-body-2">posts: </span>
            <span class="md-caption">{{posts.posts.length}}</span>
          </div>
          <div>
            <span class="md-body-2">drafts: </span>
            <span class="md-caption">{{posts.drafts.length}}</span>
          </div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-header>
          <div class="md-title">SETTINGS</div>
        </md-card-header>
        <md-card-content class="md-body-1">
          CONTENT
        </md-card-content>
      </md-card>
    </section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: window.location.origin,
      configs: {
        global: {},
        theme: {}
      },
      posts: {
        drafts: [],
        posts: []
      }
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      this.configs = await this.$api.getConfigs()
      this.posts = await this.$api.getPosts()
    }
  }
}
</script>

<style lang="scss" scoped>
.md-card {
  margin: 0;
}

.container {
  margin: 24px 0;
  display: flex;
  justify-content: space-between;

  .md-card {
    width: 30%;
  }
}
</style>
