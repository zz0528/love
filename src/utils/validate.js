// 手机号验证
export function validatePhone(value) {
  const phoneReg = /^1[3456789]\d{9}$/
  return phoneReg.test(value)
}
// 身份证验证
export function validateIdCard(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!reg.test(value)) {
    callback(new Error('请输入正确身份证'))
  } else {
    let num = value.toUpperCase()
    let len = ''
    let re = ''
    len = num.length
    if (len === 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      const arrSplit = num.match(re) // 检查生日日期是否正确
      const dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      let bGoodDay = ''
      bGoodDay =
        dtmBirth.getYear() === Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
        dtmBirth.getDate() === Number(arrSplit[4])
      if (!bGoodDay) {
        callback(new Error('请输入正确身份证'))
      } else {
        // 将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
        const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let nTemp = 0
        let i
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        num += arrCh[nTemp % 11]
        callback()
      }
    }
    if (len === 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      const arrSplit = num.match(re) // 检查生日日期是否正确
      const dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      let bGoodDay = ''
      bGoodDay =
        dtmBirth.getFullYear() === Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
        dtmBirth.getDate() === Number(arrSplit[4])
      if (!bGoodDay) {
        callback(new Error('请输入正确身份证'))
      } else {
        // 检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
        let valnum = ''
        const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let nTemp = 0
        for (let i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]

        if (valnum !== num.substr(17, 1)) {
          callback(new Error('请输入正确身份证'))
        } else {
          callback()
        }
      }
    }
  }
}
// 用户信息脱敏
export function desensitization(str, beginLen, endLen = -1) {
  if (str) {
    const len = str.length
    if (beginLen === 0) {
      endLen = endLen * len + 1
    }
    const firstStr = str.substr(0, beginLen)
    const lastStr = str.substr(endLen)
    const middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/gi, '*')
    return `${firstStr}${middleStr}${lastStr}`
  }
}
// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
// 判断是否为空
export function isNull(obj) {
  if (typeof obj === 'undefined') {
    return true
  }
  if (obj === undefined) {
    return true
  }
  if (obj === 'undefined') {
    return true
  }
  if (obj === '') {
    return true
  }
  if (obj === null) {
    return true
  }
  if (obj === 'null') {
    return true
  }
}
// 年月日
export function formatDate(time) {
  const date = new Date(time)
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? '0' + MM : MM
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + MM + '-' + d
}
// 完整时间
export function formatTime(time) {
  const date = new Date(time)
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? '0' + MM : MM
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
}
// 节流 (规定时间内只触发一次)
export function throttle(fn, delay) {
  let timer = null
  delay = delay || 5000
  return function (...args) {
    if (timer) {
      return
    }
    const _this = this
    timer = setTimeout(() => {
      timer = null
    }, delay)
    fn.apply(_this, args)
  }
}
// 防抖 (多次触发只执行一次)
export function debounce(fn, delay) {
  delay = delay || 5000
  let timer = null
  return function (...args) {
    const _this = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(_this, args)
    })
  }
}
