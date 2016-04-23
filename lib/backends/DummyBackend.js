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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9EdW1teUJhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLHNCO0FBQ0osa0NBQVksSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7Ozs7MkJBRU07QUFDTCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsTUFBRCxFQUFTLE9BQVQsRUFBcUI7QUFDdEMsZ0JBQVEsQ0FBQyxPQUFELENBQVI7QUFDRCxPQUZNLENBQVA7QUFHRDs7OzBCQUVLLEksRUFBTTtBQUNWLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxNQUFELEVBQVMsT0FBVCxFQUFxQjtBQUN0QyxnQkFBUSxJQUFSO0FBQ0QsT0FGTSxDQUFQO0FBR0Q7Ozs7OztJQUdrQixZOzs7Ozs7OytCQUNSLEksRUFBTTtBQUNmLGFBQU8sSUFBSSxzQkFBSixDQUEyQixJQUEzQixDQUFQO0FBQ0Q7Ozs7OztrQkFIa0IsWSIsImZpbGUiOiJEdW1teUJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEdW1teUJhY2tlbmRDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVqZWN0LCByZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKFtcImR1bW15XCJdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlKGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlamVjdCwgcmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEdW1teUJhY2tlbmQge1xuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IER1bW15QmFja2VuZENvbGxlY3Rpb24obmFtZSk7XG4gIH1cbn1cbiJdfQ==