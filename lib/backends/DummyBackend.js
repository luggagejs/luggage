"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DummyBackendCollection = function () {
  function DummyBackendCollection(name) {
    _classCallCheck(this, DummyBackendCollection);

    this.name = name;
  }

  _createClass(DummyBackendCollection, [{
    key: "read",
    value: function read() {
      return new Promise(function (reject, resolve) {
        resolve(["dummy"]);
      });
    }
  }, {
    key: "write",
    value: function write(data) {
      return new Promise(function (reject, resolve) {
        resolve(data);
      });
    }
  }]);

  return DummyBackendCollection;
}();

var DummyBackend = function () {
  function DummyBackend() {
    _classCallCheck(this, DummyBackend);
  }

  _createClass(DummyBackend, [{
    key: "collection",
    value: function collection(name) {
      return new DummyBackendCollection(name);
    }
  }]);

  return DummyBackend;
}();

exports.default = DummyBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9EdW1teUJhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNO0FBQ0osV0FESSxzQkFDSixDQUFZLElBQVosRUFBa0I7MEJBRGQsd0JBQ2M7O0FBQ2hCLFNBQUssSUFBTCxHQUFZLElBQVosQ0FEZ0I7R0FBbEI7O2VBREk7OzJCQUtHO0FBQ0wsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE1BQUQsRUFBUyxPQUFULEVBQXFCO0FBQ3RDLGdCQUFRLENBQUMsT0FBRCxDQUFSLEVBRHNDO09BQXJCLENBQW5CLENBREs7Ozs7MEJBTUQsTUFBTTtBQUNWLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxNQUFELEVBQVMsT0FBVCxFQUFxQjtBQUN0QyxnQkFBUSxJQUFSLEVBRHNDO09BQXJCLENBQW5CLENBRFU7Ozs7U0FYUjs7O0lBa0JlOzs7Ozs7OytCQUNSLE1BQU07QUFDZixhQUFPLElBQUksc0JBQUosQ0FBMkIsSUFBM0IsQ0FBUCxDQURlOzs7O1NBREUiLCJmaWxlIjoiRHVtbXlCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRHVtbXlCYWNrZW5kQ29sbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlamVjdCwgcmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZShbXCJkdW1teVwiXSk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZWplY3QsIHJlc29sdmUpID0+IHtcbiAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHVtbXlCYWNrZW5kIHtcbiAgY29sbGVjdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBEdW1teUJhY2tlbmRDb2xsZWN0aW9uKG5hbWUpO1xuICB9XG59XG4iXX0=