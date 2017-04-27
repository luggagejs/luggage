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
      return this.client.filesDownload({ path: this.filePath }).then(_utils.binaryToJson).catch(_utils.handleDropboxError);
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.client.filesUpload({
        contents: JSON.stringify(data),
        path: this.filePath,
        mode: "overwrite"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6WyJEcm9wYm94Q29sbGVjdGlvbiIsIm5hbWUiLCJiYWNrZW5kIiwiY2xpZW50IiwiYWNjZXNzVG9rZW4iLCJ0b2tlbiIsImZpbGVzRG93bmxvYWQiLCJwYXRoIiwiZmlsZVBhdGgiLCJ0aGVuIiwiY2F0Y2giLCJkYXRhIiwiZmlsZXNVcGxvYWQiLCJjb250ZW50cyIsIkpTT04iLCJzdHJpbmdpZnkiLCJtb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVNQSxpQjtBQUNKLDZCQUFZQyxJQUFaLEVBQWtCQyxPQUFsQixFQUEyQjtBQUFBOztBQUN6QixTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRSxNQUFMLEdBQWMsc0JBQVk7QUFDeEJDLG1CQUFhRixRQUFRRztBQURHLEtBQVosQ0FBZDtBQUdEOzs7OzJCQU1NO0FBQ0wsYUFBTyxLQUFLRixNQUFMLENBQ0pHLGFBREksQ0FDVSxFQUFFQyxNQUFNLEtBQUtDLFFBQWIsRUFEVixFQUVKQyxJQUZJLHNCQUdKQyxLQUhJLDJCQUFQO0FBSUQ7Ozs0QkFFYztBQUFBLFVBQVRDLElBQVMsdUVBQUosRUFBSTs7QUFDYixhQUFPLEtBQUtSLE1BQUwsQ0FBWVMsV0FBWixDQUF3QjtBQUM3QkMsa0JBQVVDLEtBQUtDLFNBQUwsQ0FBZUosSUFBZixDQURtQjtBQUU3QkosY0FBTSxLQUFLQyxRQUZrQjtBQUc3QlEsY0FBTTtBQUh1QixPQUF4QixFQUlKUCxJQUpJLENBSUM7QUFBQSxlQUFNRSxJQUFOO0FBQUEsT0FKRCxDQUFQO0FBS0Q7Ozt3QkFqQmM7QUFDYixtQkFBVyxLQUFLVixJQUFoQjtBQUNEOzs7Ozs7a0JBa0JZLDJCQUFlRCxpQkFBZixDIiwiZmlsZSI6IkRyb3Bib3hCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyb3Bib3ggZnJvbSBcImRyb3Bib3hcIjtcbmltcG9ydCB7IGJpbmFyeVRvSnNvbiwgaGFuZGxlRHJvcGJveEVycm9yLCBnZW5lcmljQmFja2VuZCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIERyb3Bib3hDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgYmFja2VuZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5jbGllbnQgPSBuZXcgRHJvcGJveCh7XG4gICAgICBhY2Nlc3NUb2tlbjogYmFja2VuZC50b2tlblxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGZpbGVQYXRoKCkge1xuICAgIHJldHVybiBgLyR7dGhpcy5uYW1lfS5qc29uYDtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50XG4gICAgICAuZmlsZXNEb3dubG9hZCh7IHBhdGg6IHRoaXMuZmlsZVBhdGggfSlcbiAgICAgIC50aGVuKGJpbmFyeVRvSnNvbilcbiAgICAgIC5jYXRjaChoYW5kbGVEcm9wYm94RXJyb3IpO1xuICB9XG5cbiAgd3JpdGUoZGF0YT1bXSkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5maWxlc1VwbG9hZCh7XG4gICAgICBjb250ZW50czogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBwYXRoOiB0aGlzLmZpbGVQYXRoLFxuICAgICAgbW9kZTogXCJvdmVyd3JpdGVcIlxuICAgIH0pLnRoZW4oKCkgPT4gZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJpY0JhY2tlbmQoRHJvcGJveENvbGxlY3Rpb24pO1xuIl19