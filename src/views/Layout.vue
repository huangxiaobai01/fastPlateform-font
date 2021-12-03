<template>
  <div class="layout">
    <Header></Header>
    <div class="contain">
      <div v-if="$store.getters.sidemenus.length" class="menu-content">
        <vue-scroll>
          <SideMenu :menus="$store.getters.sidemenus" ></SideMenu>
        </vue-scroll>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideMenu from '@/components/SideMenu.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'Layout',
  components: {
    Header,
    SideMenu
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
  padding: 0 8rem;
}
.contain {
  height: calc(100% - 8rem);
  display: flex;
  .menu-content {
    height: 100%;
    width: 20rem;
    ::v-deep .el-menu {
      background-color: transparent;
      border-right: 0;
    }
  }
  .content {
    flex: 1
  }
}
</style>

