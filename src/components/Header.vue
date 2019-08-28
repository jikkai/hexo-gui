<template>
  <vs-navbar class="header">
    <div slot="title">
      <vs-navbar-title>
        HEXO GUI
      </vs-navbar-title>
    </div>
  </vs-navbar>
</template>

<script>
export default {
  name: 'hg-header',
  props: {
    activeItem: Number
  }
}
</script>

<style scoped lang="scss">
  .header {
    height: 48px;
  }
</style>
