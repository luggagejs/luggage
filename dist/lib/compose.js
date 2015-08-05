"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports["default"] = ComposeWithClass;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function ComposeWithClass() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  return function (clazz) {
    var subclazz = (function (_clazz) {
      _inherits(subclazz, _clazz);

      function subclazz() {
        _classCallCheck(this, subclazz);

        _get(Object.getPrototypeOf(subclazz.prototype), "constructor", this).apply(this, arguments);
      }

      return subclazz;
    })(clazz);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mixin = _step.value;

        Object.assign(subclazz.prototype, mixin);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return subclazz;
  };
}

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29tcG9zZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztxQkFBd0IsZ0JBQWdCOzs7Ozs7QUFBekIsU0FBUyxnQkFBZ0IsR0FBWTtvQ0FBUixNQUFNO0FBQU4sVUFBTTs7O0FBQ2hELFNBQU8sVUFBQyxLQUFLLEVBQUs7QUFDaEIsUUFBTSxRQUFRO2dCQUFSLFFBQVE7O2VBQVIsUUFBUTs4QkFBUixRQUFROzttQ0FBUixRQUFROzs7YUFBUixRQUFRO09BQWlCLEtBQUssQ0FBRyxDQUFDOzs7Ozs7O0FBRXhDLDJCQUFrQixNQUFNLDhIQUFFO1lBQWpCLEtBQUs7O0FBQ1osY0FBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQzFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsV0FBTyxRQUFRLENBQUM7R0FDakIsQ0FBQztDQUNIIiwiZmlsZSI6ImNvbXBvc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21wb3NlV2l0aENsYXNzKC4uLm1peGlucykge1xuICByZXR1cm4gKGNsYXp6KSA9PiB7XG4gICAgY29uc3Qgc3ViY2xhenogPSBjbGFzcyBleHRlbmRzIGNsYXp6IHt9O1xuXG4gICAgZm9yIChsZXQgbWl4aW4gb2YgbWl4aW5zKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHN1YmNsYXp6LnByb3RvdHlwZSwgbWl4aW4pO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJjbGF6ejtcbiAgfTtcbn1cbiJdfQ==