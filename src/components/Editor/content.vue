<template>
  <section class="hexo-editor-content">
    <Input class="hexo-editor-content__text" v-model="meta.title" placeholder="标题" />
    <Input class="hexo-editor-content__date" v-model="meta.date" placeholder="日期" />

    <hexo-editor-tag
      type="tags"
      :tags="meta.tags"
      :content.sync="meta"
    />
    <hexo-editor-tag
      type="categories"
      :tags="meta.categories"
      :content.sync="meta"
    />

    <Input class="hexo-editor-content__main" type="textarea" autosize v-model="meta._content" />
  </section>
</template>

<script>
  import EditorTag from './tag'

  export default {
    name: 'hexo-editor-content',
    data () {
      return {
        meta: {}
      }
    },
    props: {
      content: Object
    },
    watch: {
      content (newVal) {
        const { title = '', date = '', tags = [], categories = [], _content = '' } = newVal

        this.meta = {
          title,
          date: this.$date.format(date),
          tags,
          categories,
          _content
        }
      },
      meta: {
        handler  (newVal) {
          const { title, date, tags, categories, _content } = newVal

          const _tags = tags.length > 1 ? tags.reduce((a, b) => {
            return `${a}, ${b}`
          }) : ''

          let _categories = categories.length > 1 ? `[${categories.reduce((a, b) => {
              return `${a}, ${b}`
            })}]` : categories === 1 ? categories[0] : ''

          const raw = `---\ntitle: ${title}\ndate: ${date}\ntags: [${_tags}]\ncategories: ${_categories}\n---\n${_content}`
          const content = Object.assign(this.content, {
            title,
            date,
            tags,
            categories,
            _content,
            raw
          })
          this.$emit('update:content', content)
        },
        deep: true
      }
    },
    components: {
      [EditorTag.name]: EditorTag
    }
  }
</script>

<style>
  @component-namespace hexo-editor {
    @c content {
      size: 100%;
      padding: 12px 74px 12px 24px;
      box-sizing: border-box;

      @d text {
        margin-bottom: 12px;
      }

      @d date {
        width: 180px;
        margin-bottom: 12px;
      }

      @d main {
        size: 100% calc(100% - 180px);

        & textarea {
          size: 100%;
          margin-bottom: 12px;
          font-size: 14px 2;
          background: inherit;
          box-sizing: border-box;
          resize: none;
          display: block;
        }
      }
    }
  }
</style>
