"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dropboxClient = require("dropbox-client");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropboxCollection = function () {
  function DropboxCollection(name, backend) {
    _classCallCheck(this, DropboxCollection);

    this.name = name;
    this.token = backend.token;
  }

  _createClass(DropboxCollection, [{
    key: "read",
    value: function read() {
      return (0, _dropboxClient.download)(this.token, { path: this.filePath }).then(function (data) {
        var partialContent = "";
        var decoder = new TextDecoder();
        var reader = data.content.getReader();

        var read = function read() {
          return reader.read().then(function (result) {
            if (!result.done) {
              partialContent += decoder.decode(result.value, {
                stream: true
              });

              return read();
            } else {
              return JSON.parse(partialContent);
            }
          });
        };

        return read();
      }).then(function (data) {
        if (data.error) {
          switch (data.error[".tag"]) {
            case "path":
              return [];
            default:
              throw data.error;
          }
        } else {
          return data;
        }
      });
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      return (0, _dropboxClient.putFile)(this.token, JSON.stringify(data), "text/plain; charset=dropbox-cors-hack", { path: this.filePath }).then(function (_) {
        return data;
      });
    }
  }, {
    key: "fileName",
    get: function get() {
      return this.name + ".json";
    }
  }, {
    key: "filePath",
    get: function get() {
      return "/" + this.fileName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0lBRU0saUI7QUFDSiw2QkFBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3pCLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQXJCO0FBQ0Q7Ozs7MkJBVU07QUFDTCxhQUFPLDZCQUFTLEtBQUssS0FBZCxFQUFxQixFQUFFLE1BQU0sS0FBSyxRQUFiLEVBQXJCLEVBRU4sSUFGTSxDQUVELGdCQUFRO0FBQ1osWUFBSSxpQkFBaUIsRUFBckI7QUFDQSxZQUFNLFVBQVUsSUFBSSxXQUFKLEVBQWhCO0FBQ0EsWUFBTSxTQUFTLEtBQUssT0FBTCxDQUFhLFNBQWIsRUFBZjs7QUFFQSxZQUFNLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDakIsaUJBQU8sT0FBTyxJQUFQLEdBQWMsSUFBZCxDQUFtQixrQkFBVTtBQUNsQyxnQkFBSSxDQUFDLE9BQU8sSUFBWixFQUFrQjtBQUNoQixnQ0FBa0IsUUFBUSxNQUFSLENBQWUsT0FBTyxLQUF0QixFQUE2QjtBQUM3Qyx3QkFBUTtBQURxQyxlQUE3QixDQUFsQjs7QUFJQSxxQkFBTyxNQUFQO0FBQ0QsYUFORCxNQU1PO0FBQ0wscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUFQO0FBQ0Q7QUFDRixXQVZNLENBQVA7QUFXRCxTQVpEOztBQWNBLGVBQU8sTUFBUDtBQUNELE9BdEJNLEVBd0JOLElBeEJNLENBd0JELGdCQUFRO0FBQ1osWUFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxrQkFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQVA7QUFDRSxpQkFBSyxNQUFMO0FBQ0UscUJBQU8sRUFBUDtBQUNGO0FBQ0Usb0JBQU0sS0FBSyxLQUFYO0FBSko7QUFNRCxTQVBELE1BT087QUFDTCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQW5DTSxDQUFQO0FBb0NEOzs7NEJBRWM7QUFBQSxVQUFULElBQVMseURBQUosRUFBSTs7QUFDYixhQUFPLDRCQUNMLEtBQUssS0FEQSxFQUVMLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FGSyxFQUdMLHVDQUhLLEVBSUwsRUFBQyxNQUFNLEtBQUssUUFBWixFQUpLLEVBS0wsSUFMSyxDQUtBO0FBQUEsZUFBSyxJQUFMO0FBQUEsT0FMQSxDQUFQO0FBTUQ7Ozt3QkF0RGM7QUFDYixhQUFVLEtBQUssSUFBZjtBQUNEOzs7d0JBRWM7QUFDYixtQkFBVyxLQUFLLFFBQWhCO0FBQ0Q7Ozs7OztJQW1ERyxjO0FBQ0osMEJBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7Ozs7K0JBRVUsSSxFQUFNO0FBQ2YsYUFBTyxJQUFJLGlCQUFKLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLENBQVA7QUFDRDs7Ozs7O2tCQUdZLGMiLCJmaWxlIjoiRHJvcGJveEJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkb3dubG9hZCwgcHV0RmlsZSB9IGZyb20gXCJkcm9wYm94LWNsaWVudFwiXG5cbmNsYXNzIERyb3Bib3hDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgYmFja2VuZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLnRva2VuID0gYmFja2VuZC50b2tlblxuICB9XG5cbiAgZ2V0IGZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9Lmpzb25gXG4gIH1cblxuICBnZXQgZmlsZVBhdGgoKSB7XG4gICAgcmV0dXJuIGAvJHt0aGlzLmZpbGVOYW1lfWBcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIGRvd25sb2FkKHRoaXMudG9rZW4sIHsgcGF0aDogdGhpcy5maWxlUGF0aCB9KVxuXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBsZXQgcGFydGlhbENvbnRlbnQgPSBcIlwiXG4gICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKClcbiAgICAgIGNvbnN0IHJlYWRlciA9IGRhdGEuY29udGVudC5nZXRSZWFkZXIoKVxuXG4gICAgICBjb25zdCByZWFkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWQoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgcGFydGlhbENvbnRlbnQgKz0gZGVjb2Rlci5kZWNvZGUocmVzdWx0LnZhbHVlLCB7XG4gICAgICAgICAgICAgIHN0cmVhbTogdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIHJlYWQoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShwYXJ0aWFsQ29udGVudClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZWFkKClcbiAgICB9KVxuXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICBzd2l0Y2goZGF0YS5lcnJvcltcIi50YWdcIl0pIHtcbiAgICAgICAgICBjYXNlIFwicGF0aFwiOlxuICAgICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IGRhdGEuZXJyb3JcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd3JpdGUoZGF0YT1bXSkge1xuICAgIHJldHVybiBwdXRGaWxlKFxuICAgICAgdGhpcy50b2tlbixcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PWRyb3Bib3gtY29ycy1oYWNrXCIsXG4gICAgICB7cGF0aDogdGhpcy5maWxlUGF0aH1cbiAgICApLnRoZW4oXyA9PiBkYXRhKVxuICB9XG59XG5cbmNsYXNzIERyb3Bib3hCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IodG9rZW4pIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gIH1cblxuICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IERyb3Bib3hDb2xsZWN0aW9uKG5hbWUsIHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bib3hCYWNrZW5kO1xuIl19