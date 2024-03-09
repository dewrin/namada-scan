import Vue from 'vue'
import Vuex from 'vuex'
import settings from '@libs/stores/settings'
import route from '@libs/stores/route'
import tagsView from '@libs/stores/tags-view'
import app from '@libs/stores/app'
import getters from './getters'
import user from './modules/user'
import dictionary from './modules/dictionary'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters,
  modules: {
    route,
    tagsView,
    settings,
    app,
    user,
    dictionary
  }
})
