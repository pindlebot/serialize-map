const { fromJSON, toJSON, merge, getIn, setIn } = require('./')

class EnhancedMap extends Map {
  static create (props) {
    const self = (Object.getPrototypeOf(this) === Map.prototype) 
      ? this 
      : new Map(props);
    Object.setPrototypeOf(self, EnhancedMap.prototype);
    
    return self;
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

require('util').inherits(EnhancedMap, Map);
Object.setPrototypeOf(EnhancedMap, Map);

EnhancedMap.mixin(fromJSON)
EnhancedMap.mixin(toJSON)
EnhancedMap.mixin(merge)
EnhancedMap.mixin(getIn)
EnhancedMap.mixin(setIn)

module.exports = EnhancedMap
 
