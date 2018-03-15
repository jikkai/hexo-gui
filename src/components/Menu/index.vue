<template>
  <ul class="hexo-menu">
    <li
      class="hexo-menu__item"
      v-for="menu in menus"
      :key="menu._id"
      :class="{'is-actived': menu._id === activedId}"
      @click="change(menu._id)"
    >
      <h5>{{menu.title}}</h5>
      <time :datetime="menu.date">{{$date.format(menu.date)}}</time>
    </li>
  </ul>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
      activedId: String,
      menus: Array
    }
  })
  export default class HexoMenu extends Vue {
    // ===================================
    // Methods
    // ===================================
    change (id) {
      this.$emit('change', id)
    }
  }
</script>

<style>
  @component-namespace hexo {
    @c menu {
      width: 240px;
      color: #ffffffb3 #495060;
      overflow: auto;

      @d item {
        height: 72px;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        transition: all .2s;
        &:not(:last-child) {
          border-bottom: 1px solid #ffffff33;
        }
        &:hover {
          background-color: #363e4f;
        }
        @when actived {
          background-color: #363e4f;
          box-shadow: inset 4px 0 0 0 #2d8cf0;
        }

        & h5 {
          margin-bottom: 4px;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        & time {
          text-align: right;
          color: #ffffffcc;
          display: block;
        }
      }
    }
  }
</style>
