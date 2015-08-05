"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    return _Object$keys(filter).every(function (k) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFpdHMvRmlsdGVyYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBQTJCLFFBQVE7OytCQUNWLHFCQUFxQjs7MkJBQ3pCLGlCQUFpQjs7OzswQkFDbEIsZ0JBQWdCOzs7O3NCQUNqQixXQUFXOzs7O0FBRTlCLFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUMxQixNQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtBQUNoQyxXQUFPLE1BQU0sQ0FBQztHQUNmOztBQUVELFNBQU8sVUFBQyxJQUFJLEVBQUs7QUFDZixXQUFPLGFBQVksTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQzthQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0dBQ2hFLENBQUM7Q0FDSDs7SUFFSyxVQUFVO1dBQVYsVUFBVTswQkFBVixVQUFVOzs7ZUFBVixVQUFVOztXQUNULGVBQUMsTUFBTSxFQUFFO0FBQ1osYUFBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUN6RDs7O1dBRUUsYUFBQyxNQUFNLEVBQUU7QUFDVixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0I7OztXQUVHLGNBQUMsTUFBTSxFQUFFO0FBQ1gsYUFBTyx3QkFBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDdkM7OztTQVhHLFVBQVU7OztJQWVWLGtCQUFrQjtZQUFsQixrQkFBa0I7O0FBQ1gsV0FEUCxrQkFBa0IsQ0FDVixVQUFVLEVBQUUsTUFBTSxFQUFFOzs7QUFDOUIsK0ZBQVE7O0FBRVIsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0IsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxrQkFyQ2QsVUFBVSxFQXFDaUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFNUQsa0NBQVMsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEQsa0NBQVMsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDakQ7O2VBWEcsa0JBQWtCOztXQWFsQixnQkFBRzs7O0FBQ0wsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUMzQyxlQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBSyxNQUFNLENBQUMsQ0FBQztPQUNqQyxDQUFDLENBQUM7S0FDSjs7O1dBRVUscUJBQUMsSUFBSSxFQUFFO0FBQ2hCLFVBQUksQ0FBQyxJQUFJLGtCQWxETCxVQUFVLEVBa0RRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDakQ7Ozs0QkFyQkcsa0JBQWtCO0FBQWxCLG9CQUFrQixHQUR2Qiw2QkFBUSxRQTlCRCxZQUFZLENBOEJFLFNBQVMsQ0FBQyxDQUMxQixrQkFBa0IsS0FBbEIsa0JBQWtCO1NBQWxCLGtCQUFrQjtHQUFTLFVBQVU7O3FCQXdCNUIsVUFBVSIsImZpbGUiOiJGaWx0ZXJhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7REFUQV9FVkVOVH0gZnJvbSBcIi4uL2NvbnN0YW50cy9ldmVudHNcIjtcbmltcG9ydCBkZWxlZ2F0ZSBmcm9tIFwiLi4vbGliL2RlbGVnYXRlXCI7XG5pbXBvcnQgY29tcG9zZSBmcm9tIFwiLi4vbGliL2NvbXBvc2VcIjtcbmltcG9ydCBSZWNvcmQgZnJvbSBcIi4uL1JlY29yZFwiO1xuXG5mdW5jdGlvbiB3cmFwRmlsdGVyKGZpbHRlcikge1xuICBpZiAodHlwZW9mIGZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIHJldHVybiAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhmaWx0ZXIpLmV2ZXJ5KChrKSA9PiBmaWx0ZXJba10gPT09IGl0ZW1ba10pO1xuICB9O1xufVxuXG5jbGFzcyBGaWx0ZXJhYmxlIHtcbiAgd2hlcmUoZmlsdGVyKSB7XG4gICAgcmV0dXJuIG5ldyBGaWx0ZXJlZENvbGxlY3Rpb24odGhpcywgd3JhcEZpbHRlcihmaWx0ZXIpKTtcbiAgfVxuXG4gIGFuZChmaWx0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy53aGVyZShmaWx0ZXIpO1xuICB9XG5cbiAgZmluZChmaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IFJlY29yZCh0aGlzLndoZXJlKGZpbHRlcikpO1xuICB9XG59XG5cbkBjb21wb3NlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpXG5jbGFzcyBGaWx0ZXJlZENvbGxlY3Rpb24gZXh0ZW5kcyBGaWx0ZXJhYmxlIHtcbiAgY29uc3RydWN0b3IoY29sbGVjdGlvbiwgZmlsdGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb24ub24oREFUQV9FVkVOVCwgdGhpcy5kYXRhQ2hhbmdlZC5iaW5kKHRoaXMpKTtcblxuICAgIGRlbGVnYXRlKHRoaXMsIFwidXBkYXRlUmVjb3JkXCIsIHRoaXMuY29sbGVjdGlvbik7XG4gICAgZGVsZWdhdGUodGhpcywgXCJkZWxldGVSZWNvcmRcIiwgdGhpcy5jb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5yZWFkKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGRhdGEuZmlsdGVyKHRoaXMuZmlsdGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRhdGFDaGFuZ2VkKGRhdGEpIHtcbiAgICB0aGlzLmVtaXQoREFUQV9FVkVOVCwgZGF0YS5maWx0ZXIodGhpcy5maWx0ZXIpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJhYmxlO1xuIl19