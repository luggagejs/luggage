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
}();

var DropboxBackend = function () {
  function DropboxBackend(client) {
    _classCallCheck(this, DropboxBackend);

    this.client = client;

    (0, _delegate2.default)(this, "readFile", this.client);
    (0, _delegate2.default)(this, "writeFile", this.client);
  }

  _createClass(DropboxBackend, [{
    key: "collection",
    value: function collection(name) {
      return new DropboxCollection(name, this);
    }
  }]);

  return DropboxBackend;
}();

exports.default = DropboxBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSU07QUFDSixXQURJLGlCQUNKLENBQVksSUFBWixFQUFrQixPQUFsQixFQUEyQjswQkFEdkIsbUJBQ3VCOztBQUN6QixTQUFLLElBQUwsR0FBWSxJQUFaLENBRHlCO0FBRXpCLFNBQUssT0FBTCxHQUFlLE9BQWYsQ0FGeUI7R0FBM0I7O2VBREk7OzJCQVVHOzs7QUFDTCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsY0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixNQUFLLFFBQUwsRUFBZSxVQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWlCO0FBQ3BELGNBQUksS0FBSixFQUFXO0FBQ1Qsb0JBQVEsTUFBTSxNQUFOO0FBQ04sbUJBQUssUUFBUSxRQUFSLENBQWlCLFNBQWpCO0FBQ0gsd0JBQVEsRUFBUixFQURGO0FBRUUsc0JBRkY7QUFERjtBQUtJLHVCQUFPLEtBQVAsRUFERjtBQUpGLGFBRFM7V0FBWCxNQVFPO0FBQ0wsb0JBQVEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFSLEVBREs7V0FSUDtTQURtQyxDQUFyQyxDQURzQztPQUFyQixDQUFuQixDQURLOzs7OzRCQWtCUTs7O1VBQVQsNkRBQUssa0JBQUk7O0FBQ2IsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsT0FBSyxRQUFMLEVBQWUsS0FBSyxTQUFMLENBQWUsSUFBZixDQUF0QyxFQUE0RCxVQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWlCO0FBQzNFLGNBQUksS0FBSixFQUFXO0FBQ1QsbUJBQU8sS0FBUCxFQURTO1dBQVgsTUFFTztBQUNMLG9CQUFRLElBQVIsRUFESztXQUZQO1NBRDBELENBQTVELENBRHNDO09BQXJCLENBQW5CLENBRGE7Ozs7d0JBdEJBO0FBQ2IsYUFBVSxLQUFLLElBQUwsVUFBVixDQURhOzs7O1NBTlg7OztJQXlDQTtBQUNKLFdBREksY0FDSixDQUFZLE1BQVosRUFBb0I7MEJBRGhCLGdCQUNnQjs7QUFDbEIsU0FBSyxNQUFMLEdBQWMsTUFBZCxDQURrQjs7QUFHbEIsNEJBQVMsSUFBVCxFQUFlLFVBQWYsRUFBMkIsS0FBSyxNQUFMLENBQTNCLENBSGtCO0FBSWxCLDRCQUFTLElBQVQsRUFBZSxXQUFmLEVBQTRCLEtBQUssTUFBTCxDQUE1QixDQUprQjtHQUFwQjs7ZUFESTs7K0JBUU8sTUFBTTtBQUNmLGFBQU8sSUFBSSxpQkFBSixDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUFQLENBRGU7Ozs7U0FSYjs7O2tCQWFTIiwiZmlsZSI6IkRyb3Bib3hCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIERyb3Bib3ggKi9cblxuaW1wb3J0IGRlbGVnYXRlIGZyb20gXCIuLi9saWIvZGVsZWdhdGVcIjtcblxuY2xhc3MgRHJvcGJveENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmJhY2tlbmQgPSBiYWNrZW5kO1xuICB9XG5cbiAgZ2V0IGZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5iYWNrZW5kLnJlYWRGaWxlKHRoaXMuZmlsZU5hbWUsIChlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSBEcm9wYm94LkFwaUVycm9yLk5PVF9GT1VORDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGRhdGEpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2VuZC53cml0ZUZpbGUodGhpcy5maWxlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIChlcnJvciwgc3RhdCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIERyb3Bib3hCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IoY2xpZW50KSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG5cbiAgICBkZWxlZ2F0ZSh0aGlzLCBcInJlYWRGaWxlXCIsIHRoaXMuY2xpZW50KTtcbiAgICBkZWxlZ2F0ZSh0aGlzLCBcIndyaXRlRmlsZVwiLCB0aGlzLmNsaWVudCk7XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IERyb3Bib3hDb2xsZWN0aW9uKG5hbWUsIHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bib3hCYWNrZW5kO1xuIl19