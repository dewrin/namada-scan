import { redirectTo404Route, homeRoute } from './index'
// import { redirectTo404Route } from './index'
import Layout from '@libs/layouts/layout-base'
import { getRouteList } from '@/router/system'
import { getDefaultOpenRoutePath } from '@/utils/getDefaultOpenRoutePath'

/**
 * 解析权限列表为动态路由
 * @param {Array} powerList
 * @returns 动态生成的路由表
 */

export default (remotePowerList) => {
  const sysRouters = getRouteList()
  let routes = []
  // 对比配置的动态路由表，对预制的系统路由表进行删减，配置覆盖
  routes = makeSysRoutes(sysRouters, remotePowerList)
  homeRoute.redirect = getDefaultOpenRoutePath('', routes.filter(d => !d.hidden)[0])
  routes.push(homeRoute)
  routes.push(redirectTo404Route)
  return routes
}

// 拼接不在菜单里面的子路由
/**
 *
 * @param {*} sysRouters 系统预置的路由
 * @param {*} remotePowerList 动态获取的路由
 * @returns
 */
function makeSysRoutes(sysRouters, remotePowerList) {
  const _arr = [] // 合并后的路由表
  if (!Array.isArray(remotePowerList)) {
    return _arr
  }
  // 根据path查找预置的子路由
  remotePowerList.map(item => {
    item.component = item.component && item.component !== 'Layout' ? loadView(item.component) : Layout
    const sysRouter = sysRouters.find(d => d.path === item.path) || {}

    if (item.meta) {
      item.meta.title = item.itemName || item.meta && item.meta.title || ''
      item.meta.icon = item.itemIcon || item.meta && item.meta.icon || ''
      item.meta.itemCode = item.itemCode
    } else {
      item.meta = {
        title: item.itemName || item.meta && item.meta.title || '',
        icon: item.itemIcon || item.meta && item.meta.icon || '',
        itemCode: item.itemCode
      }
    }

    if (Array.isArray(item.children) && item.children.length) {
      if (item.children[0] && item.redirect && item.redirect !== 'noredirect') {
        item.redirect = item.children[0].path.startsWith('/') ? item.children[0].path : `${item.path}/${item.children[0].path}`
      }
      item.children = makeSysRoutes(sysRouter.children || [], item.children)
    } else {
      item.children = sysRouter.children || undefined
    }
    _arr.push(item)
  })
  return _arr
}

export const loadView = (view) => { // 路由懒加载
  return r => require.ensure([], () => r(require(`@/views/${view}`), 'views'))
  // return () => import(`@/views/${view}`)
}
