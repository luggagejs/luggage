"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _deepEqual = require("deep-equal");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _events = require("events");

var _events2 = require("./constants/events");

var _events3 = _interopRequireDefault(_events2);

var _Filterable2 = require("./traits/Filterable");

var _Filterable3 = _interopRequireDefault(_Filterable2);

var _compose = require("./lib/compose");

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collection = (_dec = (0, _compose2.default)(_events.EventEmitter.prototype), _dec(_class = function (_Filterable) {
  _inherits(Collection, _Filterable);

  function Collection(name, backend) {
    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Collection).call(this));

    _this.backend = backend.collection(name);
    _this.name = name;
    return _this;
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
      this.emit(_events3.default.DATA_EVENT, data);
      return data;
    }
  }, {
    key: "add",
    value: function add(newRecord) {
      var _this2 = this;

      return this.backend.read().then(function (data) {
        data.push(newRecord);
        return Promise.all([newRecord, _this2.write(data)]);
      });
    }
  }, {
    key: "updateRecord",
    value: function updateRecord(record, transform) {
      var _this3 = this;

      return Promise.all([record.read(), this.read()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var record = _ref2[0];
        var data = _ref2[1];

        var recordIndex = data.findIndex(function (r) {
          return (0, _deepEqual2.default)(r, record);
        });
        return [recordIndex, record, data];
      }).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3);

        var recordIndex = _ref4[0];
        var record = _ref4[1];
        var data = _ref4[2];

        var newRecord = transform.call(null, Object.assign({}, record));
        data[recordIndex] = newRecord;
        return Promise.all([newRecord, record, _this3.write(data)]);
      });
    }
  }, {
    key: "deleteRecord",
    value: function deleteRecord(record) {
      var _this4 = this;

      return Promise.all([record.read(), this.read()]).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2);

        var record = _ref6[0];
        var data = _ref6[1];

        var recordIndex = data.findIndex(function (r) {
          return (0, _deepEqual2.default)(r, record);
        });
        data.splice(recordIndex, 1);
        return Promise.all([record, _this4.write(data)]);
      });
    }
  }]);

  return Collection;
}(_Filterable3.default)) || _class);
exports.default = Collection;
//# sourceMappingURL=data:application/json;base64,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Ozs7a0JBR1ksVSIsImZpbGUiOiJDb2xsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVxdWFsIGZyb20gXCJkZWVwLWVxdWFsXCI7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9jb25zdGFudHMvZXZlbnRzXCI7XG5pbXBvcnQgRmlsdGVyYWJsZSBmcm9tIFwiLi90cmFpdHMvRmlsdGVyYWJsZVwiO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSBcIi4vbGliL2NvbXBvc2VcIjtcblxuQGNvbXBvc2UoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSlcbmNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBGaWx0ZXJhYmxlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgYmFja2VuZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmJhY2tlbmQgPSBiYWNrZW5kLmNvbGxlY3Rpb24obmFtZSk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZC5yZWFkKCkudGhlbih0aGlzLmRhdGFDaGFuZ2VkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgd3JpdGUoZGF0YT1bXSkge1xuICAgIHJldHVybiB0aGlzLmJhY2tlbmQud3JpdGUoZGF0YSkudGhlbih0aGlzLmRhdGFDaGFuZ2VkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZGF0YUNoYW5nZWQoZGF0YSkge1xuICAgIHRoaXMuZW1pdChldmVudHMuREFUQV9FVkVOVCwgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhZGQobmV3UmVjb3JkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYmFja2VuZC5yZWFkKClcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGRhdGEucHVzaChuZXdSZWNvcmQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld1JlY29yZCwgdGhpcy53cml0ZShkYXRhKV0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlUmVjb3JkKHJlY29yZCwgdHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFByb21pc2UuYWxsKFtyZWNvcmQucmVhZCgpLCB0aGlzLnJlYWQoKV0pXG4gICAgICAudGhlbigoW3JlY29yZCwgZGF0YV0pID0+IHtcbiAgICAgICAgdmFyIHJlY29yZEluZGV4ID0gZGF0YS5maW5kSW5kZXgociA9PiBlcXVhbChyLCByZWNvcmQpKTtcbiAgICAgICAgcmV0dXJuIFtyZWNvcmRJbmRleCwgcmVjb3JkLCBkYXRhXTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW3JlY29yZEluZGV4LCByZWNvcmQsIGRhdGFdKSA9PiB7XG4gICAgICAgIHZhciBuZXdSZWNvcmQgPSB0cmFuc2Zvcm0uY2FsbChudWxsLCBPYmplY3QuYXNzaWduKHt9LCByZWNvcmQpKTtcbiAgICAgICAgZGF0YVtyZWNvcmRJbmRleF0gPSBuZXdSZWNvcmQ7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3UmVjb3JkLCByZWNvcmQsIHRoaXMud3JpdGUoZGF0YSldKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRlbGV0ZVJlY29yZChyZWNvcmQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUHJvbWlzZS5hbGwoW3JlY29yZC5yZWFkKCksIHRoaXMucmVhZCgpXSlcbiAgICAgIC50aGVuKChbcmVjb3JkLCBkYXRhXSkgPT4ge1xuICAgICAgICB2YXIgcmVjb3JkSW5kZXggPSBkYXRhLmZpbmRJbmRleChyID0+IGVxdWFsKHIsIHJlY29yZCkpO1xuICAgICAgICBkYXRhLnNwbGljZShyZWNvcmRJbmRleCwgMSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbcmVjb3JkLCB0aGlzLndyaXRlKGRhdGEpXSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbjtcbiJdfQ==