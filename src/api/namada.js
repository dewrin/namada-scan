// login, logout, getInfo
import request from '@/utils/request'
const rpcUrl = 'https://rpc.luminara.icu/'
const apiUrl = 'https://indexer.luminara.icu/'
export function validators(params) {
  return request({
    url: rpcUrl + 'validators',
    method: 'get',
    params
  })
}
export function last() {
  return request({
    url: apiUrl + 'block/last',
    method: 'get'
  })
}
export function uptime(validator_address) {
  return request({
    url: apiUrl + `validator/${validator_address}/uptime`,
    method: 'get'
  })
}
export function block(height) {
  return request({
    url: apiUrl + `block/height/${height}`,
    method: 'get'
  })
}
export function hash(hash) {
  return request({
    url: apiUrl + `block/hash/${hash}`,
    method: 'get'
  })
}
export function tx(tx) {
  return request({
    url: apiUrl + `tx/${tx}`,
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: rpcUrl + 'rbac/auth/login',
    method: 'post',
    data
  })
}

export function thirdLogin(data) {
  return request({
    url: rpcUrl + 'auth/withoutCode/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: rpcUrl + 'rbac/auth/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: rpcUrl + 'rbac/auth/logout',
    method: 'get'
  })
}

