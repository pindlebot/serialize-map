const toPath = require('lodash.topath')

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

function fromJSON(...args) {
  if (!args.length) return
  let value = args.length > 1 ? args[0] : undefined
  let json = args.length > 1 ? args[1] : args[0]

  const map = new Map([
    ...Object.entries(json).map(([k, v]) => {
      if (v instanceof Map) {
        return [k, fromJSON(v)]
      }
      if (typeof v === 'object' && v.constructor === Object) {
        return [k, new Map(fromJSON(v))]
      }
      return [k, v]
    })
  ])

  return value ? merge(value, map) : map
}

function merge (value, props) {
  let entries
  if (
    typeof props === 'object' &&
    props.constructor === Object
  ) {
    entries = Object.entries(props)
  } else if (props instanceof Map) {
    entries = props
  } else {
    return value
  }

  for (let [k, v] of entries) {
    value.set(k, v)
  }
  return value
}

function getIn (value, path) {
  return toPath(path).reduce((acc, val) =>
    acc.has(val) ? acc.get(val) : acc,
  value)
}

function setIn (value, path, props) {
  path = toPath(path)
  const key = path.pop()
  const child = getIn(value, path)
  if (child instanceof Map) {
    child.set(key, props)
  }

  return value
}

module.exports = { fromJSON, toJSON, merge, getIn, setIn }