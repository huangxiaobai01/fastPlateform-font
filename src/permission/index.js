import router from '@/router/index.js'
import store from '../store'

router.beforeEach((to, from, next) => {
  if (!store.state.permissions.length) {
    store.dispatch('getAysPermission').then(() => {
      next(to.path)
    })
  } else {
    next()
  }
})