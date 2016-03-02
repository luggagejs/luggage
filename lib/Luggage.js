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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MdWdnYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCO0FBQ25CLFdBRG1CLE9BQ25CLENBQVksT0FBWixFQUFxQjswQkFERixTQUNFOztBQUNuQixTQUFLLE9BQUwsR0FBZSxPQUFmLENBRG1CO0dBQXJCOztlQURtQjs7K0JBS1IsTUFBTTtBQUNmLGFBQU8seUJBQWUsSUFBZixFQUFxQixLQUFLLE9BQUwsQ0FBNUIsQ0FEZTs7OztTQUxFIiwiZmlsZSI6Ikx1Z2dhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29sbGVjdGlvbiBmcm9tIFwiLi9Db2xsZWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEx1Z2dhZ2Uge1xuICBjb25zdHJ1Y3RvcihiYWNrZW5kKSB7XG4gICAgdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgfVxuXG4gIGNvbGxlY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgQ29sbGVjdGlvbihuYW1lLCB0aGlzLmJhY2tlbmQpO1xuICB9XG59XG4iXX0=