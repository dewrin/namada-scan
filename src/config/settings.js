/**
 * @description 导出默认通用配置
 */
const setting = {
  // 标题
  title: 'namada',
  // 开发环境端口号
  devPort: '9021',
  // 不经过token校验的路由
  whiteList: ['/login', '/register', '/404', '/401'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // token名称
  tokenName: 'accessToken',
  tokenStoreType: 'sessionStorage', // sessionStorage localStorage
  tagsView: false,
  sidebarLogo: true,
  logo: 'https://litinfosys-api.oss-cn-beijing.aliyuncs.com/info-assets/logo.svg',
  // vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  /**
   * @type {boolean} true | false
   * @description 是否使用动态路由
   */
  dynamicRouter: false,
  // 是否开启图片压缩
  imageCompression: true,
  MDWIDTH: 1044,
  SMWIDTH: 846
}
module.exports = setting
