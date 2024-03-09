// login, logout, getInfo
import request from '@/utils/request'
import serviceSuffix, { getProxyUrl } from './service-suffix.js'
const baseURL = getProxyUrl(serviceSuffix.base_service)

export function getPowerList() {
  return request({
    url: baseURL + 'rbac/user/resource/item',
    method: 'get'
  })
}
export function getCodeImg() {
  return request({
    url: baseURL + 'rbac/auth/vCode',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: baseURL + 'rbac/auth/login',
    method: 'post',
    data
  })
}

export function thirdLogin(data) {
  return request({
    url: baseURL + 'auth/withoutCode/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: baseURL + 'rbac/auth/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: baseURL + 'rbac/auth/logout',
    method: 'get'
  })
}

