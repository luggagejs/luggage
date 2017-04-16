"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var binaryToJson = exports.binaryToJson = function binaryToJson(data) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function (e) {
      resolve(JSON.parse(e.target.result));
    };

    reader.readAsText(data.fileBlob);
  });
};

var handleDropboxError = exports.handleDropboxError = function handleDropboxError(data) {
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
};

var genericBackend = exports.genericBackend = function genericBackend(Collection) {
  var DropboxBackend = function () {
    function DropboxBackend(token) {
      _classCallCheck(this, DropboxBackend);

      this.token = token;
    }

    _createClass(DropboxBackend, [{
      key: "collection",
      value: function collection(name) {
        return new Collection(name, this);
      }
    }]);

    return DropboxBackend;
  }();

  return DropboxBackend;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy91dGlscy5qcyJdLCJuYW1lcyI6WyJiaW5hcnlUb0pzb24iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJKU09OIiwicGFyc2UiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwicmVhZEFzVGV4dCIsImRhdGEiLCJmaWxlQmxvYiIsImhhbmRsZURyb3Bib3hFcnJvciIsImVycm9yIiwiZ2VuZXJpY0JhY2tlbmQiLCJEcm9wYm94QmFja2VuZCIsInRva2VuIiwibmFtZSIsIkNvbGxlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSxzQ0FBZSxTQUFmQSxZQUFlLE9BQVE7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFFBQU1DLFNBQVMsSUFBSUMsVUFBSixFQUFmOztBQUVBRCxXQUFPRSxNQUFQLEdBQWdCLGFBQUs7QUFDbkJKLGNBQVFLLEtBQUtDLEtBQUwsQ0FBV0MsRUFBRUMsTUFBRixDQUFTQyxNQUFwQixDQUFSO0FBQ0QsS0FGRDs7QUFJQVAsV0FBT1EsVUFBUCxDQUFrQkMsS0FBS0MsUUFBdkI7QUFDRCxHQVJNLENBQVA7QUFTRCxDQVZNOztBQWFBLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCLE9BQVE7QUFDeEMsTUFBSUYsS0FBS0csS0FBVCxFQUFnQjtBQUNkLFlBQU9ILEtBQUtHLEtBQUwsQ0FBVyxNQUFYLENBQVA7QUFDQSxXQUFLLE1BQUw7QUFDRSxlQUFPLEVBQVA7QUFDRjtBQUNFLGNBQU1ILEtBQUtHLEtBQVg7QUFKRjtBQU1ELEdBUEQsTUFPTztBQUNMLFdBQU9ILElBQVA7QUFDRDtBQUNGLENBWE07O0FBY0EsSUFBTUksMENBQWlCLFNBQWpCQSxjQUFpQixhQUFjO0FBQUEsTUFDcENDLGNBRG9DO0FBRXhDLDRCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNEOztBQUp1QztBQUFBO0FBQUEsaUNBTTdCQyxJQU42QixFQU12QjtBQUNmLGVBQU8sSUFBSUMsVUFBSixDQUFlRCxJQUFmLEVBQXFCLElBQXJCLENBQVA7QUFDRDtBQVJ1Qzs7QUFBQTtBQUFBOztBQVcxQyxTQUFPRixjQUFQO0FBQ0QsQ0FaTSIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBiaW5hcnlUb0pzb24gPSBkYXRhID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgcmVhZGVyLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGUudGFyZ2V0LnJlc3VsdCkpO1xuICAgIH07XG5cbiAgICByZWFkZXIucmVhZEFzVGV4dChkYXRhLmZpbGVCbG9iKTtcbiAgfSk7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVEcm9wYm94RXJyb3IgPSBkYXRhID0+IHtcbiAgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICBzd2l0Y2goZGF0YS5lcnJvcltcIi50YWdcIl0pIHtcbiAgICBjYXNlIFwicGF0aFwiOlxuICAgICAgcmV0dXJuIFtdO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBkYXRhLmVycm9yO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufTtcblxuXG5leHBvcnQgY29uc3QgZ2VuZXJpY0JhY2tlbmQgPSBDb2xsZWN0aW9uID0+IHtcbiAgY2xhc3MgRHJvcGJveEJhY2tlbmQge1xuICAgIGNvbnN0cnVjdG9yKHRva2VuKSB7XG4gICAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgfVxuXG4gICAgY29sbGVjdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gbmV3IENvbGxlY3Rpb24obmFtZSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIERyb3Bib3hCYWNrZW5kO1xufTtcbiJdfQ==