"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _events = require("events");

var _events2 = require("./constants/events");

var _events3 = _interopRequireDefault(_events2);

var _compose = require("./lib/compose");

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function wrapTransform(transform) {
  if (typeof transform === "function") {
    return transform;
  }

  return function (record) {
    return Object.assign({}, record, transform);
  };
}

var Record = (_dec = (0, _compose2.default)(_events.EventEmitter.prototype), _dec(_class = function () {
  function Record(collection) {
    _classCallCheck(this, Record);

    this.collection = collection;
    this.collection.on(_events3.default.DATA_EVENT, this.dataChanged.bind(this));
  }

  _createClass(Record, [{
    key: "read",
    value: function read() {
      return this.collection.read().then(function (data) {
        return data[0];
      });
    }
  }, {
    key: "update",
    value: function update(transform) {
      return this.collection.updateRecord(this, wrapTransform(transform));
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this.collection.deleteRecord(this);
    }
  }, {
    key: "dataChanged",
    value: function dataChanged(data) {
      this.emit(_events3.default.DATA_EVENT, data[0]);
    }
  }]);

  return Record;
}()) || _class);
exports.default = Record;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWNvcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hDLE1BQUksT0FBTyxTQUFQLEtBQXFCLFVBQXpCLEVBQXFDO0FBQ25DLFdBQU8sU0FBUDtBQUNEOztBQUVELFNBQU8sVUFBQyxNQUFELEVBQVk7QUFDakIsV0FBTyxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLE1BQWxCLEVBQTBCLFNBQTFCLENBQVA7QUFDRCxHQUZEO0FBR0Q7O0lBR0ssTSxXQURMLHVCQUFRLHFCQUFhLFNBQXJCLEM7QUFFQyxrQkFBWSxVQUFaLEVBQXdCO0FBQUE7O0FBQ3RCLFNBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLFNBQUssVUFBTCxDQUFnQixFQUFoQixDQUFtQixpQkFBTyxVQUExQixFQUFzQyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBdEM7QUFDRDs7OzsyQkFFTTtBQUNMLGFBQU8sS0FBSyxVQUFMLENBQWdCLElBQWhCLEdBQXVCLElBQXZCLENBQTRCLFVBQUMsSUFBRCxFQUFVO0FBQzNDLGVBQU8sS0FBSyxDQUFMLENBQVA7QUFDRCxPQUZNLENBQVA7QUFHRDs7OzJCQUVNLFMsRUFBVztBQUNoQixhQUFPLEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixJQUE3QixFQUFtQyxjQUFjLFNBQWQsQ0FBbkMsQ0FBUDtBQUNEOzs7OEJBRVE7QUFDUCxhQUFPLEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixJQUE3QixDQUFQO0FBQ0Q7OztnQ0FFVyxJLEVBQU07QUFDaEIsV0FBSyxJQUFMLENBQVUsaUJBQU8sVUFBakIsRUFBNkIsS0FBSyxDQUFMLENBQTdCO0FBQ0Q7Ozs7O2tCQUdZLE0iLCJmaWxlIjoiUmVjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vY29uc3RhbnRzL2V2ZW50c1wiO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSBcIi4vbGliL2NvbXBvc2VcIjtcblxuZnVuY3Rpb24gd3JhcFRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgaWYgKHR5cGVvZiB0cmFuc2Zvcm0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB0cmFuc2Zvcm07XG4gIH1cblxuICByZXR1cm4gKHJlY29yZCkgPT4ge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWNvcmQsIHRyYW5zZm9ybSk7XG4gIH07XG59XG5cbkBjb21wb3NlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpXG5jbGFzcyBSZWNvcmQge1xuICBjb25zdHJ1Y3Rvcihjb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbiAgICB0aGlzLmNvbGxlY3Rpb24ub24oZXZlbnRzLkRBVEFfRVZFTlQsIHRoaXMuZGF0YUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ucmVhZCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBkYXRhWzBdO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKHRyYW5zZm9ybSkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24udXBkYXRlUmVjb3JkKHRoaXMsIHdyYXBUcmFuc2Zvcm0odHJhbnNmb3JtKSk7XG4gIH1cblxuICBkZWxldGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5kZWxldGVSZWNvcmQodGhpcyk7XG4gIH1cblxuICBkYXRhQ2hhbmdlZChkYXRhKSB7XG4gICAgdGhpcy5lbWl0KGV2ZW50cy5EQVRBX0VWRU5ULCBkYXRhWzBdKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvcmQ7XG4iXX0=