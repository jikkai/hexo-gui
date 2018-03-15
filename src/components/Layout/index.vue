<template>
  <section class="hexo-container">
    <hexo-header />
    <section class="hexo-content">
      <hexo-list :posts="posts" />
      <router-view :posts="posts" />
    </section>
  </section>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Header from '~components/Header'
  import List from '~components/List'

  @Component({
    components: {
      [Header.name]: Header,
      [List.name]: List
    },
    props: {
      posts: Array
    }
  })
  export default class HexoLayout extends Vue {}
</script>

<style>
  @component-namespace hexo {
    @c container {
      height: 100%;
    }

    @c content {
      height: calc(100% - 64px);
      display: flex;

      & main {
        width: calc(100% - 240px);
      }
    }
  }
</style>
