/* global Dropbox */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _deepEqual = require("deep-equal");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _events = require("events");

var _constantsEvents = require("./constants/events");

var _traitsFilterable = require("./traits/Filterable");

var _traitsFilterable2 = _interopRequireDefault(_traitsFilterable);

var _libCompose = require("./lib/compose");

var _libCompose2 = _interopRequireDefault(_libCompose);

var Collection = (function (_Filterable) {
  _inherits(Collection, _Filterable);

  function Collection(name, backend) {
    _classCallCheck(this, _Collection);

    _get(Object.getPrototypeOf(_Collection.prototype), "constructor", this).call(this);

    this.backend = backend.collection(name);
    this.name = name;
  }

  _createClass(Collection, [{
    key: "read",
    value: function read() {
      return this.backend.read().then(this.dataChanged.bind(this));
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      return this.backend.write(data).then(this.dataChanged.bind(this));
    }
  }, {
    key: "dataChanged",
    value: function dataChanged(data) {
      this.emit(_constantsEvents.DATA_EVENT, data);
      return data;
    }
  }, {
    key: "add",
    value: function add(newRecord) {
      var _this = this;

      return this.backend.read().then(function (data) {
        data.push(newRecord);
        return Promise.all([newRecord, _this.write(data)]);
      });
    }
  }, {
    key: "updateRecord",
    value: function updateRecord(record, transform) {
      var _this2 = this;

      return Promise.all([record.read(), this.read()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var record = _ref2[0];
        var data = _ref2[1];

        var recordIndex = data.findIndex(function (r) {
          return (0, _deepEqual2["default"])(r, record);
        });
        return [recordIndex, record, data];
      }).then(function (_ref3) {
        var _ref32 = _slicedToArray(_ref3, 3);

        var recordIndex = _ref32[0];
        var record = _ref32[1];
        var data = _ref32[2];

        var newRecord = transform.call(null, Object.assign({}, record));
        data[recordIndex] = newRecord;
        return Promise.all([newRecord, record, _this2.write(data)]);
      });
    }
  }, {
    key: "deleteRecord",
    value: function deleteRecord(record) {
      var _this3 = this;

      return Promise.all([record.read(), this.read()]).then(function (_ref4) {
        var _ref42 = _slicedToArray(_ref4, 2);

        var record = _ref42[0];
        var data = _ref42[1];

        var recordIndex = data.findIndex(function (r) {
          return (0, _deepEqual2["default"])(r, record);
        });
        data.splice(recordIndex, 1);
        return [record, _this3.write(data)];
      });
    }
  }]);

  var _Collection = Collection;
  Collection = (0, _libCompose2["default"])(_events.EventEmitter.prototype)(Collection) || Collection;
  return Collection;
})(_traitsFilterable2["default"]);

exports["default"] = Collection;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db2xsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQUVrQixZQUFZOzs7O3NCQUNILFFBQVE7OytCQUNWLG9CQUFvQjs7Z0NBQ3RCLHFCQUFxQjs7OzswQkFDeEIsZUFBZTs7OztJQUc3QixVQUFVO1lBQVYsVUFBVTs7QUFDSCxXQURQLFVBQVUsQ0FDRixJQUFJLEVBQUUsT0FBTyxFQUFFOzs7QUFDekIsdUZBQVE7O0FBRVIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0dBQ2xCOztlQU5HLFVBQVU7O1dBUVYsZ0JBQUc7QUFDTCxhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDOUQ7OztXQUVJLGlCQUFVO1VBQVQsSUFBSSx5REFBQyxFQUFFOztBQUNYLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbkU7OztXQUVVLHFCQUFDLElBQUksRUFBRTtBQUNoQixVQUFJLENBQUMsSUFBSSxrQkF0QkwsVUFBVSxFQXNCUSxJQUFJLENBQUMsQ0FBQztBQUM1QixhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFRSxhQUFDLFNBQVMsRUFBRTs7O0FBQ2IsYUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUNsQixJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDZCxZQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JCLGVBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDbkQsQ0FBQyxDQUNGO0tBQ0g7OztXQUVXLHNCQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7OztBQUM5QixhQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDeEMsSUFBSSxDQUFDLFVBQUMsSUFBYyxFQUFLO21DQUFuQixJQUFjOztZQUFiLE1BQU07WUFBRSxJQUFJOztBQUNsQixZQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztpQkFBSSw0QkFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDO1NBQUEsQ0FBQyxDQUFDO0FBQ3hELGVBQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO09BQ3BDLENBQUMsQ0FDRCxJQUFJLENBQUMsVUFBQyxLQUEyQixFQUFLO29DQUFoQyxLQUEyQjs7WUFBMUIsV0FBVztZQUFFLE1BQU07WUFBRSxJQUFJOztBQUMvQixZQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLFlBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDOUIsZUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDM0QsQ0FBQyxDQUNGO0tBQ0g7OztXQUVXLHNCQUFDLE1BQU0sRUFBRTs7O0FBQ25CLGFBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUN4QyxJQUFJLENBQUMsVUFBQyxLQUFjLEVBQUs7b0NBQW5CLEtBQWM7O1lBQWIsTUFBTTtZQUFFLElBQUk7O0FBQ2xCLFlBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO2lCQUFJLDRCQUFNLENBQUMsRUFBRSxNQUFNLENBQUM7U0FBQSxDQUFDLENBQUM7QUFDeEQsWUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUIsZUFBTyxDQUFDLE1BQU0sRUFBRSxPQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO09BQ25DLENBQUMsQ0FDRjtLQUNIOzs7b0JBdkRHLFVBQVU7QUFBVixZQUFVLEdBRGYsNkJBQVEsUUFMRCxZQUFZLENBS0UsU0FBUyxDQUFDLENBQzFCLFVBQVUsS0FBVixVQUFVO1NBQVYsVUFBVTs7O3FCQTBERCxVQUFVIiwiZmlsZSI6IkNvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgRHJvcGJveCAqL1xuXG5pbXBvcnQgZXF1YWwgZnJvbSBcImRlZXAtZXF1YWxcIjtcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQge0RBVEFfRVZFTlR9IGZyb20gXCIuL2NvbnN0YW50cy9ldmVudHNcIjtcbmltcG9ydCBGaWx0ZXJhYmxlIGZyb20gXCIuL3RyYWl0cy9GaWx0ZXJhYmxlXCI7XG5pbXBvcnQgY29tcG9zZSBmcm9tIFwiLi9saWIvY29tcG9zZVwiO1xuXG5AY29tcG9zZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKVxuY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIEZpbHRlcmFibGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYmFja2VuZCA9IGJhY2tlbmQuY29sbGVjdGlvbihuYW1lKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnJlYWQoKS50aGVuKHRoaXMuZGF0YUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZC53cml0ZShkYXRhKS50aGVuKHRoaXMuZGF0YUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBkYXRhQ2hhbmdlZChkYXRhKSB7XG4gICAgdGhpcy5lbWl0KERBVEFfRVZFTlQsIGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYWRkKG5ld1JlY29yZCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmJhY2tlbmQucmVhZCgpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBkYXRhLnB1c2gobmV3UmVjb3JkKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdSZWNvcmQsIHRoaXMud3JpdGUoZGF0YSldKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHVwZGF0ZVJlY29yZChyZWNvcmQsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiAoXG4gICAgICBQcm9taXNlLmFsbChbcmVjb3JkLnJlYWQoKSwgdGhpcy5yZWFkKCldKVxuICAgICAgLnRoZW4oKFtyZWNvcmQsIGRhdGFdKSA9PiB7XG4gICAgICAgIHZhciByZWNvcmRJbmRleCA9IGRhdGEuZmluZEluZGV4KHIgPT4gZXF1YWwociwgcmVjb3JkKSk7XG4gICAgICAgIHJldHVybiBbcmVjb3JkSW5kZXgsIHJlY29yZCwgZGF0YV07XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtyZWNvcmRJbmRleCwgcmVjb3JkLCBkYXRhXSkgPT4ge1xuICAgICAgICB2YXIgbmV3UmVjb3JkID0gdHJhbnNmb3JtLmNhbGwobnVsbCwgT2JqZWN0LmFzc2lnbih7fSwgcmVjb3JkKSk7XG4gICAgICAgIGRhdGFbcmVjb3JkSW5kZXhdID0gbmV3UmVjb3JkO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld1JlY29yZCwgcmVjb3JkLCB0aGlzLndyaXRlKGRhdGEpXSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkZWxldGVSZWNvcmQocmVjb3JkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFByb21pc2UuYWxsKFtyZWNvcmQucmVhZCgpLCB0aGlzLnJlYWQoKV0pXG4gICAgICAudGhlbigoW3JlY29yZCwgZGF0YV0pID0+IHtcbiAgICAgICAgdmFyIHJlY29yZEluZGV4ID0gZGF0YS5maW5kSW5kZXgociA9PiBlcXVhbChyLCByZWNvcmQpKTtcbiAgICAgICAgZGF0YS5zcGxpY2UocmVjb3JkSW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gW3JlY29yZCwgdGhpcy53cml0ZShkYXRhKV07XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbjtcbiJdfQ==