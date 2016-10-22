"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DummyBackendCollection = function () {
  function DummyBackendCollection(data) {
    _classCallCheck(this, DummyBackendCollection);

    this.data = data;
  }

  _createClass(DummyBackendCollection, [{
    key: "read",
    value: function read() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        resolve(_this.data);
      });
    }
  }, {
    key: "write",
    value: function write(data) {
      return new Promise(function (resolve, reject) {
        resolve(data);
      });
    }
  }]);

  return DummyBackendCollection;
}();

var DummyBackend = function () {
  function DummyBackend(name, data) {
    _classCallCheck(this, DummyBackend);

    this.collections = _defineProperty({}, name, new DummyBackendCollection(data));
  }

  _createClass(DummyBackend, [{
    key: "collection",
    value: function collection(name) {
      return this.collections.hasOwnProperty(name) ? this.collections[name] : new DummyBackendCollection([]);
    }
  }]);

  return DummyBackend;
}();

exports.default = DummyBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9EdW1teUJhY2tlbmQuanMiXSwibmFtZXMiOlsiRHVtbXlCYWNrZW5kQ29sbGVjdGlvbiIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkR1bW15QmFja2VuZCIsIm5hbWUiLCJjb2xsZWN0aW9ucyIsImhhc093blByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBTUEsc0I7QUFDSixrQ0FBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDRDs7OzsyQkFFTTtBQUFBOztBQUNMLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0QsZ0JBQVEsTUFBS0YsSUFBYjtBQUNELE9BRk0sQ0FBUDtBQUdEOzs7MEJBRUtBLEksRUFBTTtBQUNWLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0QsZ0JBQVFGLElBQVI7QUFDRCxPQUZNLENBQVA7QUFHRDs7Ozs7O0lBR2tCSSxZO0FBQ25CLHdCQUFZQyxJQUFaLEVBQWtCTCxJQUFsQixFQUF3QjtBQUFBOztBQUN0QixTQUFLTSxXQUFMLHVCQUNHRCxJQURILEVBQ1UsSUFBSU4sc0JBQUosQ0FBMkJDLElBQTNCLENBRFY7QUFHRDs7OzsrQkFFVUssSSxFQUFNO0FBQ2YsYUFBTyxLQUFLQyxXQUFMLENBQWlCQyxjQUFqQixDQUFnQ0YsSUFBaEMsSUFDTCxLQUFLQyxXQUFMLENBQWlCRCxJQUFqQixDQURLLEdBQ29CLElBQUlOLHNCQUFKLENBQTJCLEVBQTNCLENBRDNCO0FBRUQ7Ozs7OztrQkFWa0JLLFkiLCJmaWxlIjoiRHVtbXlCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRHVtbXlCYWNrZW5kQ29sbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzb2x2ZSh0aGlzLmRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgd3JpdGUoZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER1bW15QmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRhdGEpIHtcbiAgICB0aGlzLmNvbGxlY3Rpb25zID0ge1xuICAgICAgW25hbWVdOiBuZXcgRHVtbXlCYWNrZW5kQ29sbGVjdGlvbihkYXRhKVxuICAgIH07XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/XG4gICAgICB0aGlzLmNvbGxlY3Rpb25zW25hbWVdIDogbmV3IER1bW15QmFja2VuZENvbGxlY3Rpb24oW10pO1xuICB9XG59XG4iXX0=