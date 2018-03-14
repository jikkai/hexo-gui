<template>
  <ul class="hexo-list">
    list
  </ul>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class HexoList extends Vue {
  }
</script>

<style>
  @component-namespace hexo {
    @c list {
      width: 240px;
      color: #fff #495060;
      overflow: auto;
    }
  }
</style>
