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

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94VjFCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIkRyb3Bib3hDb2xsZWN0aW9uIiwibmFtZSIsImJhY2tlbmQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlYWRGaWxlIiwiZmlsZU5hbWUiLCJlcnJvciIsImRhdGEiLCJzdGF0dXMiLCJEcm9wYm94IiwiQXBpRXJyb3IiLCJOT1RfRk9VTkQiLCJKU09OIiwicGFyc2UiLCJ3cml0ZUZpbGUiLCJzdHJpbmdpZnkiLCJEcm9wYm94VjFCYWNrZW5kIiwiY2xpZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOztBQUVBOzs7Ozs7OztJQUVNQSxpQjtBQUNKLDZCQUFZQyxJQUFaLEVBQWtCQyxPQUFsQixFQUEyQjtBQUFBOztBQUN6QixTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7OzsyQkFNTTtBQUFBOztBQUNMLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxjQUFLSCxPQUFMLENBQWFJLFFBQWIsQ0FBc0IsTUFBS0MsUUFBM0IsRUFBcUMsVUFBQ0MsS0FBRCxFQUFRQyxJQUFSLEVBQWlCO0FBQ3BELGNBQUlELEtBQUosRUFBVztBQUNULG9CQUFRQSxNQUFNRSxNQUFkO0FBQ0UsbUJBQUtDLFFBQVFDLFFBQVIsQ0FBaUJDLFNBQXRCO0FBQ0VULHdCQUFRLEVBQVI7QUFDQTtBQUNGO0FBQ0VDLHVCQUFPRyxLQUFQO0FBTEo7QUFPRCxXQVJELE1BUU87QUFDTEosb0JBQVFVLEtBQUtDLEtBQUwsQ0FBV04sSUFBWCxDQUFSO0FBQ0Q7QUFDRixTQVpEO0FBYUQsT0FkTSxDQUFQO0FBZUQ7Ozs0QkFFYztBQUFBOztBQUFBLFVBQVRBLElBQVMsdUVBQUosRUFBSTs7QUFDYixhQUFPLElBQUlOLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsZUFBS0gsT0FBTCxDQUFhYyxTQUFiLENBQXVCLE9BQUtULFFBQTVCLEVBQXNDTyxLQUFLRyxTQUFMLENBQWVSLElBQWYsQ0FBdEMsRUFBNEQsVUFBQ0QsS0FBRCxFQUFXO0FBQ3JFLGNBQUlBLEtBQUosRUFBVztBQUNUSCxtQkFBT0csS0FBUDtBQUNELFdBRkQsTUFFTztBQUNMSixvQkFBUUssSUFBUjtBQUNEO0FBQ0YsU0FORDtBQU9ELE9BUk0sQ0FBUDtBQVNEOzs7d0JBaENjO0FBQ2IsYUFBVSxLQUFLUixJQUFmO0FBQ0Q7Ozs7OztJQWlDR2lCLGdCO0FBQ0osNEJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDbEIsU0FBS0EsTUFBTCxHQUFjQSxNQUFkOztBQUVBLDRCQUFTLElBQVQsRUFBZSxVQUFmLEVBQTJCLEtBQUtBLE1BQWhDO0FBQ0EsNEJBQVMsSUFBVCxFQUFlLFdBQWYsRUFBNEIsS0FBS0EsTUFBakM7QUFDRDs7OzsrQkFFVWxCLEksRUFBTTtBQUNmLGFBQU8sSUFBSUQsaUJBQUosQ0FBc0JDLElBQXRCLEVBQTRCLElBQTVCLENBQVA7QUFDRDs7Ozs7O2tCQUdZaUIsZ0IiLCJmaWxlIjoiRHJvcGJveFYxQmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBEcm9wYm94ICovXG5cbmltcG9ydCBkZWxlZ2F0ZSBmcm9tIFwiLi4vbGliL2RlbGVnYXRlXCI7XG5cbmNsYXNzIERyb3Bib3hDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgYmFja2VuZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgfVxuXG4gIGdldCBmaWxlTmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS5qc29uYDtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2VuZC5yZWFkRmlsZSh0aGlzLmZpbGVOYW1lLCAoZXJyb3IsIGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgRHJvcGJveC5BcGlFcnJvci5OT1RfRk9VTkQ6XG4gICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShkYXRhKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgd3JpdGUoZGF0YT1bXSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmJhY2tlbmQud3JpdGVGaWxlKHRoaXMuZmlsZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCAoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBEcm9wYm94VjFCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IoY2xpZW50KSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG5cbiAgICBkZWxlZ2F0ZSh0aGlzLCBcInJlYWRGaWxlXCIsIHRoaXMuY2xpZW50KTtcbiAgICBkZWxlZ2F0ZSh0aGlzLCBcIndyaXRlRmlsZVwiLCB0aGlzLmNsaWVudCk7XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IERyb3Bib3hDb2xsZWN0aW9uKG5hbWUsIHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bib3hWMUJhY2tlbmQ7XG4iXX0=