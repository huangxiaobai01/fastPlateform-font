<template>
  <div class="home">
    <button @click="toPath">to</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    toPath() {
      this.$router.push({
        name: 'FastPlateform'
      })
    }
  }
}
</script>
