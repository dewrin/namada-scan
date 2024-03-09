import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Layout from '@libs/layouts/layout-base'

Vue.use(VueRouter)
export const redirectTo404Route = {
  path: '*',
  redirect: '/404',
  hidden: true
}

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    meta: { title: 'home', icon: 'base' },
    children: [{
      path: '',
      meta: { title: 'home', icon: 'layout' },
      component: () => import('@/views/home/index')
    }]
  },

  {
    path: '/validators',
    component: Layout,
    meta: { title: 'validators', icon: 'base' },
    children: [{
      path: '',
      meta: { title: 'validators', icon: 'layout' },
      component: () => import('@/views/list-views/scroll-view')
    }]
  },
  {
    path: '/transactions',
    component: Layout,
    meta: { title: 'transactions', icon: 'base' },
    children: [{
      path: '',
      meta: { title: 'transactions', icon: 'layout' },
      component: () => import('@/views/home/index')
    }]
  },
  {
    path: '/blocks',
    component: Layout,
    meta: { title: 'blocks', icon: 'base' },
    children: [{
      path: '',
      meta: { title: 'blocks', icon: 'layout' },
      component: () => import('@/views/home/index')
    }]
  },
  {
    path: '/governance',
    component: Layout,
    meta: { title: 'governance', icon: 'base' },
    children: [{
      path: '',
      meta: { title: 'governance', icon: 'layout' },
      component: () => import('@/views/home/index')
    }]
  }

]
store.commit('route/SET_ROUTES', constantRoutes)

const createRouter = () => new VueRouter({
  mode: 'history', // history require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  store.commit('route/RESET_ROUTES', constantRoutes)

  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
