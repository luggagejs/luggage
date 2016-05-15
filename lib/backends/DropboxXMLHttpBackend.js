"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var downloadApiPath = "https://content.dropboxapi.com/2/files/download";
var uploadApiPath = "https://content.dropboxapi.com/2/files/upload";

var DropboxCollection = function () {
  function DropboxCollection(name, backend) {
    _classCallCheck(this, DropboxCollection);

    this.name = name;
    this.token = backend.token;
  }

  _createClass(DropboxCollection, [{
    key: "read",
    value: function read() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function () {
          var data = JSON.parse(request.responseText);

          if (data.error) {
            if (data.error[".tag"] === "path") {
              resolve([]);
            } else {
              reject(data.error);
            }
          } else {
            resolve(data);
          }
        };

        request.ontimeout = function () {
          reject(request.responseText);
        };
        request.onerror = function () {
          reject(request.responseText);
        };
        request.open("POST", downloadApiPath);
        request.setRequestHeader("Authorization", "Bearer " + _this.token);
        request.setRequestHeader("Dropbox-API-Arg", JSON.stringify({ path: "/" + _this.fileName }));
        request.send();
      });
    }
  }, {
    key: "write",
    value: function write() {
      var _this2 = this;

      var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function () {
          var response = request.responseText;
          if (response.error) {
            reject(response.error);
          } else {
            resolve(data);
          }
        };

        request.ontimeout = function () {
          reject(request.responseText);
        };
        request.onerror = function () {
          reject(request.responseText);
        };
        request.open("POST", uploadApiPath);
        request.setRequestHeader("Authorization", "Bearer " + _this2.token);
        request.setRequestHeader("Dropbox-API-Arg", JSON.stringify({ path: "/" + _this2.fileName }));
        request.setRequestHeader("Content-Type", "text/plain; charset=dropbox-cors-hack");
        request.send(JSON.stringify(data));
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
  function DropboxBackend(token) {
    _classCallCheck(this, DropboxBackend);

    this.token = token;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94WE1MSHR0cEJhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU0sa0JBQWtCLGlEQUF4QjtBQUNBLElBQU0sZ0JBQWdCLCtDQUF0Qjs7SUFFTSxpQjtBQUNKLDZCQUFZLElBQVosRUFBa0IsT0FBbEIsRUFBMkI7QUFBQTs7QUFDekIsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBckI7QUFDRDs7OzsyQkFNTTtBQUFBOztBQUNMLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxZQUFJLFVBQVUsSUFBSSxjQUFKLEVBQWQ7O0FBRUEsZ0JBQVEsTUFBUixHQUFpQixZQUFNO0FBQ3JCLGNBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxRQUFRLFlBQW5CLENBQWI7O0FBRUEsY0FBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLE1BQXVCLE1BQTNCLEVBQW1DO0FBQ2pDLHNCQUFRLEVBQVI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxLQUFLLEtBQVo7QUFDRDtBQUNGLFdBTkQsTUFNTztBQUNMLG9CQUFRLElBQVI7QUFDRDtBQUNGLFNBWkQ7O0FBY0EsZ0JBQVEsU0FBUixHQUFvQixZQUFNO0FBQ3hCLGlCQUFPLFFBQVEsWUFBZjtBQUNELFNBRkQ7QUFHQSxnQkFBUSxPQUFSLEdBQWtCLFlBQU07QUFDdEIsaUJBQU8sUUFBUSxZQUFmO0FBQ0QsU0FGRDtBQUdBLGdCQUFRLElBQVIsQ0FBYSxNQUFiLEVBQXFCLGVBQXJCO0FBQ0EsZ0JBQVEsZ0JBQVIsQ0FBeUIsZUFBekIsY0FBb0QsTUFBSyxLQUF6RDtBQUNBLGdCQUFRLGdCQUFSLENBQXlCLGlCQUF6QixFQUE0QyxLQUFLLFNBQUwsQ0FBZSxFQUFFLE1BQU0sTUFBSSxNQUFLLFFBQWpCLEVBQWYsQ0FBNUM7QUFDQSxnQkFBUSxJQUFSO0FBQ0QsT0EzQk0sQ0FBUDtBQTRCRDs7OzRCQUVjO0FBQUE7O0FBQUEsVUFBVCxJQUFTLHlEQUFKLEVBQUk7O0FBQ2IsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQUksVUFBVSxJQUFJLGNBQUosRUFBZDs7QUFFQSxnQkFBUSxNQUFSLEdBQWlCLFlBQU07QUFDckIsY0FBTSxXQUFXLFFBQVEsWUFBekI7QUFDQSxjQUFJLFNBQVMsS0FBYixFQUFvQjtBQUNsQixtQkFBTyxTQUFTLEtBQWhCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsb0JBQVEsSUFBUjtBQUNEO0FBQ0YsU0FQRDs7QUFTQSxnQkFBUSxTQUFSLEdBQW9CLFlBQU07QUFDeEIsaUJBQU8sUUFBUSxZQUFmO0FBQ0QsU0FGRDtBQUdBLGdCQUFRLE9BQVIsR0FBa0IsWUFBTTtBQUN0QixpQkFBTyxRQUFRLFlBQWY7QUFDRCxTQUZEO0FBR0EsZ0JBQVEsSUFBUixDQUFhLE1BQWIsRUFBcUIsYUFBckI7QUFDQSxnQkFBUSxnQkFBUixDQUF5QixlQUF6QixjQUFvRCxPQUFLLEtBQXpEO0FBQ0EsZ0JBQVEsZ0JBQVIsQ0FBeUIsaUJBQXpCLEVBQTRDLEtBQUssU0FBTCxDQUFlLEVBQUUsTUFBTSxNQUFJLE9BQUssUUFBakIsRUFBZixDQUE1QztBQUNBLGdCQUFRLGdCQUFSLENBQXlCLGNBQXpCLEVBQXlDLHVDQUF6QztBQUNBLGdCQUFRLElBQVIsQ0FBYSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQWI7QUFDRCxPQXZCTSxDQUFQO0FBd0JEOzs7d0JBNURjO0FBQ2IsYUFBVSxLQUFLLElBQWY7QUFDRDs7Ozs7O0lBNkRHLGM7QUFDSiwwQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7OzsrQkFFVSxJLEVBQU07QUFDZixhQUFPLElBQUksaUJBQUosQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBUDtBQUNEOzs7Ozs7a0JBR1ksYyIsImZpbGUiOiJEcm9wYm94WE1MSHR0cEJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkb3dubG9hZEFwaVBhdGggPSBcImh0dHBzOi8vY29udGVudC5kcm9wYm94YXBpLmNvbS8yL2ZpbGVzL2Rvd25sb2FkXCI7XG5jb25zdCB1cGxvYWRBcGlQYXRoID0gXCJodHRwczovL2NvbnRlbnQuZHJvcGJveGFwaS5jb20vMi9maWxlcy91cGxvYWRcIjtcblxuY2xhc3MgRHJvcGJveENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRva2VuID0gYmFja2VuZC50b2tlbjtcbiAgfVxuXG4gIGdldCBmaWxlTmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS5qc29uYDtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZGF0YS5lcnJvcltcIi50YWdcIl0gPT09IFwicGF0aFwiKSB7XG4gICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICB9O1xuICAgICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCBkb3dubG9hZEFwaVBhdGgpO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkRyb3Bib3gtQVBJLUFyZ1wiLCBKU09OLnN0cmluZ2lmeSh7IHBhdGg6IFwiL1wiK3RoaXMuZmlsZU5hbWUgfSkpO1xuICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QocmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgICByZWplY3QocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIHVwbG9hZEFwaVBhdGgpO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkRyb3Bib3gtQVBJLUFyZ1wiLCBKU09OLnN0cmluZ2lmeSh7IHBhdGg6IFwiL1wiK3RoaXMuZmlsZU5hbWUgfSkpO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjsgY2hhcnNldD1kcm9wYm94LWNvcnMtaGFja1wiKTtcbiAgICAgIHJlcXVlc3Quc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgRHJvcGJveEJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcih0b2tlbikge1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgfVxuXG4gIGNvbGxlY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgRHJvcGJveENvbGxlY3Rpb24obmFtZSwgdGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcGJveEJhY2tlbmQ7XG4iXX0=