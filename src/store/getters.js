import LibsGetters from '@libs/stores/getters'
const getters = {
  ...LibsGetters,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  userId: state => state.user.userId,
  btnArr: state => state.user.btnArr,
  companyArr: state => state.dictionary.companyArr,
  dictMap: state => state.dictionary.dictMap,
  postArr: state => state.dictionary.postArr

}
export default getters
