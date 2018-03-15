<template>
  <section class="hexo-editor">
    <textarea class="hexo-editor__content">{{content.raw}}</textarea>
    <hexo-editor-toolbar />
  </section>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import EditorToolbar from './toolbar'

  @Component({
    props: {
      content: Object
    },
    components: {
      [EditorToolbar.name]: EditorToolbar
    }
  })
  export default class HexoEditor extends Vue {
  }
</script>

<style>
  @component-namespace hexo {
    @c editor {
      position: relative;
      size: 100%;
      display: flex;

      @d content {
        size: 100%;
        padding: 12px 74px 12px 24px;
        font-size: 14px 2;
        background: inherit;
        border: none;
        box-sizing: border-box;
        display: block;
        resize: none;
      }
    }
  }
</style>
