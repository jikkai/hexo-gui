<template>
  <section class="hexo-editor-content">
    <Input class="hexo-editor-content__text" v-model="meta.title" placeholder="标题" />
    <Input class="hexo-editor-content__date" v-model="meta.date" placeholder="日期" />

    <div class="hexo-editor-content__tags">
      <Tag
        closable
        v-for="(tag, index) in meta.tags"
        :key="index"
        @on-close="handleClose('tags', tag)"
      >
        {{tag}}
      </Tag>
      <Button
        icon="ios-plus-empty"
        type="dashed"
        size="small"
        v-if="!tags.visible"
        @click="tags.visible = true"
      >
        添加标签
      </Button>
      <Input size="small"
        v-if="tags.visible"
        v-model="tags.value"
        @keyup.native.enter="handleAdd('tags')"
      />
    </div>

    <div class="hexo-editor-content__tags">
      <Tag
        closable
        v-for="(category, index) in meta.categories"
        :key="index"
        @on-close="handleClose('categories', category)"
      >
        {{category}}
      </Tag>
      <Button
        icon="ios-plus-empty"
        type="dashed"
        size="small"
        v-if="!categories.visible"
        @click="categories.visible = true"
      >
        添加分类
      </Button>
      <Input size="small"
        v-if="categories.visible"
        v-model="categories.value"
        @keyup.native.enter="handleAdd('categories')"
      />
    </div>

    <Input class="hexo-editor-content__main" type="textarea" autosize v-model="meta._content" />
  </section>
</template>

<script>
  export default {
    name: 'hexo-editor-content',
    data () {
      return {
        tags: {
          value: '',
          visible: false
        },
        categories: {
          value: '',
          visible: false
        },
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
          const _tags = tags.reduce((a, b) => {
            return `${a}, ${b}`
          })
          let _categories
          if (categories.length === 1) {
            _categories = categories[0]
          } else {
            _categories = `[${categories.reduce((a, b) => {
              return `${a}, ${b}`
            })}]`
          }
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
    methods: {
      handleAdd (type) {
        const value = this[type].value.trim()
        if (value && !this.meta[type].includes(value)) {
          this.meta[type].push(value)
        }
        this[type].visible = false
        this[type].value = ''
      },
      handleClose (type, name) {
        const index = this.meta[type].indexOf(name)
        this.meta[type].splice(index, 1)
      }
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

      @d tags {
        margin-bottom: 12px;
        & .ivu-input-wrapper {
          width: 78px
        }
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
