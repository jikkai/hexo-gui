<template>
  <section class="hexo-editor-toolbar">
    <a class="hexo-editor-toolbar__item" @click="$Message.info('新增文章')">
      <Icon type="plus-circled" />
    </a>
    <a class="hexo-editor-toolbar__item" @click="$Message.info('文章信息')">
      <Icon type="information-circled" />
    </a>
    <a class="hexo-editor-toolbar__item" @click="$Message.info('删除文章')">
      <Icon type="trash-a" />
    </a>
  </section>
</template>

<script>
  export default {
    name: 'hexo-editor-toolbar'
  }
</script>

<style>
  @component-namespace hexo-editor {
    @c toolbar {
      position: absolute;
      top: 0;
      right: 0;
      size: 50px 100%;
      font-size: 20px;

      @d item {
        height: 50px;
        color: inherit;
        line-height: 50px;
        text-align: center;
        display: block;
      }
    }
  }
</style>
