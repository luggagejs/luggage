"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9MdWdnYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzswQkFBdUIsY0FBYzs7OztJQUVoQixPQUFPO0FBQ2YsV0FEUSxPQUFPLENBQ2QsT0FBTyxFQUFFOzBCQURGLE9BQU87O0FBRXhCLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0dBQ3hCOztlQUhrQixPQUFPOztXQUtoQixvQkFBQyxJQUFJLEVBQUU7QUFDZixhQUFPLDRCQUFlLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0M7OztTQVBrQixPQUFPOzs7cUJBQVAsT0FBTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xsZWN0aW9uIGZyb20gXCIuL0NvbGxlY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTHVnZ2FnZSB7XG4gIGNvbnN0cnVjdG9yKGJhY2tlbmQpIHtcbiAgICB0aGlzLmJhY2tlbmQgPSBiYWNrZW5kO1xuICB9XG5cbiAgY29sbGVjdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBDb2xsZWN0aW9uKG5hbWUsIHRoaXMuYmFja2VuZCk7XG4gIH1cbn1cbiJdfQ==