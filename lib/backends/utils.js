"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var binaryToJson = exports.binaryToJson = function binaryToJson(data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZW5kcy91dGlscy5qcyJdLCJuYW1lcyI6WyJiaW5hcnlUb0pzb24iLCJwYXJ0aWFsQ29udGVudCIsImRlY29kZXIiLCJUZXh0RGVjb2RlciIsInJlYWRlciIsImRhdGEiLCJjb250ZW50IiwiZ2V0UmVhZGVyIiwicmVhZCIsInRoZW4iLCJyZXN1bHQiLCJkb25lIiwiZGVjb2RlIiwidmFsdWUiLCJzdHJlYW0iLCJKU09OIiwicGFyc2UiLCJoYW5kbGVEcm9wYm94RXJyb3IiLCJlcnJvciIsImdlbmVyaWNCYWNrZW5kIiwiRHJvcGJveEJhY2tlbmQiLCJ0b2tlbiIsIm5hbWUiLCJDb2xsZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQU8sSUFBTUEsc0NBQWUsU0FBZkEsWUFBZSxPQUFRO0FBQ2xDLE1BQUlDLGlCQUFpQixFQUFyQjtBQUNBLE1BQU1DLFVBQVUsSUFBSUMsV0FBSixFQUFoQjtBQUNBLE1BQU1DLFNBQVNDLEtBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUFmOztBQUVBLE1BQU1DLE9BQU8sU0FBUEEsSUFBTyxHQUFNO0FBQ2pCLFdBQU9KLE9BQU9JLElBQVAsR0FBY0MsSUFBZCxDQUFtQixrQkFBVTtBQUNsQyxVQUFJLENBQUNDLE9BQU9DLElBQVosRUFBa0I7QUFDaEJWLDBCQUFrQkMsUUFBUVUsTUFBUixDQUFlRixPQUFPRyxLQUF0QixFQUE2QjtBQUM3Q0Msa0JBQVE7QUFEcUMsU0FBN0IsQ0FBbEI7O0FBSUEsZUFBT04sTUFBUDtBQUNELE9BTkQsTUFNTztBQUNMLGVBQU9PLEtBQUtDLEtBQUwsQ0FBV2YsY0FBWCxDQUFQO0FBQ0Q7QUFDRixLQVZNLENBQVA7QUFXRCxHQVpEOztBQWNBLFNBQU9PLE1BQVA7QUFDRCxDQXBCTTs7QUF1QkEsSUFBTVMsa0RBQXFCLFNBQXJCQSxrQkFBcUIsT0FBUTtBQUN4QyxNQUFJWixLQUFLYSxLQUFULEVBQWdCO0FBQ2QsWUFBT2IsS0FBS2EsS0FBTCxDQUFXLE1BQVgsQ0FBUDtBQUNBLFdBQUssTUFBTDtBQUNFLGVBQU8sRUFBUDtBQUNGO0FBQ0UsY0FBTWIsS0FBS2EsS0FBWDtBQUpGO0FBTUQsR0FQRCxNQU9PO0FBQ0wsV0FBT2IsSUFBUDtBQUNEO0FBQ0YsQ0FYTTs7QUFjQSxJQUFNYywwQ0FBaUIsU0FBakJBLGNBQWlCLGFBQWM7QUFBQSxNQUNwQ0MsY0FEb0M7QUFFeEMsNEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7O0FBSnVDO0FBQUE7QUFBQSxpQ0FNN0JDLElBTjZCLEVBTXZCO0FBQ2YsZUFBTyxJQUFJQyxVQUFKLENBQWVELElBQWYsRUFBcUIsSUFBckIsQ0FBUDtBQUNEO0FBUnVDOztBQUFBO0FBQUE7O0FBVzFDLFNBQU9GLGNBQVA7QUFDRCxDQVpNIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGJpbmFyeVRvSnNvbiA9IGRhdGEgPT4ge1xuICBsZXQgcGFydGlhbENvbnRlbnQgPSBcIlwiO1xuICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gIGNvbnN0IHJlYWRlciA9IGRhdGEuY29udGVudC5nZXRSZWFkZXIoKTtcblxuICBjb25zdCByZWFkID0gKCkgPT4ge1xuICAgIHJldHVybiByZWFkZXIucmVhZCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmICghcmVzdWx0LmRvbmUpIHtcbiAgICAgICAgcGFydGlhbENvbnRlbnQgKz0gZGVjb2Rlci5kZWNvZGUocmVzdWx0LnZhbHVlLCB7XG4gICAgICAgICAgc3RyZWFtOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZWFkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShwYXJ0aWFsQ29udGVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHJlYWQoKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGhhbmRsZURyb3Bib3hFcnJvciA9IGRhdGEgPT4ge1xuICBpZiAoZGF0YS5lcnJvcikge1xuICAgIHN3aXRjaChkYXRhLmVycm9yW1wiLnRhZ1wiXSkge1xuICAgIGNhc2UgXCJwYXRoXCI6XG4gICAgICByZXR1cm4gW107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IGRhdGEuZXJyb3I7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59O1xuXG5cbmV4cG9ydCBjb25zdCBnZW5lcmljQmFja2VuZCA9IENvbGxlY3Rpb24gPT4ge1xuICBjbGFzcyBEcm9wYm94QmFja2VuZCB7XG4gICAgY29uc3RydWN0b3IodG9rZW4pIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB9XG5cbiAgICBjb2xsZWN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBuZXcgQ29sbGVjdGlvbihuYW1lLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gRHJvcGJveEJhY2tlbmQ7XG59O1xuIl19