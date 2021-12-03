<template>
  <ul class="menu">
    <li v-for="item in menus" :key="item.id" class="li" :class="{ active: isActive === item.activedCode }">
      <el-select v-if="item.type === 'select'" v-model="activeProject" :placeholder="item.label">
        <el-option
          v-for="projectItem in item.children"
          :key="projectItem.id"
          :label="projectItem.label"
          :value="projectItem.id">
        </el-option>
      </el-select>
      <span v-else @click="toPath(item)">
        {{ item.label }}
      </span>
    </li>
  </ul>
</template>

<script>
import {menus} from '@/constants/menus.js'
export default {
  name: 'Header',
  props: {
    msg: String
  },
  data() {
    this.menus = menus
    return {
      activeProject: '',
      isActive: ''
    }
  },
  watch: {
    '$route'(val) {
      this.isActive = val.meta.activedCode
    },
    isActive(val) {
      let list = this.$store.state.permissionsObj[val] || []
      this.$store.commit("SETSIDEMENUS", list)
    }
  },
  methods: {
    toPath(router) {
      debugger
      this.$router.push(router.routeName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.menu {
  height: 8rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  margin: 0;
  .li {
    margin: 0 1rem;
    font-size: 1.6rem;
    cursor: pointer;
    color: #1989fa;
    opacity: 0.6;
    cursor: pointer;
    &.active {
      opacity: 1;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
