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
        request.setRequestHeader("Dropbox-API-Arg", JSON.stringify({ path: "/" + _this2.fileName, mode: "overwrite" }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94WE1MSHR0cEJhY2tlbmQuanMiXSwibmFtZXMiOlsiZG93bmxvYWRBcGlQYXRoIiwidXBsb2FkQXBpUGF0aCIsIkRyb3Bib3hDb2xsZWN0aW9uIiwibmFtZSIsImJhY2tlbmQiLCJ0b2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25sb2FkIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImVycm9yIiwib250aW1lb3V0Iiwib25lcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic3RyaW5naWZ5IiwicGF0aCIsImZpbGVOYW1lIiwic2VuZCIsInJlc3BvbnNlIiwibW9kZSIsIkRyb3Bib3hCYWNrZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsa0JBQWtCLGlEQUF4QjtBQUNBLElBQU1DLGdCQUFnQiwrQ0FBdEI7O0lBRU1DLGlCO0FBQ0osNkJBQVlDLElBQVosRUFBa0JDLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3pCLFNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtFLEtBQUwsR0FBYUQsUUFBUUMsS0FBckI7QUFDRDs7OzsyQkFNTTtBQUFBOztBQUNMLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxZQUFJQyxVQUFVLElBQUlDLGNBQUosRUFBZDs7QUFFQUQsZ0JBQVFFLE1BQVIsR0FBaUIsWUFBTTtBQUNyQixjQUFNQyxPQUFPQyxLQUFLQyxLQUFMLENBQVdMLFFBQVFNLFlBQW5CLENBQWI7O0FBRUEsY0FBSUgsS0FBS0ksS0FBVCxFQUFnQjtBQUNkLGdCQUFJSixLQUFLSSxLQUFMLENBQVcsTUFBWCxNQUF1QixNQUEzQixFQUFtQztBQUNqQ1Qsc0JBQVEsRUFBUjtBQUNELGFBRkQsTUFFTztBQUNMQyxxQkFBT0ksS0FBS0ksS0FBWjtBQUNEO0FBQ0YsV0FORCxNQU1PO0FBQ0xULG9CQUFRSyxJQUFSO0FBQ0Q7QUFDRixTQVpEOztBQWNBSCxnQkFBUVEsU0FBUixHQUFvQixZQUFNO0FBQ3hCVCxpQkFBT0MsUUFBUU0sWUFBZjtBQUNELFNBRkQ7QUFHQU4sZ0JBQVFTLE9BQVIsR0FBa0IsWUFBTTtBQUN0QlYsaUJBQU9DLFFBQVFNLFlBQWY7QUFDRCxTQUZEO0FBR0FOLGdCQUFRVSxJQUFSLENBQWEsTUFBYixFQUFxQm5CLGVBQXJCO0FBQ0FTLGdCQUFRVyxnQkFBUixDQUF5QixlQUF6QixjQUFvRCxNQUFLZixLQUF6RDtBQUNBSSxnQkFBUVcsZ0JBQVIsQ0FBeUIsaUJBQXpCLEVBQTRDUCxLQUFLUSxTQUFMLENBQWUsRUFBRUMsTUFBTSxNQUFJLE1BQUtDLFFBQWpCLEVBQWYsQ0FBNUM7QUFDQWQsZ0JBQVFlLElBQVI7QUFDRCxPQTNCTSxDQUFQO0FBNEJEOzs7NEJBRWM7QUFBQTs7QUFBQSxVQUFUWixJQUFTLHVFQUFKLEVBQUk7O0FBQ2IsYUFBTyxJQUFJTixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQUlDLFVBQVUsSUFBSUMsY0FBSixFQUFkOztBQUVBRCxnQkFBUUUsTUFBUixHQUFpQixZQUFNO0FBQ3JCLGNBQU1jLFdBQVdoQixRQUFRTSxZQUF6QjtBQUNBLGNBQUlVLFNBQVNULEtBQWIsRUFBb0I7QUFDbEJSLG1CQUFPaUIsU0FBU1QsS0FBaEI7QUFDRCxXQUZELE1BRU87QUFDTFQsb0JBQVFLLElBQVI7QUFDRDtBQUNGLFNBUEQ7O0FBU0FILGdCQUFRUSxTQUFSLEdBQW9CLFlBQU07QUFDeEJULGlCQUFPQyxRQUFRTSxZQUFmO0FBQ0QsU0FGRDtBQUdBTixnQkFBUVMsT0FBUixHQUFrQixZQUFNO0FBQ3RCVixpQkFBT0MsUUFBUU0sWUFBZjtBQUNELFNBRkQ7QUFHQU4sZ0JBQVFVLElBQVIsQ0FBYSxNQUFiLEVBQXFCbEIsYUFBckI7QUFDQVEsZ0JBQVFXLGdCQUFSLENBQXlCLGVBQXpCLGNBQW9ELE9BQUtmLEtBQXpEO0FBQ0FJLGdCQUFRVyxnQkFBUixDQUF5QixpQkFBekIsRUFBNENQLEtBQUtRLFNBQUwsQ0FBZSxFQUFFQyxNQUFNLE1BQUksT0FBS0MsUUFBakIsRUFBMkJHLE1BQU0sV0FBakMsRUFBZixDQUE1QztBQUNBakIsZ0JBQVFXLGdCQUFSLENBQXlCLGNBQXpCLEVBQXlDLHVDQUF6QztBQUNBWCxnQkFBUWUsSUFBUixDQUFhWCxLQUFLUSxTQUFMLENBQWVULElBQWYsQ0FBYjtBQUNELE9BdkJNLENBQVA7QUF3QkQ7Ozt3QkE1RGM7QUFDYixhQUFVLEtBQUtULElBQWY7QUFDRDs7Ozs7O0lBNkRHd0IsYztBQUNKLDBCQUFZdEIsS0FBWixFQUFtQjtBQUFBOztBQUNqQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7OzsrQkFFVUYsSSxFQUFNO0FBQ2YsYUFBTyxJQUFJRCxpQkFBSixDQUFzQkMsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBUDtBQUNEOzs7Ozs7a0JBR1l3QixjIiwiZmlsZSI6IkRyb3Bib3hYTUxIdHRwQmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRvd25sb2FkQXBpUGF0aCA9IFwiaHR0cHM6Ly9jb250ZW50LmRyb3Bib3hhcGkuY29tLzIvZmlsZXMvZG93bmxvYWRcIjtcbmNvbnN0IHVwbG9hZEFwaVBhdGggPSBcImh0dHBzOi8vY29udGVudC5kcm9wYm94YXBpLmNvbS8yL2ZpbGVzL3VwbG9hZFwiO1xuXG5jbGFzcyBEcm9wYm94Q29sbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGJhY2tlbmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudG9rZW4gPSBiYWNrZW5kLnRva2VuO1xuICB9XG5cbiAgZ2V0IGZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICAgIGlmIChkYXRhLmVycm9yW1wiLnRhZ1wiXSA9PT0gXCJwYXRoXCIpIHtcbiAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoZGF0YS5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgICByZWplY3QocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIGRvd25sb2FkQXBpUGF0aCk7XG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiRHJvcGJveC1BUEktQXJnXCIsIEpTT04uc3RyaW5naWZ5KHsgcGF0aDogXCIvXCIrdGhpcy5maWxlTmFtZSB9KSk7XG4gICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlKGRhdGE9W10pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgIHJlamVjdChyZXNwb25zZS5lcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICB9O1xuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3QocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgdXBsb2FkQXBpUGF0aCk7XG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIGBCZWFyZXIgJHt0aGlzLnRva2VufWApO1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiRHJvcGJveC1BUEktQXJnXCIsIEpTT04uc3RyaW5naWZ5KHsgcGF0aDogXCIvXCIrdGhpcy5maWxlTmFtZSwgbW9kZTogXCJvdmVyd3JpdGVcIiB9KSk7XG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PWRyb3Bib3gtY29ycy1oYWNrXCIpO1xuICAgICAgcmVxdWVzdC5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBEcm9wYm94QmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKHRva2VuKSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICB9XG5cbiAgY29sbGVjdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBEcm9wYm94Q29sbGVjdGlvbihuYW1lLCB0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcm9wYm94QmFja2VuZDtcbiJdfQ==