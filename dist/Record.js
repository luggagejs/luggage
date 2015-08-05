"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require("events");

var _constantsEvents = require("./constants/events");

var _libCompose = require("./lib/compose");

var _libCompose2 = _interopRequireDefault(_libCompose);

function wrapTransform(transform) {
  if (typeof transform === "function") {
    return transform;
  }

  return function (record) {
    return _Object$assign({}, record, transform);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWNvcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQTJCLFFBQVE7OytCQUNWLG9CQUFvQjs7MEJBQ3pCLGVBQWU7Ozs7QUFFbkMsU0FBUyxhQUFhLENBQUMsU0FBUyxFQUFFO0FBQ2hDLE1BQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQ25DLFdBQU8sU0FBUyxDQUFDO0dBQ2xCOztBQUVELFNBQU8sVUFBQyxNQUFNLEVBQUs7QUFDakIsV0FBTyxlQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDN0MsQ0FBQztDQUNIOztJQUdLLE1BQU07QUFDQyxXQURQLE1BQU0sQ0FDRSxVQUFVLEVBQUU7OztBQUN0QixRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixRQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsa0JBakJkLFVBQVUsRUFpQmlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7R0FDN0Q7O2VBSkcsTUFBTTs7V0FNTixnQkFBRztBQUNMLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDM0MsZUFBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDaEIsQ0FBQyxDQUFDO0tBQ0o7OztXQUVLLGdCQUFDLFNBQVMsRUFBRTtBQUNoQixhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUNyRTs7O1dBRUssbUJBQUc7QUFDUCxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNDOzs7V0FFVSxxQkFBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxDQUFDLElBQUksa0JBbkNMLFVBQVUsRUFtQ1EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEM7OztnQkF0QkcsTUFBTTtBQUFOLFFBQU0sR0FEWCw2QkFBUSxRQWRELFlBQVksQ0FjRSxTQUFTLENBQUMsQ0FDMUIsTUFBTSxLQUFOLE1BQU07U0FBTixNQUFNOzs7cUJBeUJHLE1BQU0iLCJmaWxlIjoiUmVjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7REFUQV9FVkVOVH0gZnJvbSBcIi4vY29uc3RhbnRzL2V2ZW50c1wiO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSBcIi4vbGliL2NvbXBvc2VcIjtcblxuZnVuY3Rpb24gd3JhcFRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgaWYgKHR5cGVvZiB0cmFuc2Zvcm0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB0cmFuc2Zvcm07XG4gIH1cblxuICByZXR1cm4gKHJlY29yZCkgPT4ge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWNvcmQsIHRyYW5zZm9ybSk7XG4gIH07XG59XG5cbkBjb21wb3NlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpXG5jbGFzcyBSZWNvcmQge1xuICBjb25zdHJ1Y3Rvcihjb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbiAgICB0aGlzLmNvbGxlY3Rpb24ub24oREFUQV9FVkVOVCwgdGhpcy5kYXRhQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5yZWFkKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGRhdGFbMF07XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUodHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi51cGRhdGVSZWNvcmQodGhpcywgd3JhcFRyYW5zZm9ybSh0cmFuc2Zvcm0pKTtcbiAgfVxuXG4gIGRlbGV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmRlbGV0ZVJlY29yZCh0aGlzKTtcbiAgfVxuXG4gIGRhdGFDaGFuZ2VkKGRhdGEpIHtcbiAgICB0aGlzLmVtaXQoREFUQV9FVkVOVCwgZGF0YVswXSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjb3JkO1xuIl19