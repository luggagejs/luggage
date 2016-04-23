"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("events");

var _events2 = require("../constants/events");

var _events3 = _interopRequireDefault(_events2);

var _delegate = require("../lib/delegate");

var _delegate2 = _interopRequireDefault(_delegate);

var _compose = require("../lib/compose");

var _compose2 = _interopRequireDefault(_compose);

var _Record = require("../Record");

var _Record2 = _interopRequireDefault(_Record);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function wrapFilter(filter) {
  if (typeof filter === "function") {
    return filter;
  }

  return function (item) {
    return Object.keys(filter).every(function (k) {
      return filter[k] === item[k];
    });
  };
}

var Filterable = function () {
  function Filterable() {
    _classCallCheck(this, Filterable);
  }

  _createClass(Filterable, [{
    key: "where",
    value: function where(filter) {
      return new FilteredCollection(this, wrapFilter(filter));
    }
  }, {
    key: "and",
    value: function and(filter) {
      return this.where(filter);
    }
  }, {
    key: "find",
    value: function find(filter) {
      return new _Record2.default(this.where(filter));
    }
  }]);

  return Filterable;
}();

var FilteredCollection = (_dec = (0, _compose2.default)(_events.EventEmitter.prototype), _dec(_class = function (_Filterable) {
  _inherits(FilteredCollection, _Filterable);

  function FilteredCollection(collection, filter) {
    _classCallCheck(this, FilteredCollection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FilteredCollection).call(this));

    _this.collection = collection;
    _this.filter = filter;

    _this.collection.on(_events3.default.DATA_EVENT, _this.dataChanged.bind(_this));

    (0, _delegate2.default)(_this, "updateRecord", _this.collection);
    (0, _delegate2.default)(_this, "deleteRecord", _this.collection);
    return _this;
  }

  _createClass(FilteredCollection, [{
    key: "read",
    value: function read() {
      var _this2 = this;

      return this.collection.read().then(function (data) {
        return data.filter(_this2.filter);
      });
    }
  }, {
    key: "dataChanged",
    value: function dataChanged(data) {
      this.emit(_events3.default.DATA_EVENT, data.filter(this.filter));
    }
  }]);

  return FilteredCollection;
}(Filterable)) || _class);
exports.default = Filterable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFpdHMvRmlsdGVyYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QjtBQUMxQixNQUFJLE9BQU8sTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUNoQyxXQUFPLE1BQVA7QUFDRDs7QUFFRCxTQUFPLFVBQUMsSUFBRCxFQUFVO0FBQ2YsV0FBTyxPQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCLENBQTBCLFVBQUMsQ0FBRDtBQUFBLGFBQU8sT0FBTyxDQUFQLE1BQWMsS0FBSyxDQUFMLENBQXJCO0FBQUEsS0FBMUIsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7SUFFSyxVOzs7Ozs7OzBCQUNFLE0sRUFBUTtBQUNaLGFBQU8sSUFBSSxrQkFBSixDQUF1QixJQUF2QixFQUE2QixXQUFXLE1BQVgsQ0FBN0IsQ0FBUDtBQUNEOzs7d0JBRUcsTSxFQUFRO0FBQ1YsYUFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQVA7QUFDRDs7O3lCQUVJLE0sRUFBUTtBQUNYLGFBQU8scUJBQVcsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFYLENBQVA7QUFDRDs7Ozs7O0lBSUcsa0IsV0FETCx1QkFBUSxxQkFBYSxTQUFyQixDOzs7QUFFQyw4QkFBWSxVQUFaLEVBQXdCLE1BQXhCLEVBQWdDO0FBQUE7O0FBQUE7O0FBRzlCLFVBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLFVBQUssTUFBTCxHQUFjLE1BQWQ7O0FBRUEsVUFBSyxVQUFMLENBQWdCLEVBQWhCLENBQW1CLGlCQUFPLFVBQTFCLEVBQXNDLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUF0Qzs7QUFFQSxtQ0FBZSxjQUFmLEVBQStCLE1BQUssVUFBcEM7QUFDQSxtQ0FBZSxjQUFmLEVBQStCLE1BQUssVUFBcEM7QUFUOEI7QUFVL0I7Ozs7MkJBRU07QUFBQTs7QUFDTCxhQUFPLEtBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixJQUF2QixDQUE0QixVQUFDLElBQUQsRUFBVTtBQUMzQyxlQUFPLEtBQUssTUFBTCxDQUFZLE9BQUssTUFBakIsQ0FBUDtBQUNELE9BRk0sQ0FBUDtBQUdEOzs7Z0NBRVcsSSxFQUFNO0FBQ2hCLFdBQUssSUFBTCxDQUFVLGlCQUFPLFVBQWpCLEVBQTZCLEtBQUssTUFBTCxDQUFZLEtBQUssTUFBakIsQ0FBN0I7QUFDRDs7OztFQXJCOEIsVTtrQkF3QmxCLFUiLCJmaWxlIjoiRmlsdGVyYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9jb25zdGFudHMvZXZlbnRzXCI7XG5pbXBvcnQgZGVsZWdhdGUgZnJvbSBcIi4uL2xpYi9kZWxlZ2F0ZVwiO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSBcIi4uL2xpYi9jb21wb3NlXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi9SZWNvcmRcIjtcblxuZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICByZXR1cm4gKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZmlsdGVyKS5ldmVyeSgoaykgPT4gZmlsdGVyW2tdID09PSBpdGVtW2tdKTtcbiAgfTtcbn1cblxuY2xhc3MgRmlsdGVyYWJsZSB7XG4gIHdoZXJlKGZpbHRlcikge1xuICAgIHJldHVybiBuZXcgRmlsdGVyZWRDb2xsZWN0aW9uKHRoaXMsIHdyYXBGaWx0ZXIoZmlsdGVyKSk7XG4gIH1cblxuICBhbmQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMud2hlcmUoZmlsdGVyKTtcbiAgfVxuXG4gIGZpbmQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIG5ldyBSZWNvcmQodGhpcy53aGVyZShmaWx0ZXIpKTtcbiAgfVxufVxuXG5AY29tcG9zZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKVxuY2xhc3MgRmlsdGVyZWRDb2xsZWN0aW9uIGV4dGVuZHMgRmlsdGVyYWJsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbGxlY3Rpb24sIGZpbHRlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuXG4gICAgdGhpcy5jb2xsZWN0aW9uLm9uKGV2ZW50cy5EQVRBX0VWRU5ULCB0aGlzLmRhdGFDaGFuZ2VkLmJpbmQodGhpcykpO1xuXG4gICAgZGVsZWdhdGUodGhpcywgXCJ1cGRhdGVSZWNvcmRcIiwgdGhpcy5jb2xsZWN0aW9uKTtcbiAgICBkZWxlZ2F0ZSh0aGlzLCBcImRlbGV0ZVJlY29yZFwiLCB0aGlzLmNvbGxlY3Rpb24pO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLnJlYWQoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIodGhpcy5maWx0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgZGF0YUNoYW5nZWQoZGF0YSkge1xuICAgIHRoaXMuZW1pdChldmVudHMuREFUQV9FVkVOVCwgZGF0YS5maWx0ZXIodGhpcy5maWx0ZXIpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJhYmxlO1xuIl19