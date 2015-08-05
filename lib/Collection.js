/* global Dropbox */

"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
        return _Promise.all([newRecord, _this.write(data)]);
      });
    }
  }, {
    key: "updateRecord",
    value: function updateRecord(record, transform) {
      var _this2 = this;

      return _Promise.all([record.read(), this.read()]).then(function (_ref) {
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

        var newRecord = transform.call(null, _Object$assign({}, record));
        data[recordIndex] = newRecord;
        return _Promise.all([newRecord, record, _this2.write(data)]);
      });
    }
  }, {
    key: "deleteRecord",
    value: function deleteRecord(record) {
      var _this3 = this;

      return _Promise.all([record.read(), this.read()]).then(function (_ref4) {
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
//# sourceMappingURL=data:application/json;base64,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QUFNO1lBQUUsSUFBSTs7QUFDbEIsWUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7aUJBQUksNEJBQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQztTQUFBLENBQUMsQ0FBQztBQUN4RCxZQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1QixlQUFPLENBQUMsTUFBTSxFQUFFLE9BQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7T0FDbkMsQ0FBQyxDQUNGO0tBQ0g7OztvQkF2REcsVUFBVTtBQUFWLFlBQVUsR0FEZiw2QkFBUSxRQUxELFlBQVksQ0FLRSxTQUFTLENBQUMsQ0FDMUIsVUFBVSxLQUFWLFVBQVU7U0FBVixVQUFVOzs7cUJBMERELFVBQVUiLCJmaWxlIjoiQ29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBEcm9wYm94ICovXG5cbmltcG9ydCBlcXVhbCBmcm9tIFwiZGVlcC1lcXVhbFwiO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7REFUQV9FVkVOVH0gZnJvbSBcIi4vY29uc3RhbnRzL2V2ZW50c1wiO1xuaW1wb3J0IEZpbHRlcmFibGUgZnJvbSBcIi4vdHJhaXRzL0ZpbHRlcmFibGVcIjtcbmltcG9ydCBjb21wb3NlIGZyb20gXCIuL2xpYi9jb21wb3NlXCI7XG5cbkBjb21wb3NlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpXG5jbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgRmlsdGVyYWJsZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGJhY2tlbmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5iYWNrZW5kID0gYmFja2VuZC5jb2xsZWN0aW9uKG5hbWUpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLmJhY2tlbmQucmVhZCgpLnRoZW4odGhpcy5kYXRhQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHdyaXRlKGRhdGE9W10pIHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLndyaXRlKGRhdGEpLnRoZW4odGhpcy5kYXRhQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGRhdGFDaGFuZ2VkKGRhdGEpIHtcbiAgICB0aGlzLmVtaXQoREFUQV9FVkVOVCwgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhZGQobmV3UmVjb3JkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYmFja2VuZC5yZWFkKClcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGRhdGEucHVzaChuZXdSZWNvcmQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld1JlY29yZCwgdGhpcy53cml0ZShkYXRhKV0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlUmVjb3JkKHJlY29yZCwgdHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFByb21pc2UuYWxsKFtyZWNvcmQucmVhZCgpLCB0aGlzLnJlYWQoKV0pXG4gICAgICAudGhlbigoW3JlY29yZCwgZGF0YV0pID0+IHtcbiAgICAgICAgdmFyIHJlY29yZEluZGV4ID0gZGF0YS5maW5kSW5kZXgociA9PiBlcXVhbChyLCByZWNvcmQpKTtcbiAgICAgICAgcmV0dXJuIFtyZWNvcmRJbmRleCwgcmVjb3JkLCBkYXRhXTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW3JlY29yZEluZGV4LCByZWNvcmQsIGRhdGFdKSA9PiB7XG4gICAgICAgIHZhciBuZXdSZWNvcmQgPSB0cmFuc2Zvcm0uY2FsbChudWxsLCBPYmplY3QuYXNzaWduKHt9LCByZWNvcmQpKTtcbiAgICAgICAgZGF0YVtyZWNvcmRJbmRleF0gPSBuZXdSZWNvcmQ7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3UmVjb3JkLCByZWNvcmQsIHRoaXMud3JpdGUoZGF0YSldKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRlbGV0ZVJlY29yZChyZWNvcmQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUHJvbWlzZS5hbGwoW3JlY29yZC5yZWFkKCksIHRoaXMucmVhZCgpXSlcbiAgICAgIC50aGVuKChbcmVjb3JkLCBkYXRhXSkgPT4ge1xuICAgICAgICB2YXIgcmVjb3JkSW5kZXggPSBkYXRhLmZpbmRJbmRleChyID0+IGVxdWFsKHIsIHJlY29yZCkpO1xuICAgICAgICBkYXRhLnNwbGljZShyZWNvcmRJbmRleCwgMSk7XG4gICAgICAgIHJldHVybiBbcmVjb3JkLCB0aGlzLndyaXRlKGRhdGEpXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uO1xuIl19