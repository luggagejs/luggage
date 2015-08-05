"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _events = require("events");

var _constantsEvents = require("./constants/events");

var _libCompose = require("./lib/compose");

var _libCompose2 = _interopRequireDefault(_libCompose);

function wrapTransform(transform) {
  if (typeof transform === "function") {
    return transform;
  }

  return function (record) {
    return Object.assign({}, record, transform);
  };
}

var Record = (function () {
  function Record(collection) {
    _classCallCheck(this, _Record);

    this.collection = collection;
    this.collection.on(_constantsEvents.DATA_EVENT, this.dataChanged.bind(this));
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
      this.emit(_constantsEvents.DATA_EVENT, data[0]);
    }
  }]);

  var _Record = Record;
  Record = (0, _libCompose2["default"])(_events.EventEmitter.prototype)(Record) || Record;
  return Record;
})();

exports["default"] = Record;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWNvcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUEyQixRQUFROzsrQkFDVixvQkFBb0I7OzBCQUN6QixlQUFlOzs7O0FBRW5DLFNBQVMsYUFBYSxDQUFDLFNBQVMsRUFBRTtBQUNoQyxNQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUNuQyxXQUFPLFNBQVMsQ0FBQztHQUNsQjs7QUFFRCxTQUFPLFVBQUMsTUFBTSxFQUFLO0FBQ2pCLFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQzdDLENBQUM7Q0FDSDs7SUFHSyxNQUFNO0FBQ0MsV0FEUCxNQUFNLENBQ0UsVUFBVSxFQUFFOzs7QUFDdEIsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0IsUUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLGtCQWpCZCxVQUFVLEVBaUJpQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQzdEOztlQUpHLE1BQU07O1dBTU4sZ0JBQUc7QUFDTCxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQzNDLGVBQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hCLENBQUMsQ0FBQztLQUNKOzs7V0FFSyxnQkFBQyxTQUFTLEVBQUU7QUFDaEIsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDckU7OztXQUVLLG1CQUFHO0FBQ1AsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQzs7O1dBRVUscUJBQUMsSUFBSSxFQUFFO0FBQ2hCLFVBQUksQ0FBQyxJQUFJLGtCQW5DTCxVQUFVLEVBbUNRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hDOzs7Z0JBdEJHLE1BQU07QUFBTixRQUFNLEdBRFgsNkJBQVEsUUFkRCxZQUFZLENBY0UsU0FBUyxDQUFDLENBQzFCLE1BQU0sS0FBTixNQUFNO1NBQU4sTUFBTTs7O3FCQXlCRyxNQUFNIiwiZmlsZSI6IlJlY29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQge0RBVEFfRVZFTlR9IGZyb20gXCIuL2NvbnN0YW50cy9ldmVudHNcIjtcbmltcG9ydCBjb21wb3NlIGZyb20gXCIuL2xpYi9jb21wb3NlXCI7XG5cbmZ1bmN0aW9uIHdyYXBUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gIGlmICh0eXBlb2YgdHJhbnNmb3JtID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtO1xuICB9XG5cbiAgcmV0dXJuIChyZWNvcmQpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcmVjb3JkLCB0cmFuc2Zvcm0pO1xuICB9O1xufVxuXG5AY29tcG9zZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKVxuY2xhc3MgUmVjb3JkIHtcbiAgY29uc3RydWN0b3IoY29sbGVjdGlvbikge1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgdGhpcy5jb2xsZWN0aW9uLm9uKERBVEFfRVZFTlQsIHRoaXMuZGF0YUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ucmVhZCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBkYXRhWzBdO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKHRyYW5zZm9ybSkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24udXBkYXRlUmVjb3JkKHRoaXMsIHdyYXBUcmFuc2Zvcm0odHJhbnNmb3JtKSk7XG4gIH1cblxuICBkZWxldGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5kZWxldGVSZWNvcmQodGhpcyk7XG4gIH1cblxuICBkYXRhQ2hhbmdlZChkYXRhKSB7XG4gICAgdGhpcy5lbWl0KERBVEFfRVZFTlQsIGRhdGFbMF0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY29yZDtcbiJdfQ==