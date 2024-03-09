import { login, logout, getInfo, getPowerList } from '@/api/user'
import { setToken, removeToken } from '@libs/utils/auth'
import { resetRouter } from '@/router'

const state = {
  name: '',
  avatar: '',
  userId: '',
  user: {},
  btnArr: [],
  tabArr: []

}

const mutations = {
  SET_TOKEN: (state, token) => {
    console.log('dddd', token)
    setToken(token)
  },

  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERId: (state, id) => {
    state.userId = id
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_BTNARR: (state, btnArr) => {
    state.btnArr = btnArr
  },
  SET_TABARR: (state, tabArr) => {
    state.tabArr = tabArr
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { token } = response
        console.log(token, 'response')
        commit('SET_TOKEN', token)
        console.log('ddddd,dddddd')
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { realName, avatar, id } = data

        commit('SET_NAME', realName)
        commit('SET_AVATAR', avatar)
        commit('SET_USERId', id)
        commit('SET_USER', data)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getPowerList({ commit }) {
    return new Promise((resolve, reject) => {
      getPowerList().then(res => {
        resolve(res)
      }).catch(reject)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
        commit('SET_USERId', '') // 退出后清空userid
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
