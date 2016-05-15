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
            if (data.error === "File not found") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94WE1MSHR0cEJhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU0sa0JBQWtCLGlEQUF4QjtBQUNBLElBQU0sZ0JBQWdCLCtDQUF0Qjs7SUFFTSxpQjtBQUNKLDZCQUFZLElBQVosRUFBa0IsT0FBbEIsRUFBMkI7QUFBQTs7QUFDekIsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBckI7QUFDRDs7OzsyQkFNTTtBQUFBOztBQUNMLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxZQUFJLFVBQVUsSUFBSSxjQUFKLEVBQWQ7O0FBRUEsZ0JBQVEsTUFBUixHQUFpQixZQUFNO0FBQ3JCLGNBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxRQUFRLFlBQW5CLENBQWI7O0FBRUEsY0FBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxnQkFBSSxLQUFLLEtBQUwsS0FBZSxnQkFBbkIsRUFBcUM7QUFDbkMsc0JBQVEsRUFBUjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLEtBQUssS0FBWjtBQUNEO0FBQ0YsV0FORCxNQU1PO0FBQ0wsb0JBQVEsSUFBUjtBQUNEO0FBQ0YsU0FaRDs7QUFjQSxnQkFBUSxTQUFSLEdBQW9CLFlBQU07QUFDeEIsaUJBQU8sUUFBUSxZQUFmO0FBQ0QsU0FGRDtBQUdBLGdCQUFRLE9BQVIsR0FBa0IsWUFBTTtBQUN0QixpQkFBTyxRQUFRLFlBQWY7QUFDRCxTQUZEO0FBR0EsZ0JBQVEsSUFBUixDQUFhLE1BQWIsRUFBcUIsZUFBckI7QUFDQSxnQkFBUSxnQkFBUixDQUF5QixlQUF6QixjQUFvRCxNQUFLLEtBQXpEO0FBQ0EsZ0JBQVEsZ0JBQVIsQ0FBeUIsaUJBQXpCLEVBQTRDLEtBQUssU0FBTCxDQUFlLEVBQUUsTUFBTSxNQUFJLE1BQUssUUFBakIsRUFBZixDQUE1QztBQUNBLGdCQUFRLElBQVI7QUFDRCxPQTNCTSxDQUFQO0FBNEJEOzs7NEJBRWM7QUFBQTs7QUFBQSxVQUFULElBQVMseURBQUosRUFBSTs7QUFDYixhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxVQUFVLElBQUksY0FBSixFQUFkOztBQUVBLGdCQUFRLE1BQVIsR0FBaUIsWUFBTTtBQUNyQixjQUFNLFdBQVcsUUFBUSxZQUF6QjtBQUNBLGNBQUksU0FBUyxLQUFiLEVBQW9CO0FBQ2xCLG1CQUFPLFNBQVMsS0FBaEI7QUFDRCxXQUZELE1BRU87QUFDTCxvQkFBUSxJQUFSO0FBQ0Q7QUFDRixTQVBEOztBQVNBLGdCQUFRLFNBQVIsR0FBb0IsWUFBTTtBQUN4QixpQkFBTyxRQUFRLFlBQWY7QUFDRCxTQUZEO0FBR0EsZ0JBQVEsT0FBUixHQUFrQixZQUFNO0FBQ3RCLGlCQUFPLFFBQVEsWUFBZjtBQUNELFNBRkQ7QUFHQSxnQkFBUSxJQUFSLENBQWEsTUFBYixFQUFxQixhQUFyQjtBQUNBLGdCQUFRLGdCQUFSLENBQXlCLGVBQXpCLGNBQW9ELE9BQUssS0FBekQ7QUFDQSxnQkFBUSxnQkFBUixDQUF5QixpQkFBekIsRUFBNEMsS0FBSyxTQUFMLENBQWUsRUFBRSxNQUFNLE1BQUksT0FBSyxRQUFqQixFQUFmLENBQTVDO0FBQ0EsZ0JBQVEsZ0JBQVIsQ0FBeUIsY0FBekIsRUFBeUMsdUNBQXpDO0FBQ0EsZ0JBQVEsSUFBUixDQUFhLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBYjtBQUNELE9BdkJNLENBQVA7QUF3QkQ7Ozt3QkE1RGM7QUFDYixhQUFVLEtBQUssSUFBZjtBQUNEOzs7Ozs7SUE2REcsYztBQUNKLDBCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNEOzs7OytCQUVVLEksRUFBTTtBQUNmLGFBQU8sSUFBSSxpQkFBSixDQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUFQO0FBQ0Q7Ozs7OztrQkFHWSxjIiwiZmlsZSI6IkRyb3Bib3hYTUxIdHRwQmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRvd25sb2FkQXBpUGF0aCA9IFwiaHR0cHM6Ly9jb250ZW50LmRyb3Bib3hhcGkuY29tLzIvZmlsZXMvZG93bmxvYWRcIjtcbmNvbnN0IHVwbG9hZEFwaVBhdGggPSBcImh0dHBzOi8vY29udGVudC5kcm9wYm94YXBpLmNvbS8yL2ZpbGVzL3VwbG9hZFwiO1xuXG5jbGFzcyBEcm9wYm94Q29sbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGJhY2tlbmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudG9rZW4gPSBiYWNrZW5kLnRva2VuO1xuICB9XG5cbiAgZ2V0IGZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICAgIGlmIChkYXRhLmVycm9yID09PSBcIkZpbGUgbm90IGZvdW5kXCIpIHtcbiAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoZGF0YS5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgICByZWplY3QocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIGRvd25sb2FkQXBpUGF0aCk7XG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiRHJvcGJveC1BUEktQXJnXCIsIEpTT04uc3RyaW5naWZ5KHsgcGF0aDogXCIvXCIrdGhpcy5maWxlTmFtZSB9KSk7XG4gICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlKGRhdGE9W10pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgIHJlamVjdChyZXNwb25zZS5lcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICB9O1xuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3QocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgdXBsb2FkQXBpUGF0aCk7XG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiRHJvcGJveC1BUEktQXJnXCIsIEpTT04uc3RyaW5naWZ5KHsgcGF0aDogXCIvXCIrdGhpcy5maWxlTmFtZSB9KSk7XG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PWRyb3Bib3gtY29ycy1oYWNrXCIpO1xuICAgICAgcmVxdWVzdC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBEcm9wYm94QmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKHRva2VuKSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICB9XG5cbiAgY29sbGVjdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBEcm9wYm94Q29sbGVjdGlvbihuYW1lLCB0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcm9wYm94QmFja2VuZDtcbiJdfQ==