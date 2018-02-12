const toPath = require('lodash.topath')
const entries = require('object.entries')

function toJSON(value, opts = { set: false }) {
  const iterable = value instanceof Map 
    ? [...value.entries()] 
    : entries(value)

  return iterable
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
  const json = args[args.length - 1]
  const iterable = json instanceof Map ? [...json.entries()] : entries(json)
  return new Map(
    iterable.map(([k, v]) => {
      if (v instanceof Map) {
        return [k, fromJSON(v)]
      }
      if (typeof v === 'object' && v.constructor === Object) {
        return [k, new Map(fromJSON(v))]
      }
      return [k, v]
    })
  )
}

function merge (value, props) {
  if (
    typeof props === 'object' &&
    props.constructor === Object
  ) {
    props = entries(props)
  } else if (props instanceof Map) {
    
  } else {
    return value
  }

  for (let [k, v] of props) {
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