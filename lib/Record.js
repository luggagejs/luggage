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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWNvcmQuanMiXSwibmFtZXMiOlsid3JhcFRyYW5zZm9ybSIsInRyYW5zZm9ybSIsInJlY29yZCIsIk9iamVjdCIsImFzc2lnbiIsIlJlY29yZCIsInByb3RvdHlwZSIsImNvbGxlY3Rpb24iLCJvbiIsIkRBVEFfRVZFTlQiLCJkYXRhQ2hhbmdlZCIsImJpbmQiLCJyZWFkIiwidGhlbiIsImRhdGEiLCJ1cGRhdGVSZWNvcmQiLCJkZWxldGVSZWNvcmQiLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxTQUFTQSxhQUFULENBQXVCQyxTQUF2QixFQUFrQztBQUNoQyxNQUFJLE9BQU9BLFNBQVAsS0FBcUIsVUFBekIsRUFBcUM7QUFDbkMsV0FBT0EsU0FBUDtBQUNEOztBQUVELFNBQU8sVUFBQ0MsTUFBRCxFQUFZO0FBQ2pCLFdBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCRixNQUFsQixFQUEwQkQsU0FBMUIsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7SUFHS0ksTSxXQURMLHVCQUFRLHFCQUFhQyxTQUFyQixDO0FBRUMsa0JBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFDdEIsU0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQSxVQUFMLENBQWdCQyxFQUFoQixDQUFtQixpQkFBT0MsVUFBMUIsRUFBc0MsS0FBS0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBdEM7QUFDRDs7OzsyQkFFTTtBQUNMLGFBQU8sS0FBS0osVUFBTCxDQUFnQkssSUFBaEIsR0FBdUJDLElBQXZCLENBQTRCLFVBQUNDLElBQUQsRUFBVTtBQUMzQyxlQUFPQSxLQUFLLENBQUwsQ0FBUDtBQUNELE9BRk0sQ0FBUDtBQUdEOzs7MkJBRU1iLFMsRUFBVztBQUNoQixhQUFPLEtBQUtNLFVBQUwsQ0FBZ0JRLFlBQWhCLENBQTZCLElBQTdCLEVBQW1DZixjQUFjQyxTQUFkLENBQW5DLENBQVA7QUFDRDs7OzhCQUVRO0FBQ1AsYUFBTyxLQUFLTSxVQUFMLENBQWdCUyxZQUFoQixDQUE2QixJQUE3QixDQUFQO0FBQ0Q7OztnQ0FFV0YsSSxFQUFNO0FBQ2hCLFdBQUtHLElBQUwsQ0FBVSxpQkFBT1IsVUFBakIsRUFBNkJLLEtBQUssQ0FBTCxDQUE3QjtBQUNEOzs7OztrQkFHWVQsTSIsImZpbGUiOiJSZWNvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9jb25zdGFudHMvZXZlbnRzXCI7XG5pbXBvcnQgY29tcG9zZSBmcm9tIFwiLi9saWIvY29tcG9zZVwiO1xuXG5mdW5jdGlvbiB3cmFwVHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICBpZiAodHlwZW9mIHRyYW5zZm9ybSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgfVxuXG4gIHJldHVybiAocmVjb3JkKSA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJlY29yZCwgdHJhbnNmb3JtKTtcbiAgfTtcbn1cblxuQGNvbXBvc2UoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSlcbmNsYXNzIFJlY29yZCB7XG4gIGNvbnN0cnVjdG9yKGNvbGxlY3Rpb24pIHtcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuICAgIHRoaXMuY29sbGVjdGlvbi5vbihldmVudHMuREFUQV9FVkVOVCwgdGhpcy5kYXRhQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5yZWFkKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGRhdGFbMF07XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUodHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi51cGRhdGVSZWNvcmQodGhpcywgd3JhcFRyYW5zZm9ybSh0cmFuc2Zvcm0pKTtcbiAgfVxuXG4gIGRlbGV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmRlbGV0ZVJlY29yZCh0aGlzKTtcbiAgfVxuXG4gIGRhdGFDaGFuZ2VkKGRhdGEpIHtcbiAgICB0aGlzLmVtaXQoZXZlbnRzLkRBVEFfRVZFTlQsIGRhdGFbMF0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY29yZDtcbiJdfQ==