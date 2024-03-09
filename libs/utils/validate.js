/**
 * Created by jiachenpan on 16/11/18.
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

export function isString(str) {
  return !!(typeof str === 'string' || str instanceof String);
}

export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function isIDCN(text) {
  let iSum = 0
  if (!/^\d{17}(\d|x)$/i.test(text)) return false
  text = text.replace(/x$/i, 'a')

  const sBirthday = text.substr(6, 4) + '-' + Number(text.substr(10, 2)) + '-' + Number(text.substr(12, 2))
  const dBirthday = new Date(sBirthday.replace(/-/g, '/'))
  if (sBirthday !== (dBirthday.getFullYear() + '-' + (dBirthday.getMonth() + 1) + '-' + dBirthday.getDate())) return false
  for (let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(text.charAt(17 - i), 11)
  return !(iSum % 11 !== 1);
}

export function moneyToChinese(amount) { // 形参
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 基本单位
  const cnIntRadice = ['', '拾', '佰', '仟'];
  // 对应整数部分扩展单位
  const cnIntUnits = ['', '万', '亿', '兆'];
  // 对应小数部分单位
  const cnDecUnits = ['角', '分'];
  // 整数金额时后面跟的字符
  const cnInteger = '整';
  // 整型完以后的单位
  const cnIntLast = '元';
  // 最大处理的数字
  const maxNum = 9999999999999999.99;
  // 金额整数部分
  let integerNum;
  // 金额小数部分
  let decimalNum;
  // 输出的中文金额字符串
  let chineseStr = '';
  // 分离金额后用的数组，预定义
  let parts;
  if (amount === '') {
    return '';
  }
  amount = parseFloat(amount);
  if (amount >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (amount === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  amount = amount.toString();
  if (amount.indexOf('.') === -1) {
    integerNum = amount;

    decimalNum = '';
  } else {
    parts = amount.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        // alert(cnNums[parseInt(n)])
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum === '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

export function showImagePreview(productFileUrl) {
  const image = new Image();
  image.src = productFileUrl; // 图片路径
  image.onload = () => {
    // 创建弹出层
    const previewContainer = document.createElement('div');
    previewContainer.style.position = 'fixed';
    previewContainer.style.top = '0';
    previewContainer.style.bottom = '0';
    previewContainer.style.left = '0';
    previewContainer.style.right = '0';
    previewContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
    previewContainer.style.display = 'flex';
    previewContainer.style.justifyContent = 'center';
    previewContainer.style.alignItems = 'center';
    document.body.appendChild(previewContainer);
    // 在弹出层中添加图片
    const previewImage = document.createElement('img');
    previewImage.src = productFileUrl; // 图片路径
    previewImage.style.maxWidth = '80%';
    previewImage.style.maxHeight = '80%';
    previewContainer.appendChild(previewImage);
    // 点击弹出层，关闭预览
    previewContainer.addEventListener('click', () => {
      document.body.removeChild(previewContainer);
    });
  };
}

// 是否是微信浏览器

export const isWeiXin = () => {
  const ua = navigator.userAgent
  return ua.match(/microMessenger/i) === 'micromessenger'
}

// 是否是移动端

export const isDeviceMobile = () => {
  const ua = navigator.userAgent
  return /android|webos|iphone|ipod|balckberry/i.test(ua)
}

// 是否是QQ浏览器

export const isQQBrowser = () => {
  const ua = navigator.userAgent
  return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}

// 是否是爬虫

export const isSpider = () => {
  const ua = navigator.userAgent
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
}

export const isPhone = (val) => {
  if (!val) return false
  return /^1[3-9]\d{9}$/.test(val)
}

// 是否ios

export const isIos = () => {
  const u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
    return false
  } else if (u.indexOf('iPhone') > -1) { // 苹果手机
    return true
  } else if (u.indexOf('iPad') > -1) { // iPad
    return false
  } else if (u.indexOf('Windows Phone') > -1) { // winphone手机
    return false
  } else {
    return false
  }
}

// 是否为PC端

export const isPC = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'];
  let flag = true;
  for (const element of Agents) {
    if (userAgentInfo.indexOf(element) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

// 获取url参数

export const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const search = window.location.search.split('?')[1] || '';
  const r = search.match(reg) || [];
  return r[2];
}
