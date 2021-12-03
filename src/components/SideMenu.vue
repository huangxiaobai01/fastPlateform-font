<template>
  <el-menu
    default-active="1-1"
    :collapse="isCollapse">
    <MenuItem v-for="item in menus" :key="item.id" :item="item"></MenuItem>
  </el-menu>
</template>

<script>
// @ is an alias to /src
import MenuItem from '@/components/SideMenuItem.vue'
export default {
  name: 'SideMenu',
  components: {
    MenuItem
  },
  props: {
    menus: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>