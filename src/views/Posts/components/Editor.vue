<template>
  <vs-card class="editor">
    <section class="meta">
      <vs-input v-model="meta.title" placeholder="Title" @change="handleChangeInput" />
      <vs-input v-model="meta.date" placeholder="Date" @change="handleChangeInput" />
      <vs-input v-model="meta.categories" placeholder="Categories" @change="handleChangeInput" />
      <vs-input v-model="meta.tags" placeholder="Tags" @change="handleChangeInput" />
    </section>

    <section class="container">
      <div ref="editor" />
    </section>
  </vs-card>
</template>

<script>
  import Editor from 'tui-editor'
  import 'codemirror/lib/codemirror.css'
  import 'tui-editor/dist/tui-editor.css'
  import 'tui-editor/dist/tui-editor-contents.css'
  import 'highlight.js/styles/github.css'

  export default {
    data () {
      return {
        editor: null
      }
    },

    props: {
      value: Object
    },

    watch: {
      value (newVal) {
        const { _content, path } = newVal
        const HOST = `http://${location.host}`

        this.editor.setValue(_content)
        setTimeout(() => {
          const $images = this.$refs.editor.querySelectorAll('img')
          $images && $images.forEach($img => {
            $img.src = `${HOST}/${path}${$img.src.replace(`${HOST}/admin/`, '')}`
          })
        }, 100)
      }
    },

    mounted () {
      this.editor = new Editor({
        el: this.$refs.editor,
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '100%',
        hideModeSwitch: true,
        exts: ['scrollSync']
      })

      this.editor.on('change', this.handleChangeInput)
    },

    computed: {
      meta () {
        const { title = '', date = '', tags = '', categories = '', _content = '' } = this.value

        return {
          title,
          date: this.$date.format(date),
          tags: tags.toString(),
          categories: categories.toString(),
          _content
        }
      }
    },

    methods: {
      handleChangeInput () {
        const value = this.editor.getValue()
        const { title = '', date = '', tags = '', categories = '' } = this.meta

        const raw = `---\ntitle: ${
          title.includes(':') ? `'${title}'` : title
        }\ndate: ${
          date
        }\ntags: [${
          tags
        }]\ncategories: ${
          categories
        }\n---\n${
          value
        }`

        const content = Object.assign(this.value, {
          title,
          date,
          tags,
          categories,
          _content: value,
          raw
        })
        this.$emit('input', content)
      }
    }
  }
</script>

<style scoped lang="scss">
  .editor {
    height: 100%;
    margin-left: 24px;
    margin-bottom: 0;
    flex: 1;

    .con-vs-card {
      height: 100%;
    }

    ::v-deep .vs-card--content {
      height: 100%;
    }
  }

  .meta {
    height: 160px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .vs-input {
      width: 100%;
    }
  }

  .container {
    height: calc(100% - 160px);
  }
</style>
