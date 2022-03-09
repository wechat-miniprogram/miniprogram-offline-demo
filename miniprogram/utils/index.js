function addZero(v, size) {
  v = `${v}`;
  for (let i = 0, len = size - v.length; i < len; i++) {
    v = `0${v}`;
  }
  return v;
}

export function formatTime(date, formatStr) {
  date = typeof date !== 'object' ? new Date(date) : date;
  const arrWeek = ['日', '一', '二', '三', '四', '五', '六'];
  return formatStr
    .replace(/yyyy|YYYY/, date.getFullYear())
    .replace(/yy|YY/, addZero(date.getFullYear() % 100, 2))
    .replace(/mm|MM/, addZero(date.getMonth() + 1, 2))
    .replace(/m|M/g, date.getMonth() + 1)
    .replace(/dd|DD/, addZero(date.getDate(), 2))
    .replace(/d|D/g, date.getDate())
    .replace(/hh|HH/, addZero(date.getHours(), 2))
    .replace(/h|H/g, date.getHours())
    .replace(/ii|II/, addZero(date.getMinutes(), 2))
    .replace(/i|I/g, date.getMinutes())
    .replace(/ss|SS/, addZero(date.getSeconds(), 2))
    .replace(/s|S/g, date.getSeconds())
    .replace(/w/g, date.getDay())
    .replace(/W/g, arrWeek[date.getDay()]);
}

export function request(url, method, data) {
  return new Promise(resolve => {
    wx.request({
      url,
      method,
      data,
      success: resolve,
      fail: err => resolve(null),
    })
  })
}

export function equals(a, b) {
  const typeA = typeof a
  const typeB = typeof b
  if (typeA !== typeB) return false

  switch (typeA) {
    case 'string':
    case 'boolean':
    case 'number':
    case 'undefined': {
      return a === b
    }
    case 'function': {
      return false
    }
    case 'object': {
      const isANull = a === null
      const isBNull = b === null
      if (isANull !== isBNull) return false
      else if (isANull) return true

      const isAArr = Array.isArray(a)
      const isBArr = Array.isArray(b)
      if (isAArr !== isBArr) return false
      else if (isAArr) {
        if (a.length !== b.length) return false
        for (let i = 0, len = a.length; i < len; i++) {
          if (!equals(a[i], b[i])) return false
        }
        return true
      }

      const aKeys = Object.keys(a)
      const bKeys = Object.keys(b)
      if (aKeys.length !== bKeys.length) return false
      for (let i = 0, len = aKeys.length; i < len; i++) {
        const key = aKeys[i]
        if (!equals(a[key], b[key])) return false
      }
      return true
    }
  }

  return false
}
