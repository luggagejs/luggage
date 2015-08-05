'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DummyBackendCollection = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9EdW1teUJhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU0sc0JBQXNCO0FBQ2YsV0FEUCxzQkFBc0IsQ0FDZCxJQUFJLEVBQUU7MEJBRGQsc0JBQXNCOztBQUV4QixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztHQUNsQjs7ZUFIRyxzQkFBc0I7O1dBS3RCLGdCQUFHO0FBQ0wsYUFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUs7QUFDdEMsZUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztPQUNwQixDQUFDLENBQUM7S0FDSjs7O1dBRUksZUFBQyxJQUFJLEVBQUU7QUFDVixhQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBSztBQUN0QyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDZixDQUFDLENBQUM7S0FDSjs7O1NBZkcsc0JBQXNCOzs7SUFrQnRCLFlBQVk7V0FBWixZQUFZOzBCQUFaLFlBQVk7OztlQUFaLFlBQVk7O1dBQ04sb0JBQUMsSUFBSSxFQUFFO0FBQ2YsYUFBTyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pDOzs7U0FIRyxZQUFZIiwiZmlsZSI6IkR1bW15QmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIER1bW15QmFja2VuZENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZWplY3QsIHJlc29sdmUpID0+IHtcbiAgICAgIHJlc29sdmUoWydkdW1teSddKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlKGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlamVjdCwgcmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBEdW1teUJhY2tlbmQge1xuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IER1bW15QmFja2VuZENvbGxlY3Rpb24obmFtZSk7XG4gIH1cbn1cbiJdfQ==