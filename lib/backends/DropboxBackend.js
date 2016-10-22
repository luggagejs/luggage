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
      token: backend.token
    });
  }

  _createClass(DropboxCollection, [{
    key: "read",
    value: function read() {
      return client.filesDownload({ path: this.filePath }).then(_utils.binaryToJson).then(_utils.handleDropboxError);
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      client.filesUpload({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94QmFja2VuZC5qcyJdLCJuYW1lcyI6WyJEcm9wYm94Q29sbGVjdGlvbiIsIm5hbWUiLCJiYWNrZW5kIiwiY2xpZW50IiwidG9rZW4iLCJmaWxlc0Rvd25sb2FkIiwicGF0aCIsImZpbGVQYXRoIiwidGhlbiIsImRhdGEiLCJmaWxlc1VwbG9hZCIsImNvbnRlbnRzIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsaUI7QUFDSiw2QkFBWUMsSUFBWixFQUFrQkMsT0FBbEIsRUFBMkI7QUFBQTs7QUFDekIsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLHNCQUFZO0FBQ3hCQyxhQUFPRixRQUFRRTtBQURTLEtBQVosQ0FBZDtBQUdEOzs7OzJCQU1NO0FBQ0wsYUFBT0QsT0FBT0UsYUFBUCxDQUFxQixFQUFFQyxNQUFNLEtBQUtDLFFBQWIsRUFBckIsRUFDSkMsSUFESSxzQkFFSkEsSUFGSSwyQkFBUDtBQUdEOzs7NEJBRWM7QUFBQSxVQUFUQyxJQUFTLHVFQUFKLEVBQUk7O0FBQ2JOLGFBQU9PLFdBQVAsQ0FBbUI7QUFDakJDLGtCQUFVQyxLQUFLQyxTQUFMLENBQWVKLElBQWYsQ0FETztBQUVqQkgsY0FBTSxLQUFLQztBQUZNLE9BQW5CLEVBR0dDLElBSEgsQ0FHUTtBQUFBLGVBQU1DLElBQU47QUFBQSxPQUhSO0FBSUQ7Ozt3QkFmYztBQUNiLG1CQUFXLEtBQUtSLElBQWhCO0FBQ0Q7Ozs7OztrQkFnQlksMkJBQWVELGlCQUFmLEMiLCJmaWxlIjoiRHJvcGJveEJhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJvcGJveCBmcm9tIFwiZHJvcGJveFwiO1xuaW1wb3J0IHsgYmluYXJ5VG9Kc29uLCBoYW5kbGVEcm9wYm94RXJyb3IsIGdlbmVyaWNCYWNrZW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgRHJvcGJveENvbGxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBiYWNrZW5kKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmNsaWVudCA9IG5ldyBEcm9wYm94KHtcbiAgICAgIHRva2VuOiBiYWNrZW5kLnRva2VuXG4gICAgfSk7XG4gIH1cblxuICBnZXQgZmlsZVBhdGgoKSB7XG4gICAgcmV0dXJuIGAvJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gY2xpZW50LmZpbGVzRG93bmxvYWQoeyBwYXRoOiB0aGlzLmZpbGVQYXRoIH0pXG4gICAgICAudGhlbihiaW5hcnlUb0pzb24pXG4gICAgICAudGhlbihoYW5kbGVEcm9wYm94RXJyb3IpO1xuICB9XG5cbiAgd3JpdGUoZGF0YT1bXSkge1xuICAgIGNsaWVudC5maWxlc1VwbG9hZCh7XG4gICAgICBjb250ZW50czogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBwYXRoOiB0aGlzLmZpbGVQYXRoXG4gICAgfSkudGhlbigoKSA9PiBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmljQmFja2VuZChEcm9wYm94Q29sbGVjdGlvbik7XG4iXX0=