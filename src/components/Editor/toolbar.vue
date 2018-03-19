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
      <Poptip title="文章信息" placement="left" width="280">
        <Tooltip content="信息" placement="left">
          <Icon type="information-circled" />
        </Tooltip>
        <div class="hexo-editor-toolbar__meta" slot="content">
          <a target="_blank" :href="`http://localhost:4000/${meta.path}`">
            <Icon type="link" />
            文章链接
          </a>
          <p>字数：{{meta.count}}</p>
          <p>段落：{{meta.phase}}</p>
          <p>更新时间：{{$date.format(meta.updated)}}</p>
          <p>创建时间：{{$date.format(meta.date)}}</p>
        </div>
      </Poptip>
    </a>
    <a class="hexo-editor-toolbar__item" @click="$emit('open')">
      <Tooltip content="资源" placement="left">
        <Icon type="folder" />
      </Tooltip>
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
    },
    computed: {
      meta () {
        const { updated, date, content, _content, path } = this.content
        if (!path) return {}

        // 统计段落数
        const phase = content.split('<p>').length - 1
        // 统计字数
        const words = Array.from(_content.split(''), str => escape(str).length)
        const count = words.length > 0 ? words.reduce((a, b) =>b.length > 4 ? a + 2 : a + 1) : 0

        return { updated, date, phase, count, path }
      }
    }
  }
</script>

<style>
  @component-namespace hexo-editor {
    @c toolbar {
      position: fixed;
      top: 64px;
      right: 0;
      size: 50px 100%;
      font-size: 20px;

      @d item {
        height: 50px;
        color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @d meta {
        color: #495060!important;
        cursor: default;
      }
    }
  }
</style>
