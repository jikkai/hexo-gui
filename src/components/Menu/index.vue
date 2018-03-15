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
  export default {
    name: 'hexo-menu',
    props: {
      activedId: String,
      menus: Array
    },
    methods: {
      change (id) {
        this.$emit('change', id)
      }
    }
  }
</script>

<style>
  @component-namespace hexo {
    @c menu {
      width: 280px;
      color: #ffffffb3 #495060;
      overflow: auto;

      @d item {
        padding: 10px 12px;
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
          margin-bottom: 8px;
          font-size: 14px;
        }

        & time {
          text-align: right;
          color: #ffffff88;
          display: block;
        }
      }
    }
  }
</style>
