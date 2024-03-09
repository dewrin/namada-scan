
import router from '@/router'

// import { getDefaultOpenRoutePath } from '@/utils/getDefaultOpenRoutePath'
// import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { setToken, getToken } from '@libs/utils/auth'
// import getPageTitle from '@libs/utils/get-page-title'
// import { whiteList, dynamicRouter } from '@/config'

// import analysisPowerToRoutes from './router/analysis-power'

NProgress.configure({ showSpinner: false })

// router.beforeEach(async (to, from, next) => {
//   // console.log(to.path, to, 'topath')
//   NProgress.start()
//   document.title = getPageTitle(to.meta.title)
//   // if (to.query.token) {
//   //   setToken(to.query.token)
//   // }
//   // const hasToken = getToken()
//   // console.log(hasToken, 'hasToken')
//   // if (hasToken) {
//   //   // eslint-disable-next-line no-debugger
//   //   // debugger
//   //   // 如果用户信息不存在，需要获取用户信息
//   //   // console.log(store.getters.userId, 'store.getters.userId')
//   //   if (!store.getters.userId) {
//   //     try {
//   //       await store.dispatch('user/getUserInfo')
//   //     } catch (e) {
//   //       // console.log(e, '---用户信息出错')
//   //       store.dispatch('user/resetToken', to.path)
//   //       NProgress.done()
//   //       return
//   //     }
//   //   }
//   //   if (to.path === '/login') {
//   //     next({ path: '/' })
//   //   } else {
//   //     // 首次进入 刷新页面
//   //     if (!store.getters.routesLoaded) {
//   //       try {
//   //         store.commit('route/SET_ROUTESLOADED', true)
//   //         if (dynamicRouter) {
//   //           let powerList = (await store.dispatch('user/getPowerList')).result
//   //           // powerList = powerList.filter(item => item.sysCode === 'PAYEE_SYSTEM') || []
//   //           powerList = []
//   //           powerList = powerList[0]?.resourceItems || []
//   //           powerList = routerDataFormat(powerList)
//   //           // eslint-disable-next-line no-debugger
//   //           // debugger

//   //           const analysisRoutes = analysisPowerToRoutes(powerList)
//   //           store.commit('route/SET_ROUTES', analysisRoutes)
//   //           // eslint-disable-next-line no-debugger
//   //           router.addRoutes(analysisRoutes)

//   //           // console.log(defaultRoute, 'defaultRoute')
//   //         } else {
//   //           // console.log(router.options, 'router')
//   //           homeRoute.redirect = getDefaultOpenRoutePath('', router.options.routes.filter(d => !d.hidden)[0])
//   //           router.addRoutes([homeRoute, redirectTo404Route])
//   //         }

//   //         next({
//   //           ...to,

//   //           replace: true
//   //         })
//   //       } catch (e) {
//   //         console.log(e, '---动态路由出错')
//   //         store.dispatch('user/resetToken', to.path)
//   //         NProgress.done()
//   //         return
//   //       }
//   //     }
//   //     // 如果是/，则跳转到第一个导航的路由defaultOpen
//   //     if (to.path === '/') {
//   //       const defaultRoute = store.getters.routes.filter(d => !d.hidden)[0]
//   //       if (defaultRoute) {
//   //         const defaultOpenRoutePath = getDefaultOpenRoutePath('', defaultRoute)
//   //         next(defaultOpenRoutePath)
//   //         NProgress.done()
//   //         return
//   //       }
//   //     }
//   //     next()
//   //   }
//   // } else {
//   //   if (whiteList.indexOf(to.path) !== -1) {
//   next()
//   //   } else {
//   //     window.embed && window.parent.postMessage({ method: 'logout' }, '*')
//   //     if (process.env.VUE_APP_ENV === 'dev') {
//   //       next(`/login?redirect=${to.fullPath}`)
//   //     } else {
//   //       window.location.href = '/login'
//   //     }
//   //   }
//   // }
//   NProgress.done()
// })

router.afterEach(() => {
  NProgress.done()
})

// 处理 build 接口返回的权限数据 菜单 tab 按钮
// function routerDataFormat(powerList) {
//   let routerRes = []
//   const btnArr = []
//   const tabArr = []
//   function format(arr, res) {
//     if (!Array.isArray(arr)) return
//     arr.forEach(item => {
//       item.component = item.itemPath
//       item.path = item.itemUrl
//       const resItem = { ...item, children: [] }
//       if (item.itemType === 1) { // 菜单 入菜单树
//         res.push(resItem)
//       }
//       if (item.itemType === 3) { // 按钮，直接入按钮列表
//         btnArr.push({ ...resItem })
//       }
//       if (item.itemType === 2) { // tab 入tab列表
//         tabArr.push({ ...resItem })
//         console.log(tabArr, 'tabArr')
//       }

//       if (item.children && item.children.length) {
//         format(item.children, resItem.children)
//       }
//     })
//   }
//   format(powerList, routerRes)
//   routerRes = routerRes.map(item => {
//     if (!(item.children && item.children.length)) {
//       item.children = [{
//         ...item,
//         children: null,
//         path: 'index'
//       }]
//       item.component = 'Layout'
//     }
//     item.path = item.path.indexOf('/') === -1 ? '/' + item.path : item.path
//     return item
//   })
//   console.log(btnArr, 999, tabArr)
//   store.commit('user/SET_BTNARR', btnArr)
//   store.commit('user/SET_TABARR', tabArr)
//   return routerRes
// }
