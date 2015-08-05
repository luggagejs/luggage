"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _events = require("events");

var _constantsEvents = require("../constants/events");

var _libDelegate = require("../lib/delegate");

var _libDelegate2 = _interopRequireDefault(_libDelegate);

var _libCompose = require("../lib/compose");

var _libCompose2 = _interopRequireDefault(_libCompose);

var _Record = require("../Record");

var _Record2 = _interopRequireDefault(_Record);

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

var Filterable = (function () {
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
      return new _Record2["default"](this.where(filter));
    }
  }]);

  return Filterable;
})();

var FilteredCollection = (function (_Filterable) {
  _inherits(FilteredCollection, _Filterable);

  function FilteredCollection(collection, filter) {
    _classCallCheck(this, _FilteredCollection);

    _get(Object.getPrototypeOf(_FilteredCollection.prototype), "constructor", this).call(this);

    this.collection = collection;
    this.filter = filter;

    this.collection.on(_constantsEvents.DATA_EVENT, this.dataChanged.bind(this));

    (0, _libDelegate2["default"])(this, "updateRecord", this.collection);
    (0, _libDelegate2["default"])(this, "deleteRecord", this.collection);
  }

  _createClass(FilteredCollection, [{
    key: "read",
    value: function read() {
      var _this = this;

      return this.collection.read().then(function (data) {
        return data.filter(_this.filter);
      });
    }
  }, {
    key: "dataChanged",
    value: function dataChanged(data) {
      this.emit(_constantsEvents.DATA_EVENT, data.filter(this.filter));
    }
  }]);

  var _FilteredCollection = FilteredCollection;
  FilteredCollection = (0, _libCompose2["default"])(_events.EventEmitter.prototype)(FilteredCollection) || FilteredCollection;
  return FilteredCollection;
})(Filterable);

exports["default"] = Filterable;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFpdHMvRmlsdGVyYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3NCQUEyQixRQUFROzsrQkFDVixxQkFBcUI7OzJCQUN6QixpQkFBaUI7Ozs7MEJBQ2xCLGdCQUFnQjs7OztzQkFDakIsV0FBVzs7OztBQUU5QixTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsTUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7QUFDaEMsV0FBTyxNQUFNLENBQUM7R0FDZjs7QUFFRCxTQUFPLFVBQUMsSUFBSSxFQUFLO0FBQ2YsV0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUM7YUFBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQztHQUNoRSxDQUFDO0NBQ0g7O0lBRUssVUFBVTtXQUFWLFVBQVU7MEJBQVYsVUFBVTs7O2VBQVYsVUFBVTs7V0FDVCxlQUFDLE1BQU0sRUFBRTtBQUNaLGFBQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDekQ7OztXQUVFLGFBQUMsTUFBTSxFQUFFO0FBQ1YsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzNCOzs7V0FFRyxjQUFDLE1BQU0sRUFBRTtBQUNYLGFBQU8sd0JBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDOzs7U0FYRyxVQUFVOzs7SUFlVixrQkFBa0I7WUFBbEIsa0JBQWtCOztBQUNYLFdBRFAsa0JBQWtCLENBQ1YsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O0FBQzlCLCtGQUFROztBQUVSLFFBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixRQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsa0JBckNkLFVBQVUsRUFxQ2lCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRTVELGtDQUFTLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELGtDQUFTLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQ2pEOztlQVhHLGtCQUFrQjs7V0FhbEIsZ0JBQUc7OztBQUNMLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDM0MsZUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQUssTUFBTSxDQUFDLENBQUM7T0FDakMsQ0FBQyxDQUFDO0tBQ0o7OztXQUVVLHFCQUFDLElBQUksRUFBRTtBQUNoQixVQUFJLENBQUMsSUFBSSxrQkFsREwsVUFBVSxFQWtEUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2pEOzs7NEJBckJHLGtCQUFrQjtBQUFsQixvQkFBa0IsR0FEdkIsNkJBQVEsUUE5QkQsWUFBWSxDQThCRSxTQUFTLENBQUMsQ0FDMUIsa0JBQWtCLEtBQWxCLGtCQUFrQjtTQUFsQixrQkFBa0I7R0FBUyxVQUFVOztxQkF3QjVCLFVBQVUiLCJmaWxlIjoiRmlsdGVyYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQge0RBVEFfRVZFTlR9IGZyb20gXCIuLi9jb25zdGFudHMvZXZlbnRzXCI7XG5pbXBvcnQgZGVsZWdhdGUgZnJvbSBcIi4uL2xpYi9kZWxlZ2F0ZVwiO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSBcIi4uL2xpYi9jb21wb3NlXCI7XG5pbXBvcnQgUmVjb3JkIGZyb20gXCIuLi9SZWNvcmRcIjtcblxuZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICByZXR1cm4gKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZmlsdGVyKS5ldmVyeSgoaykgPT4gZmlsdGVyW2tdID09PSBpdGVtW2tdKTtcbiAgfTtcbn1cblxuY2xhc3MgRmlsdGVyYWJsZSB7XG4gIHdoZXJlKGZpbHRlcikge1xuICAgIHJldHVybiBuZXcgRmlsdGVyZWRDb2xsZWN0aW9uKHRoaXMsIHdyYXBGaWx0ZXIoZmlsdGVyKSk7XG4gIH1cblxuICBhbmQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMud2hlcmUoZmlsdGVyKTtcbiAgfVxuXG4gIGZpbmQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIG5ldyBSZWNvcmQodGhpcy53aGVyZShmaWx0ZXIpKTtcbiAgfVxufVxuXG5AY29tcG9zZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKVxuY2xhc3MgRmlsdGVyZWRDb2xsZWN0aW9uIGV4dGVuZHMgRmlsdGVyYWJsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbGxlY3Rpb24sIGZpbHRlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuXG4gICAgdGhpcy5jb2xsZWN0aW9uLm9uKERBVEFfRVZFTlQsIHRoaXMuZGF0YUNoYW5nZWQuYmluZCh0aGlzKSk7XG5cbiAgICBkZWxlZ2F0ZSh0aGlzLCBcInVwZGF0ZVJlY29yZFwiLCB0aGlzLmNvbGxlY3Rpb24pO1xuICAgIGRlbGVnYXRlKHRoaXMsIFwiZGVsZXRlUmVjb3JkXCIsIHRoaXMuY29sbGVjdGlvbik7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ucmVhZCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcih0aGlzLmZpbHRlcik7XG4gICAgfSk7XG4gIH1cblxuICBkYXRhQ2hhbmdlZChkYXRhKSB7XG4gICAgdGhpcy5lbWl0KERBVEFfRVZFTlQsIGRhdGEuZmlsdGVyKHRoaXMuZmlsdGVyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyYWJsZTtcbiJdfQ==