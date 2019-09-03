<template>
  <vs-sidebar
    class="sidebar"
    static-position
    reduce
    reduce-not-hover-expand
    hidden-background
    :default-index="defaultIndex"
  >
    <vs-sidebar-item icon="dashboard" index="/" to="/" />
    <vs-sidebar-item icon="edit" index="/posts" to="/posts" />
    <vs-sidebar-item icon="settings" index="/settings" to="/settings" />
  </vs-sidebar>
</template>

<script>
export default {
  props: {
    defaultIndex: String
  }
}
</script>

<style scoped lang="scss">
  .sidebar {
    position: relative;
    height: 100%;
    overflow: auto;
    z-index: 0;
  }
</style>
