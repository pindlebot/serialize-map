'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./'),
    fromJSON = _require.fromJSON,
    toJSON = _require.toJSON,
    merge = _require.merge,
    getIn = _require.getIn,
    setIn = _require.setIn;

var EnhancedMap = function (_Map) {
  _inherits(EnhancedMap, _Map);

  function EnhancedMap() {
    _classCallCheck(this, EnhancedMap);

    return _possibleConstructorReturn(this, (EnhancedMap.__proto__ || Object.getPrototypeOf(EnhancedMap)).apply(this, arguments));
  }

  _createClass(EnhancedMap, null, [{
    key: 'create',
    value: function create(props) {
      var self = Object.getPrototypeOf(this) === Map.prototype ? this : new Map(props);
      Object.setPrototypeOf(self, EnhancedMap.prototype);

      return self;
    }
  }, {
    key: 'mixin',
    value: function mixin(func) {
      EnhancedMap[func.name] = func;
      EnhancedMap.prototype[func.name] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = func.apply(EnhancedMap, [this].concat(args));

        return result instanceof Map ? EnhancedMap.create(result) : result;
      };
    }
  }]);

  return EnhancedMap;
}(Map);

require('util').inherits(EnhancedMap, Map);
Object.setPrototypeOf(EnhancedMap, Map);

EnhancedMap.mixin(fromJSON);
EnhancedMap.mixin(toJSON);
EnhancedMap.mixin(merge);
EnhancedMap.mixin(getIn);
EnhancedMap.mixin(setIn);

module.exports = EnhancedMap;