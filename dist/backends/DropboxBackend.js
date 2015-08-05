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
          switch (error) {
            case undefined:
            case null:
              resolve(JSON.parse(data));
              break;
            case Dropbox.ApiError.NOT_FOUND:
              resolve([]);
              break;
            default:
              reject(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUVxQixpQkFBaUI7Ozs7SUFFaEMsaUJBQWlCO0FBQ1YsV0FEUCxpQkFBaUIsQ0FDVCxJQUFJLEVBQUUsT0FBTyxFQUFFOzBCQUR2QixpQkFBaUI7O0FBRW5CLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0dBQ3hCOztlQUpHLGlCQUFpQjs7V0FVakIsZ0JBQUc7OztBQUNMLGFBQU8sYUFBWSxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDdEMsY0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQUssUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBSztBQUNwRCxrQkFBUSxLQUFLO0FBQ1gsaUJBQUssU0FBUyxDQUFDO0FBQ2YsaUJBQUssSUFBSTtBQUNQLHFCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzFCLG9CQUFNO0FBQUEsQUFDUixpQkFBSyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVM7QUFDN0IscUJBQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNaLG9CQUFNO0FBQUEsQUFDUjtBQUNFLG9CQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFBQSxXQUNqQjtTQUNGLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQztLQUNKOzs7V0FFSSxpQkFBVTs7O1VBQVQsSUFBSSx5REFBQyxFQUFFOztBQUNYLGFBQU8sYUFBWSxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDdEMsZUFBSyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQUssUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQzNFLGNBQUksS0FBSyxFQUFFO0FBQ1Qsa0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUNmLE1BQU07QUFDTCxtQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQ2Y7U0FDRixDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7S0FDSjs7O1NBaENXLGVBQUc7QUFDYixhQUFVLElBQUksQ0FBQyxJQUFJLFdBQVE7S0FDNUI7OztTQVJHLGlCQUFpQjs7O0lBeUNqQixjQUFjO0FBQ1AsV0FEUCxjQUFjLENBQ04sTUFBTSxFQUFFOzBCQURoQixjQUFjOztBQUVoQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsa0NBQVMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsa0NBQVMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDMUM7O2VBTkcsY0FBYzs7V0FRUixvQkFBQyxJQUFJLEVBQUU7QUFDZixhQUFPLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzFDOzs7U0FWRyxjQUFjOzs7cUJBYUwsY0FBYyIsImZpbGUiOiJEcm9wYm94QmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBEcm9wYm94ICovXG5cbmltcG9ydCBkZWxlZ2F0ZSBmcm9tIFwiLi4vbGliL2RlbGVnYXRlXCI7XG5cbmNsYXNzIERyb3Bib3hDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgYmFja2VuZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgfVxuXG4gIGdldCBmaWxlTmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS5qc29uYDtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2VuZC5yZWFkRmlsZSh0aGlzLmZpbGVOYW1lLCAoZXJyb3IsIGRhdGEpID0+IHtcbiAgICAgICAgc3dpdGNoIChlcnJvcikge1xuICAgICAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShkYXRhKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIERyb3Bib3guQXBpRXJyb3IuTk9UX0ZPVU5EOlxuICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2VuZC53cml0ZUZpbGUodGhpcy5maWxlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIChlcnJvciwgc3RhdCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIERyb3Bib3hCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IoY2xpZW50KSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG5cbiAgICBkZWxlZ2F0ZSh0aGlzLCBcInJlYWRGaWxlXCIsIHRoaXMuY2xpZW50KTtcbiAgICBkZWxlZ2F0ZSh0aGlzLCBcIndyaXRlRmlsZVwiLCB0aGlzLmNsaWVudCk7XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IERyb3Bib3hDb2xsZWN0aW9uKG5hbWUsIHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bib3hCYWNrZW5kO1xuIl19