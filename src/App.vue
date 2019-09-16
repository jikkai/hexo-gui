<template>
  <div class="page-container">
    <md-app md-mode="fixed">
      <!-- Header -->
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Hexo GUI</span>
      </md-app-toolbar>

      <!-- Menu -->
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          Menu
        </md-toolbar>

        <md-list>
          <md-list-item
            v-for="item in menu"
            :key="item.icon"
            :to="item.path"
            exact
          >
            <md-icon>{{item.icon}}</md-icon>
            <span class="md-list-item-text">{{item.title}}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: [{
        title: 'Dashboard',
        icon: 'dashboard',
        path: '/'
      }, {
        title: 'Posts',
        icon: 'edit',
        path: '/posts'
      }, {
        title: 'Settings',
        icon: 'settings',
        path: '/settings'
      }],
      menuVisible: false,
      defaultIndex: this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
.md-app {
  height: 100vh;
}

  // Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.layout {
  height: 100vh;

  .container {
    height: calc(100% - 48px);
    display: flex;

    .main {
      position: relative;
      height: 100%;
      padding: 24px;
      flex: 1;
      background: #f5f7fb;
      overflow: auto;
      z-index: 1;
    }
  }
}
</style>
