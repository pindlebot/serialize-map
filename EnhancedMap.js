const { fromJSON, toJSON, merge, getIn, setIn } = require('./')

class EnhancedMap extends Map {
  constructor (props) {
    return EnhancedMap.create(props)
  }

  static create (props) {
  	const map = props instanceof Map ? props : new Map(props)
    map['__proto__'] = EnhancedMap.prototype
    return map
  }

  static mixin (func) {
    EnhancedMap[func.name] = func
    EnhancedMap.prototype[func.name] = function (...args) {     
      const result = func.apply(EnhancedMap, [this, ...args])

      return result instanceof Map 
        ? EnhancedMap.create(result) 
        : result
    }
  }
}

EnhancedMap.mixin(fromJSON)
EnhancedMap.mixin(toJSON)
EnhancedMap.mixin(merge)
EnhancedMap.mixin(getIn)
EnhancedMap.mixin(setIn)

module.exports = EnhancedMap
 
