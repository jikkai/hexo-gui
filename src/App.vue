<template>
  <div class="layout">
    <hg-header />

    <section class="container">
      <hg-sidebar :default-index="defaultIndex" />

      <main class="main">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  data () {
    return {
      defaultIndex: this.$route.path
    }
  },

  components: {
    [Header.name]: Header,
    [Sidebar.name]: Sidebar
  }
}
</script>

<style scoped lang="scss">
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
