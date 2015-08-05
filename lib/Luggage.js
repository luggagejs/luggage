"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Collection = require("./Collection");

var _Collection2 = _interopRequireDefault(_Collection);

var Luggage = (function () {
  function Luggage(backend) {
    _classCallCheck(this, Luggage);

    this.backend = backend;
  }

  _createClass(Luggage, [{
    key: "collection",
    value: function collection(name) {
      return new _Collection2["default"](name, this.backend);
    }
  }]);

  return Luggage;
})();

exports["default"] = Luggage;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MdWdnYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzswQkFBdUIsY0FBYzs7OztJQUVoQixPQUFPO0FBQ2YsV0FEUSxPQUFPLENBQ2QsT0FBTyxFQUFFOzBCQURGLE9BQU87O0FBRXhCLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0dBQ3hCOztlQUhrQixPQUFPOztXQUtoQixvQkFBQyxJQUFJLEVBQUU7QUFDZixhQUFPLDRCQUFlLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0M7OztTQVBrQixPQUFPOzs7cUJBQVAsT0FBTyIsImZpbGUiOiJMdWdnYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSBcIi4vQ29sbGVjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMdWdnYWdlIHtcbiAgY29uc3RydWN0b3IoYmFja2VuZCkge1xuICAgIHRoaXMuYmFja2VuZCA9IGJhY2tlbmQ7XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IENvbGxlY3Rpb24obmFtZSwgdGhpcy5iYWNrZW5kKTtcbiAgfVxufVxuIl19