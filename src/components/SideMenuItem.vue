<template>
  <el-submenu :index="item.id" v-if="item.children && item.children.length">
    <template slot="title">
      <span>{{item.label}}</span>
    </template>
    <SideMenuItem
      v-for="jitem in item.children"
      :index="jitem.id"
      :key="jitem.id"
      :item="jitem"></SideMenuItem>
  </el-submenu>
  <el-menu-item v-else :index="item.id" @click="toPath(item)">
    {{ item.label }}
  </el-menu-item>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SideMenuItem',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toPath(){}
  }
}
</script>