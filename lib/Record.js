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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWNvcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hDLE1BQUksT0FBTyxTQUFQLEtBQXFCLFVBQXJCLEVBQWlDO0FBQ25DLFdBQU8sU0FBUCxDQURtQztHQUFyQzs7QUFJQSxTQUFPLFVBQUMsTUFBRCxFQUFZO0FBQ2pCLFdBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixNQUFsQixFQUEwQixTQUExQixDQUFQLENBRGlCO0dBQVosQ0FMeUI7Q0FBbEM7O0lBV00saUJBREwsdUJBQVEscUJBQWEsU0FBYjtBQUVQLFdBREksTUFDSixDQUFZLFVBQVosRUFBd0I7MEJBRHBCLFFBQ29COztBQUN0QixTQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FEc0I7QUFFdEIsU0FBSyxVQUFMLENBQWdCLEVBQWhCLENBQW1CLGlCQUFPLFVBQVAsRUFBbUIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQXRDLEVBRnNCO0dBQXhCOztlQURJOzsyQkFNRztBQUNMLGFBQU8sS0FBSyxVQUFMLENBQWdCLElBQWhCLEdBQXVCLElBQXZCLENBQTRCLFVBQUMsSUFBRCxFQUFVO0FBQzNDLGVBQU8sS0FBSyxDQUFMLENBQVAsQ0FEMkM7T0FBVixDQUFuQyxDQURLOzs7OzJCQU1BLFdBQVc7QUFDaEIsYUFBTyxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsSUFBN0IsRUFBbUMsY0FBYyxTQUFkLENBQW5DLENBQVAsQ0FEZ0I7Ozs7OEJBSVQ7QUFDUCxhQUFPLEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixJQUE3QixDQUFQLENBRE87Ozs7Z0NBSUcsTUFBTTtBQUNoQixXQUFLLElBQUwsQ0FBVSxpQkFBTyxVQUFQLEVBQW1CLEtBQUssQ0FBTCxDQUE3QixFQURnQjs7OztTQXBCZDs7a0JBeUJTIiwiZmlsZSI6IlJlY29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL2NvbnN0YW50cy9ldmVudHNcIjtcbmltcG9ydCBjb21wb3NlIGZyb20gXCIuL2xpYi9jb21wb3NlXCI7XG5cbmZ1bmN0aW9uIHdyYXBUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gIGlmICh0eXBlb2YgdHJhbnNmb3JtID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtO1xuICB9XG5cbiAgcmV0dXJuIChyZWNvcmQpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcmVjb3JkLCB0cmFuc2Zvcm0pO1xuICB9O1xufVxuXG5AY29tcG9zZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKVxuY2xhc3MgUmVjb3JkIHtcbiAgY29uc3RydWN0b3IoY29sbGVjdGlvbikge1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgdGhpcy5jb2xsZWN0aW9uLm9uKGV2ZW50cy5EQVRBX0VWRU5ULCB0aGlzLmRhdGFDaGFuZ2VkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLnJlYWQoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICByZXR1cm4gZGF0YVswXTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSh0cmFuc2Zvcm0pIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLnVwZGF0ZVJlY29yZCh0aGlzLCB3cmFwVHJhbnNmb3JtKHRyYW5zZm9ybSkpO1xuICB9XG5cbiAgZGVsZXRlKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZGVsZXRlUmVjb3JkKHRoaXMpO1xuICB9XG5cbiAgZGF0YUNoYW5nZWQoZGF0YSkge1xuICAgIHRoaXMuZW1pdChldmVudHMuREFUQV9FVkVOVCwgZGF0YVswXSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjb3JkO1xuIl19