import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import {menus} from '@/constants/menus.js'

Vue.use(Vuex)

const RouteView = {
  name: 'RouteView',
  render: (h) =>
    h('div', {
      'class': {
        routerViewClass: true
      }
    }, [h('router-view')])
}
function getPermissionObj(list, obj) {
  if (list.length === 0) return
  obj.children = []
  list.forEach(function (item) {
    if (item.children) {
      let itemRout = {
        path: item.routeName,
        component: RouteView,
        name: item.routeName,
        redirect: '/' + item.redirects.join('/') + '/' + item.children[0].routeName
      }
      getPermissionObj(item.children, itemRout)
      obj.children.push(itemRout)
    } else {
      let itemRout = {
        path: item.routeName,
        component: (resolve) => require(['@/' + item.packageAddress + '.vue'], resolve),
        name: item.routeName,
        meta: {
          activedCode: item.activedCode
        }
      }
      obj.children.push(itemRout)
    }
  })
}
export default new Vuex.Store({
  state: {
    permissions: [],
    permissionsObj: {},
    sidemenus: []
  },
  getters: {
    sidemenus: state => {
      return state.sidemenus
    }
  },
  mutations: {
    SET_PERMISSIONList(state, value) {
      state.permissions = value
    },
    SETPERMISSIONSOBJ(state, value) {
      state.permissionsObj = value
    },
    SETSIDEMENUS(state, value) {
      state.sidemenus = value
    },
  },
  actions: {
    getAysPermission({commit}) {
      return new Promise((resolve) => {
        commit("SET_PERMISSIONList", menus)
        let permissionobj = {
          path: '/',
          component: RouteView,
          meta: {
            title: '首页',
            icon: 'system'
          }
        };
        let obj = {}
        menus.forEach(item => {
          obj[item.id] = item.children
        })
        commit("SETPERMISSIONSOBJ", obj)
        getPermissionObj(menus, permissionobj)
        router.addRoutes([permissionobj])
        resolve()
      })
    }
  },
  modules: {
  }
})
