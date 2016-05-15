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

      return (0, _dropboxClient.putFile)(this.token, JSON.stringify(data), "text/plain; charset=dropbox-cors-hack", { path: this.filePath }).then(function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0lBRU0saUI7QUFDSiw2QkFBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3pCLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQXJCO0FBQ0Q7Ozs7MkJBVU07QUFDTCxhQUFPLDZCQUFTLEtBQUssS0FBZCxFQUFxQixFQUFFLE1BQU0sS0FBSyxRQUFiLEVBQXJCLEVBRU4sSUFGTSxDQUVELGdCQUFRO0FBQ1osWUFBSSxpQkFBaUIsRUFBckI7QUFDQSxZQUFNLFVBQVUsSUFBSSxXQUFKLEVBQWhCO0FBQ0EsWUFBTSxTQUFTLEtBQUssT0FBTCxDQUFhLFNBQWIsRUFBZjs7QUFFQSxZQUFNLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDakIsaUJBQU8sT0FBTyxJQUFQLEdBQWMsSUFBZCxDQUFtQixrQkFBVTtBQUNsQyxnQkFBSSxDQUFDLE9BQU8sSUFBWixFQUFrQjtBQUNoQixnQ0FBa0IsUUFBUSxNQUFSLENBQWUsT0FBTyxLQUF0QixFQUE2QjtBQUM3Qyx3QkFBUTtBQURxQyxlQUE3QixDQUFsQjs7QUFJQSxxQkFBTyxNQUFQO0FBQ0QsYUFORCxNQU1PO0FBQ0wscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUFQO0FBQ0Q7QUFDRixXQVZNLENBQVA7QUFXRCxTQVpEOztBQWNBLGVBQU8sTUFBUDtBQUNELE9BdEJNLEVBd0JOLElBeEJNLENBd0JELGdCQUFRO0FBQ1osWUFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxrQkFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQVA7QUFDRSxpQkFBSyxNQUFMO0FBQ0UscUJBQU8sRUFBUDtBQUNGO0FBQ0Usb0JBQU0sS0FBSyxLQUFYO0FBSko7QUFNRCxTQVBELE1BT087QUFDTCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQW5DTSxDQUFQO0FBb0NEOzs7NEJBRWM7QUFBQSxVQUFULElBQVMseURBQUosRUFBSTs7QUFDYixhQUFPLDRCQUNMLEtBQUssS0FEQSxFQUVMLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FGSyxFQUdMLHVDQUhLLEVBSUwsRUFBQyxNQUFNLEtBQUssUUFBWixFQUpLLEVBS0wsSUFMSyxDQUtBO0FBQUEsZUFBTSxJQUFOO0FBQUEsT0FMQSxDQUFQO0FBTUQ7Ozt3QkF0RGM7QUFDYixhQUFVLEtBQUssSUFBZjtBQUNEOzs7d0JBRWM7QUFDYixtQkFBVyxLQUFLLFFBQWhCO0FBQ0Q7Ozs7OztJQW1ERyxjO0FBQ0osMEJBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7Ozs7K0JBRVUsSSxFQUFNO0FBQ2YsYUFBTyxJQUFJLGlCQUFKLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLENBQVA7QUFDRDs7Ozs7O2tCQUdZLGMiLCJmaWxlIjoiRHJvcGJveEJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkb3dubG9hZCwgcHV0RmlsZSB9IGZyb20gXCJkcm9wYm94LWNsaWVudFwiO1xuXG5jbGFzcyBEcm9wYm94Q29sbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGJhY2tlbmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudG9rZW4gPSBiYWNrZW5kLnRva2VuO1xuICB9XG5cbiAgZ2V0IGZpbGVOYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgZ2V0IGZpbGVQYXRoKCkge1xuICAgIHJldHVybiBgLyR7dGhpcy5maWxlTmFtZX1gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gZG93bmxvYWQodGhpcy50b2tlbiwgeyBwYXRoOiB0aGlzLmZpbGVQYXRoIH0pXG5cbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGxldCBwYXJ0aWFsQ29udGVudCA9IFwiXCI7XG4gICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgICBjb25zdCByZWFkZXIgPSBkYXRhLmNvbnRlbnQuZ2V0UmVhZGVyKCk7XG5cbiAgICAgIGNvbnN0IHJlYWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICBwYXJ0aWFsQ29udGVudCArPSBkZWNvZGVyLmRlY29kZShyZXN1bHQudmFsdWUsIHtcbiAgICAgICAgICAgICAgc3RyZWFtOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlYWQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocGFydGlhbENvbnRlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcmVhZCgpO1xuICAgIH0pXG5cbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgIHN3aXRjaChkYXRhLmVycm9yW1wiLnRhZ1wiXSkge1xuICAgICAgICAgIGNhc2UgXCJwYXRoXCI6XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IGRhdGEuZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgd3JpdGUoZGF0YT1bXSkge1xuICAgIHJldHVybiBwdXRGaWxlKFxuICAgICAgdGhpcy50b2tlbixcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PWRyb3Bib3gtY29ycy1oYWNrXCIsXG4gICAgICB7cGF0aDogdGhpcy5maWxlUGF0aH1cbiAgICApLnRoZW4oKCkgPT4gZGF0YSk7XG4gIH1cbn1cblxuY2xhc3MgRHJvcGJveEJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcih0b2tlbikge1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgfVxuXG4gIGNvbGxlY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgRHJvcGJveENvbGxlY3Rpb24obmFtZSwgdGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcGJveEJhY2tlbmQ7XG4iXX0=