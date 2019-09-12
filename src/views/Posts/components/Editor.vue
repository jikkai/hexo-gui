<template>
  <md-card class="editor">
    <md-card-content ref="content">
      <md-tabs class="md-primary">
        <md-tab id="tab-meta" md-label="Meta">
          <section class="meta">
            <md-field>
              <label>Title</label>
              <md-input v-model="meta.title" @change="handleChangeInput" />
            </md-field>
            <md-field>
              <label>Date</label>
              <md-input v-model="meta.date" @change="handleChangeInput" />
            </md-field>
            <md-field>
              <label>Categories</label>
              <md-input v-model="meta.categories" @change="handleChangeInput" />
            </md-field>
            <md-field>
              <label>Tags</label>
              <md-input v-model="meta.tags" @change="handleChangeInput" />
            </md-field>
          </section>
        </md-tab>

        <md-tab id="tab-editor" md-label="Editor">
          <section class="container">
            <div ref="editor" />
          </section>
        </md-tab>
      </md-tabs>
    </md-card-content>
  </md-card>
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
        }, 1000)
      }
    },

    mounted () {
      this.editor = new Editor({
        el: this.$refs.editor,
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: this.$refs.content.$el.offsetHeight - 96,
        hideModeSwitch: true,
        exts: ['scrollSync']
      })

      this.editor.on('change', this.handleChangeInput)
      window.onresize = () => {
        this.editor.height(this.$refs.content.$el.offsetHeight - 96)
      }
    },

    computed: {
      meta () {
        const { title = '', date = '', tags = '', categories = '', _content = '' } = this.value

        return {
          title,
          date: this.$date.format(date),
          tags: tags.join(', '),
          categories: categories.join(', '),
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
          tags.join(', ')
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

    ::v-deep .md-card-content {
      height: 100%;
    }
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .vs-input {
      width: 100%;
    }
  }
</style>
