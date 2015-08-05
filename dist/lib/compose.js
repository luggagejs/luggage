"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ComposeWithClass;

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
      for (var _iterator = _getIterator(mixins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mixin = _step.value;

        _Object$assign(subclazz.prototype, mixin);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29tcG9zZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7cUJBQXdCLGdCQUFnQjs7QUFBekIsU0FBUyxnQkFBZ0IsR0FBWTtvQ0FBUixNQUFNO0FBQU4sVUFBTTs7O0FBQ2hELFNBQU8sVUFBQyxLQUFLLEVBQUs7QUFDaEIsUUFBTSxRQUFRO2dCQUFSLFFBQVE7O2VBQVIsUUFBUTs4QkFBUixRQUFROzttQ0FBUixRQUFROzs7YUFBUixRQUFRO09BQWlCLEtBQUssQ0FBRyxDQUFDOzs7Ozs7O0FBRXhDLHdDQUFrQixNQUFNLDRHQUFFO1lBQWpCLEtBQUs7O0FBQ1osdUJBQWMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztPQUMxQzs7Ozs7Ozs7Ozs7Ozs7OztBQUVELFdBQU8sUUFBUSxDQUFDO0dBQ2pCLENBQUM7Q0FDSCIsImZpbGUiOiJjb21wb3NlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tcG9zZVdpdGhDbGFzcyguLi5taXhpbnMpIHtcbiAgcmV0dXJuIChjbGF6eikgPT4ge1xuICAgIGNvbnN0IHN1YmNsYXp6ID0gY2xhc3MgZXh0ZW5kcyBjbGF6eiB7fTtcblxuICAgIGZvciAobGV0IG1peGluIG9mIG1peGlucykge1xuICAgICAgT2JqZWN0LmFzc2lnbihzdWJjbGF6ei5wcm90b3R5cGUsIG1peGluKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ViY2xheno7XG4gIH07XG59XG4iXX0=