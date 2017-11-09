"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dropboxClient = require("dropbox-client");

var _utils = require("./utils");

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
      return (0, _dropboxClient.download)(this.token, { path: this.filePath }).then(_utils.binaryToJson).then(_utils.handleDropboxError);
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return (0, _dropboxClient.putFile)(this.token, JSON.stringify(data), "text/plain; charset=dropbox-cors-hack", { path: this.filePath }).then(function () {
        return data;
      });
    }
  }, {
    key: "filePath",
    get: function get() {
      return "/" + this.name + ".json";
    }
  }]);

  return DropboxCollection;
}();

exports.default = (0, _utils.genericBackend)(DropboxCollection);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6WyJEcm9wYm94Q29sbGVjdGlvbiIsIm5hbWUiLCJiYWNrZW5kIiwidG9rZW4iLCJwYXRoIiwiZmlsZVBhdGgiLCJ0aGVuIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7SUFFTUEsaUI7QUFDSiw2QkFBWUMsSUFBWixFQUFrQkMsT0FBbEIsRUFBMkI7QUFBQTs7QUFDekIsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsS0FBTCxHQUFhRCxRQUFRQyxLQUFyQjtBQUNEOzs7OzJCQU1NO0FBQ0wsYUFBTyw2QkFBUyxLQUFLQSxLQUFkLEVBQXFCLEVBQUVDLE1BQU0sS0FBS0MsUUFBYixFQUFyQixFQUNKQyxJQURJLHNCQUVKQSxJQUZJLDJCQUFQO0FBR0Q7Ozs0QkFFYztBQUFBLFVBQVRDLElBQVMsdUVBQUosRUFBSTs7QUFDYixhQUFPLDRCQUNMLEtBQUtKLEtBREEsRUFFTEssS0FBS0MsU0FBTCxDQUFlRixJQUFmLENBRkssRUFHTCx1Q0FISyxFQUlMLEVBQUNILE1BQU0sS0FBS0MsUUFBWixFQUpLLEVBS0xDLElBTEssQ0FLQTtBQUFBLGVBQU1DLElBQU47QUFBQSxPQUxBLENBQVA7QUFNRDs7O3dCQWpCYztBQUNiLG1CQUFXLEtBQUtOLElBQWhCO0FBQ0Q7Ozs7OztrQkFrQlksMkJBQWVELGlCQUFmLEMiLCJmaWxlIjoiRHJvcGJveEJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkb3dubG9hZCwgcHV0RmlsZSB9IGZyb20gXCJkcm9wYm94LWNsaWVudFwiO1xuaW1wb3J0IHsgYmluYXJ5VG9Kc29uLCBoYW5kbGVEcm9wYm94RXJyb3IsIGdlbmVyaWNCYWNrZW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgRHJvcGJveENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRva2VuID0gYmFja2VuZC50b2tlbjtcbiAgfVxuXG4gIGdldCBmaWxlUGF0aCgpIHtcbiAgICByZXR1cm4gYC8ke3RoaXMubmFtZX0uanNvbmA7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiBkb3dubG9hZCh0aGlzLnRva2VuLCB7IHBhdGg6IHRoaXMuZmlsZVBhdGggfSlcbiAgICAgIC50aGVuKGJpbmFyeVRvSnNvbilcbiAgICAgIC50aGVuKGhhbmRsZURyb3Bib3hFcnJvcik7XG4gIH1cblxuICB3cml0ZShkYXRhPVtdKSB7XG4gICAgcmV0dXJuIHB1dEZpbGUoXG4gICAgICB0aGlzLnRva2VuLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBcInRleHQvcGxhaW47IGNoYXJzZXQ9ZHJvcGJveC1jb3JzLWhhY2tcIixcbiAgICAgIHtwYXRoOiB0aGlzLmZpbGVQYXRofVxuICAgICkudGhlbigoKSA9PiBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmljQmFja2VuZChEcm9wYm94Q29sbGVjdGlvbik7XG4iXX0=