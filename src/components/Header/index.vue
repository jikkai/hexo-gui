<template>
  <header class="hexo-header">
    <router-link class="hexo-header__logo" to="/">
      <img src="../../assets/logo.svg" :draggable="false" />
      <h1>HEXO GUI</h1>
    </router-link>
  </header>
</template>

<script>
  export default {
    name: 'hexo-header'
  }
</script>

<style>
  @component-namespace hexo {
    @c header {
      height: 64px;
      padding: 0 12px;
      color: #fff #495060;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      @d logo {
        display: flex;
        align-items: center;
        & img {
          size: 42px;
        }
        & h1 {
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
</style>
