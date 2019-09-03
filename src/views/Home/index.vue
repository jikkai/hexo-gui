<template>
  <div class="home">
    home
  </div>
</template>

<script>
export default {
  data () {
    return {
      configs: {}
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      this.configs = await this.$api.getConfigs()
    }
  }
}
</script>
