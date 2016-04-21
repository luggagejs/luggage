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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94VjFCYWNrZW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJTTtBQUNKLFdBREksaUJBQ0osQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCOzBCQUR2QixtQkFDdUI7O0FBQ3pCLFNBQUssSUFBTCxHQUFZLElBQVosQ0FEeUI7QUFFekIsU0FBSyxPQUFMLEdBQWUsT0FBZixDQUZ5QjtHQUEzQjs7ZUFESTs7MkJBVUc7OztBQUNMLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxjQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLE1BQUssUUFBTCxFQUFlLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDcEQsY0FBSSxLQUFKLEVBQVc7QUFDVCxvQkFBUSxNQUFNLE1BQU47QUFDTixtQkFBSyxRQUFRLFFBQVIsQ0FBaUIsU0FBakI7QUFDSCx3QkFBUSxFQUFSLEVBREY7QUFFRSxzQkFGRjtBQURGO0FBS0ksdUJBQU8sS0FBUCxFQURGO0FBSkYsYUFEUztXQUFYLE1BUU87QUFDTCxvQkFBUSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQVIsRUFESztXQVJQO1NBRG1DLENBQXJDLENBRHNDO09BQXJCLENBQW5CLENBREs7Ozs7NEJBa0JROzs7VUFBVCw2REFBSyxrQkFBSTs7QUFDYixhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixPQUFLLFFBQUwsRUFBZSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQXRDLEVBQTRELFVBQUMsS0FBRCxFQUFXO0FBQ3JFLGNBQUksS0FBSixFQUFXO0FBQ1QsbUJBQU8sS0FBUCxFQURTO1dBQVgsTUFFTztBQUNMLG9CQUFRLElBQVIsRUFESztXQUZQO1NBRDBELENBQTVELENBRHNDO09BQXJCLENBQW5CLENBRGE7Ozs7d0JBdEJBO0FBQ2IsYUFBVSxLQUFLLElBQUwsVUFBVixDQURhOzs7O1NBTlg7OztJQXlDQTtBQUNKLFdBREksZ0JBQ0osQ0FBWSxNQUFaLEVBQW9COzBCQURoQixrQkFDZ0I7O0FBQ2xCLFNBQUssTUFBTCxHQUFjLE1BQWQsQ0FEa0I7O0FBR2xCLDRCQUFTLElBQVQsRUFBZSxVQUFmLEVBQTJCLEtBQUssTUFBTCxDQUEzQixDQUhrQjtBQUlsQiw0QkFBUyxJQUFULEVBQWUsV0FBZixFQUE0QixLQUFLLE1BQUwsQ0FBNUIsQ0FKa0I7R0FBcEI7O2VBREk7OytCQVFPLE1BQU07QUFDZixhQUFPLElBQUksaUJBQUosQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBUCxDQURlOzs7O1NBUmI7OztrQkFhUyIsImZpbGUiOiJEcm9wYm94VjFCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIERyb3Bib3ggKi9cblxuaW1wb3J0IGRlbGVnYXRlIGZyb20gXCIuLi9saWIvZGVsZWdhdGVcIjtcblxuY2xhc3MgRHJvcGJveENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmJhY2tlbmQgPSBiYWNrZW5kO1xuICB9XG5cbiAgZ2V0IGZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5iYWNrZW5kLnJlYWRGaWxlKHRoaXMuZmlsZU5hbWUsIChlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSBEcm9wYm94LkFwaUVycm9yLk5PVF9GT1VORDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGRhdGEpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuYmFja2VuZC53cml0ZUZpbGUodGhpcy5maWxlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIERyb3Bib3hWMUJhY2tlbmQge1xuICBjb25zdHJ1Y3RvcihjbGllbnQpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcblxuICAgIGRlbGVnYXRlKHRoaXMsIFwicmVhZEZpbGVcIiwgdGhpcy5jbGllbnQpO1xuICAgIGRlbGVnYXRlKHRoaXMsIFwid3JpdGVGaWxlXCIsIHRoaXMuY2xpZW50KTtcbiAgfVxuXG4gIGNvbGxlY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgRHJvcGJveENvbGxlY3Rpb24obmFtZSwgdGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcGJveFYxQmFja2VuZDtcbiJdfQ==