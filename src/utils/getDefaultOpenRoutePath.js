import path from 'path'

export const getDefaultOpenRoutePath = function getDefaultOpenRoutePath(routePath, route) {
  // eslint-disable-next-line no-debugger
  // debugger
  if (!route) return '/401'

  if (route.redirect && route.redirect !== 'noredirect') return route.redirect
  routePath = path.resolve(routePath, route.path)
  const children = route.children && route.children.filter(item => !item.hidden) || []
  if (children.length >= 1) {
    routePath = getDefaultOpenRoutePath(routePath, children[0])
  }
  return routePath
}
