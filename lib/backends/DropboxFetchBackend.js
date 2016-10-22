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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy9Ecm9wYm94RmV0Y2hCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIkRyb3Bib3hDb2xsZWN0aW9uIiwibmFtZSIsImJhY2tlbmQiLCJ0b2tlbiIsInBhdGgiLCJmaWxlUGF0aCIsInRoZW4iLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUVNQSxpQjtBQUNKLDZCQUFZQyxJQUFaLEVBQWtCQyxPQUFsQixFQUEyQjtBQUFBOztBQUN6QixTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRSxLQUFMLEdBQWFELFFBQVFDLEtBQXJCO0FBQ0Q7Ozs7MkJBTU07QUFDTCxhQUFPLDZCQUFTLEtBQUtBLEtBQWQsRUFBcUIsRUFBRUMsTUFBTSxLQUFLQyxRQUFiLEVBQXJCLEVBQ0pDLElBREksc0JBRUpBLElBRkksMkJBQVA7QUFHRDs7OzRCQUVjO0FBQUEsVUFBVEMsSUFBUyx1RUFBSixFQUFJOztBQUNiLGFBQU8sNEJBQ0wsS0FBS0osS0FEQSxFQUVMSyxLQUFLQyxTQUFMLENBQWVGLElBQWYsQ0FGSyxFQUdMLHVDQUhLLEVBSUwsRUFBQ0gsTUFBTSxLQUFLQyxRQUFaLEVBSkssRUFLTEMsSUFMSyxDQUtBO0FBQUEsZUFBTUMsSUFBTjtBQUFBLE9BTEEsQ0FBUDtBQU1EOzs7d0JBakJjO0FBQ2IsbUJBQVcsS0FBS04sSUFBaEI7QUFDRDs7Ozs7O2tCQWtCWSwyQkFBZUQsaUJBQWYsQyIsImZpbGUiOiJEcm9wYm94RmV0Y2hCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZG93bmxvYWQsIHB1dEZpbGUgfSBmcm9tIFwiZHJvcGJveC1jbGllbnRcIjtcbmltcG9ydCB7IGJpbmFyeVRvSnNvbiwgaGFuZGxlRHJvcGJveEVycm9yLCBnZW5lcmljQmFja2VuZCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIERyb3Bib3hDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgYmFja2VuZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2tlbiA9IGJhY2tlbmQudG9rZW47XG4gIH1cblxuICBnZXQgZmlsZVBhdGgoKSB7XG4gICAgcmV0dXJuIGAvJHt0aGlzLm5hbWV9Lmpzb25gO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gZG93bmxvYWQodGhpcy50b2tlbiwgeyBwYXRoOiB0aGlzLmZpbGVQYXRoIH0pXG4gICAgICAudGhlbihiaW5hcnlUb0pzb24pXG4gICAgICAudGhlbihoYW5kbGVEcm9wYm94RXJyb3IpO1xuICB9XG5cbiAgd3JpdGUoZGF0YT1bXSkge1xuICAgIHJldHVybiBwdXRGaWxlKFxuICAgICAgdGhpcy50b2tlbixcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PWRyb3Bib3gtY29ycy1oYWNrXCIsXG4gICAgICB7cGF0aDogdGhpcy5maWxlUGF0aH1cbiAgICApLnRoZW4oKCkgPT4gZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJpY0JhY2tlbmQoRHJvcGJveENvbGxlY3Rpb24pO1xuIl19