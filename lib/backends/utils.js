"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var binaryToJson = exports.binaryToJson = function binaryToJson(data) {
  return new Promise(function (resolve) {
    var reader = data.content.getReader();
    var result = new Uint8Array();

    reader.read().then(function processText(_ref) {
      var done = _ref.done,
          value = _ref.value;

      if (done) {
        var jsonString = new TextDecoder("utf-8").decode(result);
        return resolve(JSON.parse(jsonString));
      }

      var tmpValue = new Uint8Array(result.length + value.length);
      tmpValue.set(result);
      tmpValue.set(value, result.length);

      result = tmpValue;

      return reader.read().then(processText);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy91dGlscy5qcyJdLCJuYW1lcyI6WyJiaW5hcnlUb0pzb24iLCJQcm9taXNlIiwicmVhZGVyIiwiZGF0YSIsImNvbnRlbnQiLCJnZXRSZWFkZXIiLCJyZXN1bHQiLCJVaW50OEFycmF5IiwicmVhZCIsInRoZW4iLCJwcm9jZXNzVGV4dCIsImRvbmUiLCJ2YWx1ZSIsImpzb25TdHJpbmciLCJUZXh0RGVjb2RlciIsImRlY29kZSIsInJlc29sdmUiLCJKU09OIiwicGFyc2UiLCJ0bXBWYWx1ZSIsImxlbmd0aCIsInNldCIsImhhbmRsZURyb3Bib3hFcnJvciIsImVycm9yIiwiZ2VuZXJpY0JhY2tlbmQiLCJEcm9wYm94QmFja2VuZCIsInRva2VuIiwibmFtZSIsIkNvbGxlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSxzQ0FBZSxTQUFmQSxZQUFlLE9BQVE7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksbUJBQVc7QUFDNUIsUUFBTUMsU0FBU0MsS0FBS0MsT0FBTCxDQUFhQyxTQUFiLEVBQWY7QUFDQSxRQUFJQyxTQUFTLElBQUlDLFVBQUosRUFBYjs7QUFFQUwsV0FBT00sSUFBUCxHQUFjQyxJQUFkLENBQW1CLFNBQVNDLFdBQVQsT0FBc0M7QUFBQSxVQUFmQyxJQUFlLFFBQWZBLElBQWU7QUFBQSxVQUFUQyxLQUFTLFFBQVRBLEtBQVM7O0FBQ3ZELFVBQUlELElBQUosRUFBVTtBQUNSLFlBQU1FLGFBQWEsSUFBSUMsV0FBSixDQUFnQixPQUFoQixFQUF5QkMsTUFBekIsQ0FBZ0NULE1BQWhDLENBQW5CO0FBQ0EsZUFBT1UsUUFBUUMsS0FBS0MsS0FBTCxDQUFXTCxVQUFYLENBQVIsQ0FBUDtBQUNEOztBQUVELFVBQU1NLFdBQVcsSUFBSVosVUFBSixDQUFlRCxPQUFPYyxNQUFQLEdBQWdCUixNQUFNUSxNQUFyQyxDQUFqQjtBQUNBRCxlQUFTRSxHQUFULENBQWFmLE1BQWI7QUFDQWEsZUFBU0UsR0FBVCxDQUFhVCxLQUFiLEVBQW9CTixPQUFPYyxNQUEzQjs7QUFFQWQsZUFBU2EsUUFBVDs7QUFFQSxhQUFPakIsT0FBT00sSUFBUCxHQUFjQyxJQUFkLENBQW1CQyxXQUFuQixDQUFQO0FBQ0QsS0FiRDtBQWNELEdBbEJNLENBQVA7QUFtQkQsQ0FwQk07O0FBdUJBLElBQU1ZLGtEQUFxQixTQUFyQkEsa0JBQXFCLE9BQVE7QUFDeEMsTUFBSW5CLEtBQUtvQixLQUFULEVBQWdCO0FBQ2QsWUFBT3BCLEtBQUtvQixLQUFMLENBQVcsTUFBWCxDQUFQO0FBQ0EsV0FBSyxNQUFMO0FBQ0UsZUFBTyxFQUFQO0FBQ0Y7QUFDRSxjQUFNcEIsS0FBS29CLEtBQVg7QUFKRjtBQU1ELEdBUEQsTUFPTztBQUNMLFdBQU9wQixJQUFQO0FBQ0Q7QUFDRixDQVhNOztBQWNBLElBQU1xQiwwQ0FBaUIsU0FBakJBLGNBQWlCLGFBQWM7QUFBQSxNQUNwQ0MsY0FEb0M7QUFFeEMsNEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7O0FBSnVDO0FBQUE7QUFBQSxpQ0FNN0JDLElBTjZCLEVBTXZCO0FBQ2YsZUFBTyxJQUFJQyxVQUFKLENBQWVELElBQWYsRUFBcUIsSUFBckIsQ0FBUDtBQUNEO0FBUnVDOztBQUFBO0FBQUE7O0FBVzFDLFNBQU9GLGNBQVA7QUFDRCxDQVpNIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGJpbmFyeVRvSnNvbiA9IGRhdGEgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gZGF0YS5jb250ZW50LmdldFJlYWRlcigpO1xuICAgIGxldCByZXN1bHQgPSBuZXcgVWludDhBcnJheSgpO1xuXG4gICAgcmVhZGVyLnJlYWQoKS50aGVuKGZ1bmN0aW9uIHByb2Nlc3NUZXh0KHsgZG9uZSwgdmFsdWUgfSkge1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpLmRlY29kZShyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShKU09OLnBhcnNlKGpzb25TdHJpbmcpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdG1wVmFsdWUgPSBuZXcgVWludDhBcnJheShyZXN1bHQubGVuZ3RoICsgdmFsdWUubGVuZ3RoKTtcbiAgICAgIHRtcFZhbHVlLnNldChyZXN1bHQpO1xuICAgICAgdG1wVmFsdWUuc2V0KHZhbHVlLCByZXN1bHQubGVuZ3RoKTtcblxuICAgICAgcmVzdWx0ID0gdG1wVmFsdWU7XG5cbiAgICAgIHJldHVybiByZWFkZXIucmVhZCgpLnRoZW4ocHJvY2Vzc1RleHQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGhhbmRsZURyb3Bib3hFcnJvciA9IGRhdGEgPT4ge1xuICBpZiAoZGF0YS5lcnJvcikge1xuICAgIHN3aXRjaChkYXRhLmVycm9yW1wiLnRhZ1wiXSkge1xuICAgIGNhc2UgXCJwYXRoXCI6XG4gICAgICByZXR1cm4gW107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IGRhdGEuZXJyb3I7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZW5lcmljQmFja2VuZCA9IENvbGxlY3Rpb24gPT4ge1xuICBjbGFzcyBEcm9wYm94QmFja2VuZCB7XG4gICAgY29uc3RydWN0b3IodG9rZW4pIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB9XG5cbiAgICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBuZXcgQ29sbGVjdGlvbihuYW1lLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gRHJvcGJveEJhY2tlbmQ7XG59O1xuIl19