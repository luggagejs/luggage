/* global Dropbox */

"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _libDelegate = require("../lib/delegate");

var _libDelegate2 = _interopRequireDefault(_libDelegate);

var DropboxCollection = (function () {
  function DropboxCollection(name, backend) {
    _classCallCheck(this, DropboxCollection);

    this.name = name;
    this.backend = backend;
  }

  _createClass(DropboxCollection, [{
    key: "read",
    value: function read() {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        _this.backend.readFile(_this.fileName, function (error, data) {
          if (error) {
            switch (error.status) {
              case Dropbox.ApiError.NOT_FOUND:
                resolve([]);
                break;
              default:
                reject(error);
            }
          } else {
            resolve(JSON.parse(data));
          }
        });
      });
    }
  }, {
    key: "write",
    value: function write() {
      var _this2 = this;

      var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      return new _Promise(function (resolve, reject) {
        _this2.backend.writeFile(_this2.fileName, JSON.stringify(data), function (error, stat) {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    }
  }, {
    key: "fileName",
    get: function get() {
      return this.name + ".json";
    }
  }]);

  return DropboxCollection;
})();

var DropboxBackend = (function () {
  function DropboxBackend(client) {
    _classCallCheck(this, DropboxBackend);

    this.client = client;

    (0, _libDelegate2["default"])(this, "readFile", this.client);
    (0, _libDelegate2["default"])(this, "writeFile", this.client);
  }

  _createClass(DropboxBackend, [{
    key: "collection",
    value: function collection(name) {
      return new DropboxCollection(name, this);
    }
  }]);

  return DropboxBackend;
})();

exports["default"] = DropboxBackend;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUVxQixpQkFBaUI7Ozs7SUFFaEMsaUJBQWlCO0FBQ1YsV0FEUCxpQkFBaUIsQ0FDVCxJQUFJLEVBQUUsT0FBTyxFQUFFOzBCQUR2QixpQkFBaUI7O0FBRW5CLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0dBQ3hCOztlQUpHLGlCQUFpQjs7V0FVakIsZ0JBQUc7OztBQUNMLGFBQU8sYUFBWSxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDdEMsY0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQUssUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBSztBQUNwRCxjQUFJLEtBQUssRUFBRTtBQUNULG9CQUFRLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLG1CQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUztBQUM3Qix1QkFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ1osc0JBQU07QUFBQSxBQUNSO0FBQ0Usc0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUFBLGFBQ2pCO1dBQ0YsTUFBTTtBQUNMLG1CQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1dBQzNCO1NBQ0YsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0o7OztXQUVJLGlCQUFVOzs7VUFBVCxJQUFJLHlEQUFDLEVBQUU7O0FBQ1gsYUFBTyxhQUFZLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxlQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBSyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUs7QUFDM0UsY0FBSSxLQUFLLEVBQUU7QUFDVCxrQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1dBQ2YsTUFBTTtBQUNMLG1CQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDZjtTQUNGLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQztLQUNKOzs7U0FoQ1csZUFBRztBQUNiLGFBQVUsSUFBSSxDQUFDLElBQUksV0FBUTtLQUM1Qjs7O1NBUkcsaUJBQWlCOzs7SUF5Q2pCLGNBQWM7QUFDUCxXQURQLGNBQWMsQ0FDTixNQUFNLEVBQUU7MEJBRGhCLGNBQWM7O0FBRWhCLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixrQ0FBUyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxrQ0FBUyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUMxQzs7ZUFORyxjQUFjOztXQVFSLG9CQUFDLElBQUksRUFBRTtBQUNmLGFBQU8sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDMUM7OztTQVZHLGNBQWM7OztxQkFhTCxjQUFjIiwiZmlsZSI6IkRyb3Bib3hCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIERyb3Bib3ggKi9cblxuaW1wb3J0IGRlbGVnYXRlIGZyb20gXCIuLi9saWIvZGVsZWdhdGVcIjtcblxuY2xhc3MgRHJvcGJveENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmJhY2tlbmQgPSBiYWNrZW5kO1xuICB9XG5cbiAgZ2V0IGZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5iYWNrZW5kLnJlYWRGaWxlKHRoaXMuZmlsZU5hbWUsIChlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSBEcm9wYm94LkFwaUVycm9yLk5PVF9GT1VORDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGRhdGEpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2VuZC53cml0ZUZpbGUodGhpcy5maWxlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIChlcnJvciwgc3RhdCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIERyb3Bib3hCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IoY2xpZW50KSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG5cbiAgICBkZWxlZ2F0ZSh0aGlzLCBcInJlYWRGaWxlXCIsIHRoaXMuY2xpZW50KTtcbiAgICBkZWxlZ2F0ZSh0aGlzLCBcIndyaXRlRmlsZVwiLCB0aGlzLmNsaWVudCk7XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IERyb3Bib3hDb2xsZWN0aW9uKG5hbWUsIHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bib3hCYWNrZW5kO1xuIl19