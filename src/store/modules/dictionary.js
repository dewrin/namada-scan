const state = {
  companyArr: [], // 公司列表
  dictMap: [], // 字典值
  postArr: []// 岗位列表
}

const mutations = {
  SET_COMPANY: (state, companyArr) => {
    state.companyArr = companyArr
  },

  SET_DICT_MAP: (state, dictMap) => {
    state.dictMap = dictMap
  },
  SET_POST: (state, postArr) => {
    state.postArr = postArr
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
