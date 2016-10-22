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

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94WE1MSHR0cEJhY2tlbmQuanMiXSwibmFtZXMiOlsiZG93bmxvYWRBcGlQYXRoIiwidXBsb2FkQXBpUGF0aCIsIkRyb3Bib3hDb2xsZWN0aW9uIiwibmFtZSIsImJhY2tlbmQiLCJ0b2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25sb2FkIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImVycm9yIiwib250aW1lb3V0Iiwib25lcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic3RyaW5naWZ5IiwicGF0aCIsImZpbGVOYW1lIiwic2VuZCIsInJlc3BvbnNlIiwiRHJvcGJveEJhY2tlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxrQkFBa0IsaURBQXhCO0FBQ0EsSUFBTUMsZ0JBQWdCLCtDQUF0Qjs7SUFFTUMsaUI7QUFDSiw2QkFBWUMsSUFBWixFQUFrQkMsT0FBbEIsRUFBMkI7QUFBQTs7QUFDekIsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsS0FBTCxHQUFhRCxRQUFRQyxLQUFyQjtBQUNEOzs7OzJCQU1NO0FBQUE7O0FBQ0wsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQUlDLFVBQVUsSUFBSUMsY0FBSixFQUFkOztBQUVBRCxnQkFBUUUsTUFBUixHQUFpQixZQUFNO0FBQ3JCLGNBQU1DLE9BQU9DLEtBQUtDLEtBQUwsQ0FBV0wsUUFBUU0sWUFBbkIsQ0FBYjs7QUFFQSxjQUFJSCxLQUFLSSxLQUFULEVBQWdCO0FBQ2QsZ0JBQUlKLEtBQUtJLEtBQUwsQ0FBVyxNQUFYLE1BQXVCLE1BQTNCLEVBQW1DO0FBQ2pDVCxzQkFBUSxFQUFSO0FBQ0QsYUFGRCxNQUVPO0FBQ0xDLHFCQUFPSSxLQUFLSSxLQUFaO0FBQ0Q7QUFDRixXQU5ELE1BTU87QUFDTFQsb0JBQVFLLElBQVI7QUFDRDtBQUNGLFNBWkQ7O0FBY0FILGdCQUFRUSxTQUFSLEdBQW9CLFlBQU07QUFDeEJULGlCQUFPQyxRQUFRTSxZQUFmO0FBQ0QsU0FGRDtBQUdBTixnQkFBUVMsT0FBUixHQUFrQixZQUFNO0FBQ3RCVixpQkFBT0MsUUFBUU0sWUFBZjtBQUNELFNBRkQ7QUFHQU4sZ0JBQVFVLElBQVIsQ0FBYSxNQUFiLEVBQXFCbkIsZUFBckI7QUFDQVMsZ0JBQVFXLGdCQUFSLENBQXlCLGVBQXpCLGNBQW9ELE1BQUtmLEtBQXpEO0FBQ0FJLGdCQUFRVyxnQkFBUixDQUF5QixpQkFBekIsRUFBNENQLEtBQUtRLFNBQUwsQ0FBZSxFQUFFQyxNQUFNLE1BQUksTUFBS0MsUUFBakIsRUFBZixDQUE1QztBQUNBZCxnQkFBUWUsSUFBUjtBQUNELE9BM0JNLENBQVA7QUE0QkQ7Ozs0QkFFYztBQUFBOztBQUFBLFVBQVRaLElBQVMsdUVBQUosRUFBSTs7QUFDYixhQUFPLElBQUlOLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBSUMsVUFBVSxJQUFJQyxjQUFKLEVBQWQ7O0FBRUFELGdCQUFRRSxNQUFSLEdBQWlCLFlBQU07QUFDckIsY0FBTWMsV0FBV2hCLFFBQVFNLFlBQXpCO0FBQ0EsY0FBSVUsU0FBU1QsS0FBYixFQUFvQjtBQUNsQlIsbUJBQU9pQixTQUFTVCxLQUFoQjtBQUNELFdBRkQsTUFFTztBQUNMVCxvQkFBUUssSUFBUjtBQUNEO0FBQ0YsU0FQRDs7QUFTQUgsZ0JBQVFRLFNBQVIsR0FBb0IsWUFBTTtBQUN4QlQsaUJBQU9DLFFBQVFNLFlBQWY7QUFDRCxTQUZEO0FBR0FOLGdCQUFRUyxPQUFSLEdBQWtCLFlBQU07QUFDdEJWLGlCQUFPQyxRQUFRTSxZQUFmO0FBQ0QsU0FGRDtBQUdBTixnQkFBUVUsSUFBUixDQUFhLE1BQWIsRUFBcUJsQixhQUFyQjtBQUNBUSxnQkFBUVcsZ0JBQVIsQ0FBeUIsZUFBekIsY0FBb0QsT0FBS2YsS0FBekQ7QUFDQUksZ0JBQVFXLGdCQUFSLENBQXlCLGlCQUF6QixFQUE0Q1AsS0FBS1EsU0FBTCxDQUFlLEVBQUVDLE1BQU0sTUFBSSxPQUFLQyxRQUFqQixFQUFmLENBQTVDO0FBQ0FkLGdCQUFRVyxnQkFBUixDQUF5QixjQUF6QixFQUF5Qyx1Q0FBekM7QUFDQVgsZ0JBQVFlLElBQVIsQ0FBYVgsS0FBS1EsU0FBTCxDQUFlVCxJQUFmLENBQWI7QUFDRCxPQXZCTSxDQUFQO0FBd0JEOzs7d0JBNURjO0FBQ2IsYUFBVSxLQUFLVCxJQUFmO0FBQ0Q7Ozs7OztJQTZER3VCLGM7QUFDSiwwQkFBWXJCLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7Ozs7K0JBRVVGLEksRUFBTTtBQUNmLGFBQU8sSUFBSUQsaUJBQUosQ0FBc0JDLElBQXRCLEVBQTRCLElBQTVCLENBQVA7QUFDRDs7Ozs7O2tCQUdZdUIsYyIsImZpbGUiOiJEcm9wYm94WE1MSHR0cEJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkb3dubG9hZEFwaVBhdGggPSBcImh0dHBzOi8vY29udGVudC5kcm9wYm94YXBpLmNvbS8yL2ZpbGVzL2Rvd25sb2FkXCI7XG5jb25zdCB1cGxvYWRBcGlQYXRoID0gXCJodHRwczovL2NvbnRlbnQuZHJvcGJveGFwaS5jb20vMi9maWxlcy91cGxvYWRcIjtcblxuY2xhc3MgRHJvcGJveENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRva2VuID0gYmFja2VuZC50b2tlbjtcbiAgfVxuXG4gIGdldCBmaWxlTmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS5qc29uYDtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZGF0YS5lcnJvcltcIi50YWdcIl0gPT09IFwicGF0aFwiKSB7XG4gICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICB9O1xuICAgICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCBkb3dubG9hZEFwaVBhdGgpO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkRyb3Bib3gtQVBJLUFyZ1wiLCBKU09OLnN0cmluZ2lmeSh7IHBhdGg6IFwiL1wiK3RoaXMuZmlsZU5hbWUgfSkpO1xuICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QocmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgICByZWplY3QocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIHVwbG9hZEFwaVBhdGgpO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkRyb3Bib3gtQVBJLUFyZ1wiLCBKU09OLnN0cmluZ2lmeSh7IHBhdGg6IFwiL1wiK3RoaXMuZmlsZU5hbWUgfSkpO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjsgY2hhcnNldD1kcm9wYm94LWNvcnMtaGFja1wiKTtcbiAgICAgIHJlcXVlc3Quc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgRHJvcGJveEJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcih0b2tlbikge1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgfVxuXG4gIGNvbGxlY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgRHJvcGJveENvbGxlY3Rpb24obmFtZSwgdGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcGJveEJhY2tlbmQ7XG4iXX0=