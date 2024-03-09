/**
 * 简单深拷贝,适用于js对象
 * @param {*} obj
 */
export function easyClone(obj) {
  if (obj === undefined) {
    obj = null
  }
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 标准深拷贝
 * @param {*} obj
 */
export function deepClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  let result
  if (Array.isArray(obj)) {
    result = []
    obj.forEach(item => {
      result.push(deepClone(item))
    })
  } else {
    result = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = deepClone(obj[key])
      }
    }
  }
  return result
}

/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 */
export function debounce(fn, _delay) {
  const delay = _delay || 200
  let timer
  return function () {
    const th = this
    const timerThead = th.timer
    const args = arguments
    if (timerThead) {
      if (timerThead.timer) {
        clearTimeout(timerThead.timer)
      }
    } else {
      if (timer) {
        clearTimeout(timer)
      }
    }

    timer = setTimeout(function () {
      if (timerThead) {
        timerThead.timer = null
      }
      timer = null
      fn.apply(th, args)
    }, delay)
    if (timerThead) {
      timerThead.timer = timer
    }
  }
}

/**
 * 节流
 * @param {*} fn
 * @param {*} interval
 */
export function throttle(fn, _interval) {
  let last
  let timer
  const interval = _interval || 200
  return function () {
    const th = this
    const args = arguments
    const now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, interval)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}
