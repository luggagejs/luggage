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

    var _this = _possibleConstructorReturn(this, (FilteredCollection.__proto__ || Object.getPrototypeOf(FilteredCollection)).call(this));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFpdHMvRmlsdGVyYWJsZS5qcyJdLCJuYW1lcyI6WyJ3cmFwRmlsdGVyIiwiZmlsdGVyIiwiaXRlbSIsIk9iamVjdCIsImtleXMiLCJldmVyeSIsImsiLCJGaWx0ZXJhYmxlIiwiRmlsdGVyZWRDb2xsZWN0aW9uIiwid2hlcmUiLCJwcm90b3R5cGUiLCJjb2xsZWN0aW9uIiwib24iLCJEQVRBX0VWRU5UIiwiZGF0YUNoYW5nZWQiLCJiaW5kIiwicmVhZCIsInRoZW4iLCJkYXRhIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxVQUFULENBQW9CQyxNQUFwQixFQUE0QjtBQUMxQixNQUFJLE9BQU9BLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDaEMsV0FBT0EsTUFBUDtBQUNEOztBQUVELFNBQU8sVUFBQ0MsSUFBRCxFQUFVO0FBQ2YsV0FBT0MsT0FBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9CSSxLQUFwQixDQUEwQixVQUFDQyxDQUFEO0FBQUEsYUFBT0wsT0FBT0ssQ0FBUCxNQUFjSixLQUFLSSxDQUFMLENBQXJCO0FBQUEsS0FBMUIsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7SUFFS0MsVTs7Ozs7OzswQkFDRU4sTSxFQUFRO0FBQ1osYUFBTyxJQUFJTyxrQkFBSixDQUF1QixJQUF2QixFQUE2QlIsV0FBV0MsTUFBWCxDQUE3QixDQUFQO0FBQ0Q7Ozt3QkFFR0EsTSxFQUFRO0FBQ1YsYUFBTyxLQUFLUSxLQUFMLENBQVdSLE1BQVgsQ0FBUDtBQUNEOzs7eUJBRUlBLE0sRUFBUTtBQUNYLGFBQU8scUJBQVcsS0FBS1EsS0FBTCxDQUFXUixNQUFYLENBQVgsQ0FBUDtBQUNEOzs7Ozs7SUFJR08sa0IsV0FETCx1QkFBUSxxQkFBYUUsU0FBckIsQzs7O0FBRUMsOEJBQVlDLFVBQVosRUFBd0JWLE1BQXhCLEVBQWdDO0FBQUE7O0FBQUE7O0FBRzlCLFVBQUtVLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsVUFBS1YsTUFBTCxHQUFjQSxNQUFkOztBQUVBLFVBQUtVLFVBQUwsQ0FBZ0JDLEVBQWhCLENBQW1CLGlCQUFPQyxVQUExQixFQUFzQyxNQUFLQyxXQUFMLENBQWlCQyxJQUFqQixPQUF0Qzs7QUFFQSxtQ0FBZSxjQUFmLEVBQStCLE1BQUtKLFVBQXBDO0FBQ0EsbUNBQWUsY0FBZixFQUErQixNQUFLQSxVQUFwQztBQVQ4QjtBQVUvQjs7OzsyQkFFTTtBQUFBOztBQUNMLGFBQU8sS0FBS0EsVUFBTCxDQUFnQkssSUFBaEIsR0FBdUJDLElBQXZCLENBQTRCLFVBQUNDLElBQUQsRUFBVTtBQUMzQyxlQUFPQSxLQUFLakIsTUFBTCxDQUFZLE9BQUtBLE1BQWpCLENBQVA7QUFDRCxPQUZNLENBQVA7QUFHRDs7O2dDQUVXaUIsSSxFQUFNO0FBQ2hCLFdBQUtDLElBQUwsQ0FBVSxpQkFBT04sVUFBakIsRUFBNkJLLEtBQUtqQixNQUFMLENBQVksS0FBS0EsTUFBakIsQ0FBN0I7QUFDRDs7OztFQXJCOEJNLFU7a0JBd0JsQkEsVSIsImZpbGUiOiJGaWx0ZXJhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uL2NvbnN0YW50cy9ldmVudHNcIjtcbmltcG9ydCBkZWxlZ2F0ZSBmcm9tIFwiLi4vbGliL2RlbGVnYXRlXCI7XG5pbXBvcnQgY29tcG9zZSBmcm9tIFwiLi4vbGliL2NvbXBvc2VcIjtcbmltcG9ydCBSZWNvcmQgZnJvbSBcIi4uL1JlY29yZFwiO1xuXG5mdW5jdGlvbiB3cmFwRmlsdGVyKGZpbHRlcikge1xuICBpZiAodHlwZW9mIGZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIHJldHVybiAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhmaWx0ZXIpLmV2ZXJ5KChrKSA9PiBmaWx0ZXJba10gPT09IGl0ZW1ba10pO1xuICB9O1xufVxuXG5jbGFzcyBGaWx0ZXJhYmxlIHtcbiAgd2hlcmUoZmlsdGVyKSB7XG4gICAgcmV0dXJuIG5ldyBGaWx0ZXJlZENvbGxlY3Rpb24odGhpcywgd3JhcEZpbHRlcihmaWx0ZXIpKTtcbiAgfVxuXG4gIGFuZChmaWx0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy53aGVyZShmaWx0ZXIpO1xuICB9XG5cbiAgZmluZChmaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IFJlY29yZCh0aGlzLndoZXJlKGZpbHRlcikpO1xuICB9XG59XG5cbkBjb21wb3NlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpXG5jbGFzcyBGaWx0ZXJlZENvbGxlY3Rpb24gZXh0ZW5kcyBGaWx0ZXJhYmxlIHtcbiAgY29uc3RydWN0b3IoY29sbGVjdGlvbiwgZmlsdGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb24ub24oZXZlbnRzLkRBVEFfRVZFTlQsIHRoaXMuZGF0YUNoYW5nZWQuYmluZCh0aGlzKSk7XG5cbiAgICBkZWxlZ2F0ZSh0aGlzLCBcInVwZGF0ZVJlY29yZFwiLCB0aGlzLmNvbGxlY3Rpb24pO1xuICAgIGRlbGVnYXRlKHRoaXMsIFwiZGVsZXRlUmVjb3JkXCIsIHRoaXMuY29sbGVjdGlvbik7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ucmVhZCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcih0aGlzLmZpbHRlcik7XG4gICAgfSk7XG4gIH1cblxuICBkYXRhQ2hhbmdlZChkYXRhKSB7XG4gICAgdGhpcy5lbWl0KGV2ZW50cy5EQVRBX0VWRU5ULCBkYXRhLmZpbHRlcih0aGlzLmZpbHRlcikpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlcmFibGU7XG4iXX0=