<template>
  <div class="hexo-editor-tag">
    <Tag
      closable
      v-for="(tag, index) in tags"
      :key="index"
      @on-close="handleClose(tag)"
    >
      {{tag}}
    </Tag>

    <Button
      icon="ios-plus-empty"
      type="dashed"
      size="small"
      v-if="!visible"
      @click="visible = true"
    >
      添加{{type === 'tags' ? '标签' : '分类'}}
    </Button>
    <Input size="small"
      v-if="visible"
      v-model="value"
      @keyup.native.enter="handleAdd"
    />
  </div>
</template>

<script>
  export default {
    name: 'hexo-editor-tag',
    data () {
      return {
        visible: false,
        value: ''
      }
    },
    props: {
      type: String,
      tags: Array,
      content: Object
    },
    methods: {
      handleAdd () {
        const value = this.value.trim()
        const content = { ...this.content }
        if (value && !content[this.type].includes(value)) {
          content[this.type].push(value)
          this.$emit('update:content', content)
        }

        this.visible = false
        this.value = ''
      },
      handleClose (name) {
        const content = { ...this.content }
        const index = content[this.type].indexOf(name)
        content[this.type].splice(index, 1)
        this.$emit('update:content', content)
      }
    }
  }
</script>

<style>
  @component-namespace hexo-editor {
    @c tag {
      margin-bottom: 12px;
      & .ivu-input-wrapper {
        width: 78px;
      }
    }
  }
</style>
