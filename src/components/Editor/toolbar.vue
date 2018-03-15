<template>
  <section class="hexo-editor-toolbar">
    123
  </section>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class HexoEditorToolbar extends Vue {
  }
</script>

<style>
  @component-namespace hexo-editor {
    @c toolbar {
      position: absolute;
      top: 0;
      right: 0;
      size: 50px 100%;
    }
  }
</style>
