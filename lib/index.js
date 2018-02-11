'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var toPath = require('lodash.topath');

function toJSON(value) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { set: false };

  return [].concat(_toConsumableArray(value.entries())).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (v instanceof Map) {
      acc[k] = toJSON(v);
    } else if (opts.set && v instanceof Set) {
      acc[k] = [].concat(_toConsumableArray(v));
    } else {
      acc[k] = v;
    }
    return acc;
  }, {});
}

function fromJSON() {
  if (!arguments.length) return;
  var value = arguments.length > 1 ? arguments.length <= 0 ? undefined : arguments[0] : undefined;
  var json = arguments.length > 1 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 0 ? undefined : arguments[0];

  var map = new Map([].concat(_toConsumableArray(Object.entries(json).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    if (v instanceof Map) {
      return [k, fromJSON(v)];
    }
    if (typeof v === 'object' && v.constructor === Object) {
      return [k, new Map(fromJSON(v))];
    }
    return [k, v];
  }))));

  return value ? merge(value, map) : map;
}

function merge(value, props) {
  var entries = void 0;
  if (typeof props === 'object' && props.constructor === Object) {
    entries = Object.entries(props);
  } else if (props instanceof Map) {
    entries = props;
  } else {
    return value;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref5 = _step.value;

      var _ref6 = _slicedToArray(_ref5, 2);

      var k = _ref6[0];
      var v = _ref6[1];

      value.set(k, v);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return value;
}

function getIn(value, path) {
  return toPath(path).reduce(function (acc, val) {
    return acc.has(val) ? acc.get(val) : acc;
  }, value);
}

function setIn(value, path, props) {
  path = toPath(path);
  var key = path.pop();
  var child = getIn(value, path);
  if (child instanceof Map) {
    child.set(key, props);
  }

  return value;
}

module.exports = { fromJSON, toJSON, merge, getIn, setIn };