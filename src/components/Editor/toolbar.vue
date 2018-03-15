<template>
  <section class="hexo-editor-toolbar">
    <a @click="$emit('save')">
      <Tooltip class="hexo-editor-toolbar__item" content="保存" placement="left">
        <Icon type="upload" />
      </Tooltip>
    </a>
    <a @click="$emit('add')">
      <Tooltip class="hexo-editor-toolbar__item" content="新建" placement="left">
        <Icon type="compose" />
      </Tooltip>
    </a>
    <a @click="$Message.info('文章信息')">
      <Tooltip class="hexo-editor-toolbar__item" content="信息" placement="left">
        <Icon type="information-circled" />
      </Tooltip>
    </a>
    <a @click="$emit('remove')">
      <Tooltip class="hexo-editor-toolbar__item" content="删除" placement="left">
        <Icon type="trash-a" />
      </Tooltip>
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
