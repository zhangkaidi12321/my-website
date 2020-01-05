//从本地取
const getLocal = key => localStorage.getItem(key)
//删本地
const removeLocal = key => localStorage.removeItem(key)
//存本地
const saveLocal = (key, val) => localStorage.setItem(key, val)

/**
 * 生成任意位数随机数 字母+数字
 * @param {是否任意长度} flag 
 * @param {最小位数} min 
 * @param {最大位数} max 
 */
const random = (flag, min, max) => {
  let str = '',
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
      'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 随机产生
  if (flag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * 生成指定范围的随机数字
 * @param {最小数} min 
 * @param {最大数} max 
 */
const randomNumber = (min, max) => Math.round(Math.random() * (min - max) + max)

/**
 * 非空判断
 * @param {内容} str 
 */
const isNullOrEmpty = str => {
  if (str === '' || str === null || str === undefined) {
    return true
  } else {
    return false
  }
}

export default {
  getLocal, removeLocal, saveLocal, random, randomNumber, isNullOrEmpty
}