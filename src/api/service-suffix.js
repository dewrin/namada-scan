/**
 * @Description:服务后缀名称
 * @Author: shijianzhong
 * @Date: 2020-11-09
 */

const serviceSuffix = {

}
/**
 *  基础服务
 */
serviceSuffix.base_service = 'manager/1.0/ice/rbacauth/'
/**
 *  消息服务
 */
serviceSuffix.msg_service = 'msg-service'
/**
 * 文件服务
 */
serviceSuffix.fdfs_service = 'fdfs_service'

export default serviceSuffix

export function getProxyUrl(key, isSocket = false) {
  return window.server(process.env.VUE_APP_ENV, key, isSocket)
}
