<template>
  <section class="hexo-editor">
    <textarea class="hexo-editor__content">{{content.raw}}</textarea>
  </section>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
      content: Object
    }
  })
  export default class HexoEditor extends Vue {
  }
</script>

<style>
  @component-namespace hexo {
    @c editor {
      size: 100%;

      @d content {
        size: 100%;
        padding: 12px 24px;
        font-size: 14px 2;
        border: none;
        box-sizing: border-box;
        display: block;
        resize: none;
      }
    }
  }
</style>
