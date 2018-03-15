<template>
  <section class="hexo-editor">
    <textarea
      class="hexo-editor__content"
      v-model="content.raw"
      @input="$emit('change', content)"
    />
    <hexo-editor-toolbar />
  </section>
</template>

<script>
  import EditorToolbar from './toolbar'

  export default {
    name: 'hexo-editor',
    props: {
      content: Object
    },
    components: {
      [EditorToolbar.name]: EditorToolbar
    }
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
