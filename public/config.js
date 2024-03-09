
// 根据打包环境调用不同服务环境
window.server = function (VUE_APP_ENV, serverName, isSocket) {
  switch (VUE_APP_ENV) {
    case 'dev': // 开发环境 本地开发环境
      return `${isSocket ? 'ws' : 'http'}://10.17.0.17:10000/${serverName}`
    case 'rbac': // 开发环境 本地开发环境
      return `${isSocket ? 'ws' : 'http'}://10.17.0.27:10000/${serverName}`
    case 'pvt': // 测试环境
      return `${isSocket ? 'wss' : 'https'}://pvt-rest.litsoft.com.cn/${serverName}`
    case 'uat':// 预发布环境 
      return `${isSocket ? 'wss' : 'https'}://uat-rest.litsoft.com.cn/${serverName}`
    case 'prod':// 生成环境 
      return `${isSocket ? 'ws' : 'http'}://10.255.144.70/fx-api/${serverName}`
  }
  return ''
}
