const TokenName = require('@/config').tokenName || '--token--'
const tokenStoreType = require('@/config').tokenStoreType === 'sessionStorage' ? sessionStorage : localStorage

export function getToken() {
  return tokenStoreType.getItem(TokenName)
}

export function setToken(token) {
  tokenStoreType.setItem(TokenName, token)
}

export function removeToken() {
  tokenStoreType.removeItem(TokenName)
}

export const tokenName = TokenName
