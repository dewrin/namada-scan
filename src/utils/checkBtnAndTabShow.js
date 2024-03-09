import store from '@/store'

/**
 * 比对当前页面 的按钮是否显示
 */
export const checkBtnShow = (pageCode, btnCode) => {
  const btnArr = store.getters.btnArr

  if (btnArr.findIndex(item => item.itemPcode === pageCode && item.itemCode === btnCode) !== -1) {
    return true
  } else {
    return false
  }
}
/**
 * 对比当前页面tab显示
 */
export const checkTabShow = (pageCode, tabCode) => {
  const tabArr = store.getters.tabArr
  console.log(store.getters, 123, pageCode, tabCode)
  if (tabArr.findIndex(item => item.itemPcode === pageCode && item.itemCode === tabCode) !== -1) {
    return true
  } else {
    return false
  }
}

