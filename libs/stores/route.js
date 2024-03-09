// import { constantRoutes } from '@/router'

const state = {
  routes: [],
  routesLoaded: false
}
const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = state.routes.concat(routes)
  },
  SET_ROUTESLOADED(state, status) {
    state.routesLoaded = status
  },
  RESET_ROUTES(state, routes) {
    state.routes = routes
    state.routesLoaded = false
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
