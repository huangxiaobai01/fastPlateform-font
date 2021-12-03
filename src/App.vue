<template>
  <div id="app" class="app">
    <Layout></Layout>
  </div>
</template>

<script>

import Layout from '@/views/Layout.vue'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app {
  height: 100%;
  font-size: 12px;
}
</style>
