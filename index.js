function toJSON(value, opts = { set: false }) {
  return [...value.entries()]
    .reduce((acc, [k, v]) => {
      if (v instanceof Map) {
        acc[k] = toJSON(v)
      } else if (opts.set && v instanceof Set) {
        acc[k] = [...v]
      } else {
        acc[k] = v
      }
      return acc
    }, {})
}

function fromJSON(value) {
  return new Map([
    ...Object.entries(value).map(([k, v]) => {
      if (v instanceof Map) {
        return [k, fromJSON(v)]
      }
      if (typeof v === 'object' && v.constructor === Object) {
        return [k, new Map(fromJSON(v))]
      }
      return [k, v]
    })
  ])
}

module.exports = { fromJSON, toJSON }