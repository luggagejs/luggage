"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dropbox = require("dropbox");

var _dropbox2 = _interopRequireDefault(_dropbox);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropboxCollection = function () {
  function DropboxCollection(name, backend) {
    _classCallCheck(this, DropboxCollection);

    this.name = name;
    this.client = new _dropbox2.default({
      accessToken: backend.token
    });
  }

  _createClass(DropboxCollection, [{
    key: "read",
    value: function read() {
      return this.client.filesDownload({ path: this.filePath }).then(_utils.binaryToJson).then(_utils.handleDropboxError);
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.client.filesUpload({
        contents: JSON.stringify(data),
        path: this.filePath
      }).then(function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6WyJEcm9wYm94Q29sbGVjdGlvbiIsIm5hbWUiLCJiYWNrZW5kIiwiY2xpZW50IiwiYWNjZXNzVG9rZW4iLCJ0b2tlbiIsImZpbGVzRG93bmxvYWQiLCJwYXRoIiwiZmlsZVBhdGgiLCJ0aGVuIiwiZGF0YSIsImZpbGVzVXBsb2FkIiwiY29udGVudHMiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVNQSxpQjtBQUNKLDZCQUFZQyxJQUFaLEVBQWtCQyxPQUFsQixFQUEyQjtBQUFBOztBQUN6QixTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRSxNQUFMLEdBQWMsc0JBQVk7QUFDeEJDLG1CQUFhRixRQUFRRztBQURHLEtBQVosQ0FBZDtBQUdEOzs7OzJCQU1NO0FBQ0wsYUFBTyxLQUFLRixNQUFMLENBQVlHLGFBQVosQ0FBMEIsRUFBRUMsTUFBTSxLQUFLQyxRQUFiLEVBQTFCLEVBQ0pDLElBREksc0JBRUpBLElBRkksMkJBQVA7QUFHRDs7OzRCQUVjO0FBQUEsVUFBVEMsSUFBUyx1RUFBSixFQUFJOztBQUNiLFdBQUtQLE1BQUwsQ0FBWVEsV0FBWixDQUF3QjtBQUN0QkMsa0JBQVVDLEtBQUtDLFNBQUwsQ0FBZUosSUFBZixDQURZO0FBRXRCSCxjQUFNLEtBQUtDO0FBRlcsT0FBeEIsRUFHR0MsSUFISCxDQUdRO0FBQUEsZUFBTUMsSUFBTjtBQUFBLE9BSFI7QUFJRDs7O3dCQWZjO0FBQ2IsbUJBQVcsS0FBS1QsSUFBaEI7QUFDRDs7Ozs7O2tCQWdCWSwyQkFBZUQsaUJBQWYsQyIsImZpbGUiOiJEcm9wYm94QmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcm9wYm94IGZyb20gXCJkcm9wYm94XCI7XG5pbXBvcnQgeyBiaW5hcnlUb0pzb24sIGhhbmRsZURyb3Bib3hFcnJvciwgZ2VuZXJpY0JhY2tlbmQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBEcm9wYm94Q29sbGVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGJhY2tlbmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuY2xpZW50ID0gbmV3IERyb3Bib3goe1xuICAgICAgYWNjZXNzVG9rZW46IGJhY2tlbmQudG9rZW5cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBmaWxlUGF0aCgpIHtcbiAgICByZXR1cm4gYC8ke3RoaXMubmFtZX0uanNvbmA7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5maWxlc0Rvd25sb2FkKHsgcGF0aDogdGhpcy5maWxlUGF0aCB9KVxuICAgICAgLnRoZW4oYmluYXJ5VG9Kc29uKVxuICAgICAgLnRoZW4oaGFuZGxlRHJvcGJveEVycm9yKTtcbiAgfVxuXG4gIHdyaXRlKGRhdGE9W10pIHtcbiAgICB0aGlzLmNsaWVudC5maWxlc1VwbG9hZCh7XG4gICAgICBjb250ZW50czogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBwYXRoOiB0aGlzLmZpbGVQYXRoXG4gICAgfSkudGhlbigoKSA9PiBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmljQmFja2VuZChEcm9wYm94Q29sbGVjdGlvbik7XG4iXX0=