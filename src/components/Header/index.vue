<template>
  <header class="hexo-header">
    header
  </header>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class HexoHeader extends Vue {
  }
</script>

<style>
  @component-namespace hexo {
    @c header {
      height: 64px;
      color: #fff #495060;
    }
  }
</style>
