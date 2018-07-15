/* eslint no-undefined: 0 */

export const parseQueryString = queryString => {
  const ret = Object.create(null)

  if (typeof queryString !== 'string') {
    return ret
  }

  const str = queryString.trim().replace(/^(\?|#|&)/, '')

  if (!str) {
    return ret
  }

  str.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    const key = decodeURIComponent(parts.shift())
    const val = parts.length > 0 ? parts.join('=') : undefined

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    const value = val === undefined ? null : decodeURIComponent(val)

    if (ret[key] === undefined) {
      ret[key] = value
    } else if (Array.isArray(ret[key])) {
      ret[key].push(value)
    } else {
      ret[key] = [ret[key], value]
    }
  })

  return ret
}
