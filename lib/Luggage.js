"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = require("./Collection");

var _Collection2 = _interopRequireDefault(_Collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Luggage = function () {
  function Luggage(backend) {
    _classCallCheck(this, Luggage);

    this.backend = backend;
  }

  _createClass(Luggage, [{
    key: "collection",
    value: function collection(name) {
      return new _Collection2.default(name, this.backend);
    }
  }]);

  return Luggage;
}();

exports.default = Luggage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MdWdnYWdlLmpzIl0sIm5hbWVzIjpbIkx1Z2dhZ2UiLCJiYWNrZW5kIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCQSxPO0FBQ25CLG1CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFNBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNEOzs7OytCQUVVQyxJLEVBQU07QUFDZixhQUFPLHlCQUFlQSxJQUFmLEVBQXFCLEtBQUtELE9BQTFCLENBQVA7QUFDRDs7Ozs7O2tCQVBrQkQsTyIsImZpbGUiOiJMdWdnYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSBcIi4vQ29sbGVjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMdWdnYWdlIHtcbiAgY29uc3RydWN0b3IoYmFja2VuZCkge1xuICAgIHRoaXMuYmFja2VuZCA9IGJhY2tlbmQ7XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IENvbGxlY3Rpb24obmFtZSwgdGhpcy5iYWNrZW5kKTtcbiAgfVxufVxuIl19