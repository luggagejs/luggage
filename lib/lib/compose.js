"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ComposeWithClass;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ComposeWithClass() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  return function (clazz) {
    var subclazz = function (_clazz) {
      _inherits(subclazz, _clazz);

      function subclazz() {
        _classCallCheck(this, subclazz);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(subclazz).apply(this, arguments));
      }

      return subclazz;
    }(clazz);

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
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29tcG9zZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFBd0I7Ozs7Ozs7O0FBQVQsU0FBUyxnQkFBVCxHQUFxQztvQ0FBUjs7R0FBUTs7QUFDbEQsU0FBTyxVQUFDLEtBQUQsRUFBVztBQUNoQixRQUFNOzs7Ozs7Ozs7O01BQXlCLE1BQXpCLENBRFU7Ozs7Ozs7QUFHaEIsMkJBQWtCLGdDQUFsQixvR0FBMEI7WUFBakIsb0JBQWlCOztBQUN4QixlQUFPLE1BQVAsQ0FBYyxTQUFTLFNBQVQsRUFBb0IsS0FBbEMsRUFEd0I7T0FBMUI7Ozs7Ozs7Ozs7Ozs7O0tBSGdCOztBQU9oQixXQUFPLFFBQVAsQ0FQZ0I7R0FBWCxDQUQyQztDQUFyQyIsImZpbGUiOiJjb21wb3NlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tcG9zZVdpdGhDbGFzcyguLi5taXhpbnMpIHtcbiAgcmV0dXJuIChjbGF6eikgPT4ge1xuICAgIGNvbnN0IHN1YmNsYXp6ID0gY2xhc3MgZXh0ZW5kcyBjbGF6eiB7fTtcblxuICAgIGZvciAobGV0IG1peGluIG9mIG1peGlucykge1xuICAgICAgT2JqZWN0LmFzc2lnbihzdWJjbGF6ei5wcm90b3R5cGUsIG1peGluKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ViY2xheno7XG4gIH07XG59XG4iXX0=