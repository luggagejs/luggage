'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var DummyBackendCollection = (function () {
  function DummyBackendCollection(name) {
    _classCallCheck(this, DummyBackendCollection);

    this.name = name;
  }

  _createClass(DummyBackendCollection, [{
    key: 'read',
    value: function read() {
      return new _Promise(function (reject, resolve) {
        resolve(['dummy']);
      });
    }
  }, {
    key: 'write',
    value: function write(data) {
      return new _Promise(function (reject, resolve) {
        resolve(data);
      });
    }
  }]);

  return DummyBackendCollection;
})();

var DummyBackend = (function () {
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
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9EdW1teUJhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTSxzQkFBc0I7QUFDZixXQURQLHNCQUFzQixDQUNkLElBQUksRUFBRTswQkFEZCxzQkFBc0I7O0FBRXhCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0dBQ2xCOztlQUhHLHNCQUFzQjs7V0FLdEIsZ0JBQUc7QUFDTCxhQUFPLGFBQVksVUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFLO0FBQ3RDLGVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7T0FDcEIsQ0FBQyxDQUFDO0tBQ0o7OztXQUVJLGVBQUMsSUFBSSxFQUFFO0FBQ1YsYUFBTyxhQUFZLFVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBSztBQUN0QyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDZixDQUFDLENBQUM7S0FDSjs7O1NBZkcsc0JBQXNCOzs7SUFrQnRCLFlBQVk7V0FBWixZQUFZOzBCQUFaLFlBQVk7OztlQUFaLFlBQVk7O1dBQ04sb0JBQUMsSUFBSSxFQUFFO0FBQ2YsYUFBTyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pDOzs7U0FIRyxZQUFZIiwiZmlsZSI6IkR1bW15QmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIER1bW15QmFja2VuZENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZWplY3QsIHJlc29sdmUpID0+IHtcbiAgICAgIHJlc29sdmUoWydkdW1teSddKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlKGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlamVjdCwgcmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBEdW1teUJhY2tlbmQge1xuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IER1bW15QmFja2VuZENvbGxlY3Rpb24obmFtZSk7XG4gIH1cbn1cbiJdfQ==