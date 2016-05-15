"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global Dropbox */

var _delegate = require("../lib/delegate");

var _delegate2 = _interopRequireDefault(_delegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropboxCollection = function () {
  function DropboxCollection(name, backend) {
    _classCallCheck(this, DropboxCollection);

    this.name = name;
    this.backend = backend;
  }

  _createClass(DropboxCollection, [{
    key: "read",
    value: function read() {
      var _this = this;

      return new Promise(function (resolve, reject) {
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

      return new Promise(function (resolve, reject) {
        _this2.backend.writeFile(_this2.fileName, JSON.stringify(data), function (error) {
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
}();

var DropboxV1Backend = function () {
  function DropboxV1Backend(client) {
    _classCallCheck(this, DropboxV1Backend);

    this.client = client;

    (0, _delegate2.default)(this, "readFile", this.client);
    (0, _delegate2.default)(this, "writeFile", this.client);
  }

  _createClass(DropboxV1Backend, [{
    key: "collection",
    value: function collection(name) {
      return new DropboxCollection(name, this);
    }
  }]);

  return DropboxV1Backend;
}();

exports.default = DropboxV1Backend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94VjFCYWNrZW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRU0saUI7QUFDSiw2QkFBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3pCLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7Ozs7MkJBTU07QUFBQTs7QUFDTCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsY0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixNQUFLLFFBQTNCLEVBQXFDLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDcEQsY0FBSSxLQUFKLEVBQVc7QUFDVCxvQkFBUSxNQUFNLE1BQWQ7QUFDRSxtQkFBSyxRQUFRLFFBQVIsQ0FBaUIsU0FBdEI7QUFDRSx3QkFBUSxFQUFSO0FBQ0E7QUFDRjtBQUNFLHVCQUFPLEtBQVA7QUFMSjtBQU9ELFdBUkQsTUFRTztBQUNMLG9CQUFRLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBUjtBQUNEO0FBQ0YsU0FaRDtBQWFELE9BZE0sQ0FBUDtBQWVEOzs7NEJBRWM7QUFBQTs7QUFBQSxVQUFULElBQVMseURBQUosRUFBSTs7QUFDYixhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixPQUFLLFFBQTVCLEVBQXNDLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBdEMsRUFBNEQsVUFBQyxLQUFELEVBQVc7QUFDckUsY0FBSSxLQUFKLEVBQVc7QUFDVCxtQkFBTyxLQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsb0JBQVEsSUFBUjtBQUNEO0FBQ0YsU0FORDtBQU9ELE9BUk0sQ0FBUDtBQVNEOzs7d0JBaENjO0FBQ2IsYUFBVSxLQUFLLElBQWY7QUFDRDs7Ozs7O0lBaUNHLGdCO0FBQ0osNEJBQVksTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBLDRCQUFTLElBQVQsRUFBZSxVQUFmLEVBQTJCLEtBQUssTUFBaEM7QUFDQSw0QkFBUyxJQUFULEVBQWUsV0FBZixFQUE0QixLQUFLLE1BQWpDO0FBQ0Q7Ozs7K0JBRVUsSSxFQUFNO0FBQ2YsYUFBTyxJQUFJLGlCQUFKLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLENBQVA7QUFDRDs7Ozs7O2tCQUdZLGdCIiwiZmlsZSI6IkRyb3Bib3hWMUJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgRHJvcGJveCAqL1xuXG5pbXBvcnQgZGVsZWdhdGUgZnJvbSBcIi4uL2xpYi9kZWxlZ2F0ZVwiO1xuXG5jbGFzcyBEcm9wYm94Q29sbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGJhY2tlbmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYmFja2VuZCA9IGJhY2tlbmQ7XG4gIH1cblxuICBnZXQgZmlsZU5hbWUoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMubmFtZX0uanNvbmA7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmJhY2tlbmQucmVhZEZpbGUodGhpcy5maWxlTmFtZSwgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIERyb3Bib3guQXBpRXJyb3IuTk9UX0ZPVU5EOlxuICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoZGF0YSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlKGRhdGE9W10pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5iYWNrZW5kLndyaXRlRmlsZSh0aGlzLmZpbGVOYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgRHJvcGJveFYxQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCkge1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuXG4gICAgZGVsZWdhdGUodGhpcywgXCJyZWFkRmlsZVwiLCB0aGlzLmNsaWVudCk7XG4gICAgZGVsZWdhdGUodGhpcywgXCJ3cml0ZUZpbGVcIiwgdGhpcy5jbGllbnQpO1xuICB9XG5cbiAgY29sbGVjdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBEcm9wYm94Q29sbGVjdGlvbihuYW1lLCB0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcm9wYm94VjFCYWNrZW5kO1xuIl19