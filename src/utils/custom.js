/**
 * Created by jiachenpan on 16/11/18.
 */
export function toFixed(num, len = 2) {
  if (!num) {
    return null
  } else {
    return num.toFixed(len)
  }
}

export function getobject(obj, a, b, c) {
  for (const key in obj) {
    if (obj[key][a] === b) {
      return obj[key][c]
    }
  }
  return null
}
