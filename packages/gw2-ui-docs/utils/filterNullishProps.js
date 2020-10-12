export default (props = {}) =>
  Object.entries(props).reduce((result, [key, value]) => {
    if (
      value != null &&
      (value.constructor !== Object || Object.keys(value).length > 0) &&
      (typeof value !== 'string' || !Array.isArray(value) || value.length > 0)
    ) {
      // eslint-disable-next-line no-param-reassign
      result[key] = value
    }
    return result
  }, {})
