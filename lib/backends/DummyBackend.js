'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DummyBackendCollection = function () {
  function DummyBackendCollection(name) {
    _classCallCheck(this, DummyBackendCollection);

    this.name = name;
  }

  _createClass(DummyBackendCollection, [{
    key: 'read',
    value: function read() {
      return new Promise(function (reject, resolve) {
        resolve(['dummy']);
      });
    }
  }, {
    key: 'write',
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
    key: 'collection',
    value: function collection(name) {
      return new DummyBackendCollection(name);
    }
  }]);

  return DummyBackend;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9EdW1teUJhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU07QUFDSixXQURJLHNCQUNKLENBQVksSUFBWixFQUFrQjswQkFEZCx3QkFDYzs7QUFDaEIsU0FBSyxJQUFMLEdBQVksSUFBWixDQURnQjtHQUFsQjs7ZUFESTs7MkJBS0c7QUFDTCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsTUFBRCxFQUFTLE9BQVQsRUFBcUI7QUFDdEMsZ0JBQVEsQ0FBQyxPQUFELENBQVIsRUFEc0M7T0FBckIsQ0FBbkIsQ0FESzs7OzswQkFNRCxNQUFNO0FBQ1YsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE1BQUQsRUFBUyxPQUFULEVBQXFCO0FBQ3RDLGdCQUFRLElBQVIsRUFEc0M7T0FBckIsQ0FBbkIsQ0FEVTs7OztTQVhSOzs7SUFrQkE7Ozs7Ozs7K0JBQ08sTUFBTTtBQUNmLGFBQU8sSUFBSSxzQkFBSixDQUEyQixJQUEzQixDQUFQLENBRGU7Ozs7U0FEYiIsImZpbGUiOiJEdW1teUJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEdW1teUJhY2tlbmRDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVqZWN0LCByZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKFsnZHVtbXknXSk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZWplY3QsIHJlc29sdmUpID0+IHtcbiAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgRHVtbXlCYWNrZW5kIHtcbiAgY29sbGVjdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBEdW1teUJhY2tlbmRDb2xsZWN0aW9uKG5hbWUpO1xuICB9XG59XG4iXX0=