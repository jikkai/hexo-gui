<template>
  <section class="hexo-editor-toolbar">
    <a class="hexo-editor-toolbar__item" @click="$emit('save')">
      <Tooltip content="保存" placement="left">
        <Icon type="upload" />
      </Tooltip>
    </a>
    <a class="hexo-editor-toolbar__item" @click="$emit('add')">
      <Tooltip content="新建" placement="left">
        <Icon type="compose" />
      </Tooltip>
    </a>
    <a class="hexo-editor-toolbar__item">
      <Poptip title="文章信息" placement="left">
        <Tooltip content="信息" placement="left">
          <Icon type="information-circled" />
        </Tooltip>
        <div slot="content">
          12313123
        </div>
      </Poptip>
    </a>
    <a class="hexo-editor-toolbar__item" @click="$emit('remove')">
      <Tooltip content="删除" placement="left">
        <Icon type="trash-a" />
      </Tooltip>
    </a>
  </section>
</template>

<script>
  export default {
    name: 'hexo-editor-toolbar',
    props: {
      content: Object
    }
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
        /* line-height: 50px;
        text-align: center; */
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
