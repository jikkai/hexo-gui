<template>
  <section class="hexo-editor">
    <textarea
      class="hexo-editor__content"
      v-model="content.raw"
    />
    <hexo-editor-toolbar
      :content="content"
      @save="$emit('save', content)"
      @add="handleAdd"
      @open="$emit('open', content)"
      @remove="handleRemove"
    />
  </section>
</template>

<script>
  import EditorToolbar from './toolbar'

  export default {
    name: 'hexo-editor',
    data () {
      return {
        editor: null,
        title: ''
      }
    },
    props: {
      content: Object
    },
    methods: {
      handleAdd () {
        this.$Modal.confirm({
          render: h => {
            return h('Input', {
              props: {
                value: this.title,
                autofocus: true,
                placeholder: '请输入文章标题'
              },
              on: {
                input: (val) => {
                  this.title = val
                }
              }
            })
          },
          onOk: () => {
            if (this.title) this.$emit('add', this.title)
          },
          onCancel: () => {
            this.title = ''
          }
        })
      },
      handleRemove () {
        this.$Modal.confirm({
          title: '删除确认',
          content: '是否确认删除该文章？',
          onOk: () => {
            this.$emit('remove', this.content)
          }
        })
      }
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
      box-sizing: border-box;

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
