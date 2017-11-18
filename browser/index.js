/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  DATA_EVENT: "data"
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ComposeWithClass;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ComposeWithClass() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  return function (clazz) {
    var subclazz = function (_clazz) {
      _inherits(subclazz, _clazz);

      function subclazz() {
        _classCallCheck(this, subclazz);

        return _possibleConstructorReturn(this, (subclazz.__proto__ || Object.getPrototypeOf(subclazz)).apply(this, arguments));
      }

      return subclazz;
    }(clazz);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mixin = _step.value;

        Object.assign(subclazz.prototype, mixin);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return subclazz;
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestInfo = exports.debug = exports.parseText = exports.parseJSON = exports.parse = exports.onResponse = exports.handleResponse = exports.recv = exports.params = exports.json = exports.body = exports.query = exports.base = exports.accept = exports.auth = exports.header = exports.method = exports.init = exports.fetch = exports.createFetch = exports.createStack = exports.enhanceFetch = exports.enableRecv = undefined;

var _queryString = __webpack_require__(23);

var _byteLength = __webpack_require__(15);

var _byteLength2 = _interopRequireDefault(_byteLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = (1, eval)('this');

var stringifyQuery = function stringifyQuery(query) {
  return typeof query === 'string' ? query : (0, _queryString.stringify)(query);
};

var stringifyJSON = function stringifyJSON(json) {
  return typeof json === 'string' ? json : JSON.stringify(json);
};

var processResponse = function processResponse(response, handlers) {
  return handlers.reduce(function (promise, handler) {
    return promise.then(handler);
  }, Promise.resolve(response));
};

/**
 * Returns a new fetch function that knows how to execute
 * options.responseHandlers on the response.
 */
var enableRecv = exports.enableRecv = function enableRecv(fetch) {
  return function (input) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return fetch(input, options).then(function (response) {
      var responseHandlers = options.responseHandlers;

      return responseHandlers && responseHandlers.length ? processResponse(response, responseHandlers) : response;
    });
  };
};

// Deprecated.
var enhanceFetch = exports.enhanceFetch = enableRecv;

var emptyStack = function emptyStack(fetch, input, options) {
  return fetch(input, options);
};

/**
 * Creates a middleware "stack" function using all arguments.
 * A "stack" is essentially a bunch of middleware composed into
 * a single middleware function. Since all middleware share the
 * same signature, stacks may further be combined to create more
 * stacks with different characteristics.
 */
var createStack = exports.createStack = function createStack() {
  for (var _len = arguments.length, middleware = Array(_len), _key = 0; _key < _len; _key++) {
    middleware[_key] = arguments[_key];
  }

  if (middleware.length === 0) return emptyStack;

  return middleware.reduceRight(function (inner, outer) {
    return function (fetch, outerInput, outerOptions) {
      return outer(function (innerInput, innerOptions) {
        return inner(fetch, innerInput, innerOptions);
      }, outerInput, outerOptions);
    };
  });
};

/**
 * Creates a fetch function using all arguments as middleware.
 * This function is a "stack" that uses the global fetch, so the
 * following two examples are equivalent:
 *
 *   const stack = createStack(middleware)
 *   stack(global.fetch, input, options)
 *
 *   const fetch = createFetch(middleware)
 *   fetch(input, options)
 *
 * Thus, createFetch essentially eliminates some boilerplate code
 * when you just want to use the global fetch function.
 */
var createFetch = exports.createFetch = function createFetch() {
  if (arguments.length === 0) return global.fetch;

  var stack = createStack.apply(undefined, arguments);

  return enableRecv(function (input) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return stack(global.fetch, input, options);
  });
};

// Deprecated.
var mainFetch = enableRecv(global.fetch);
exports.fetch = mainFetch;

/**
 * Sets a property name and value in the options object.
 */

var init = exports.init = function init(propertyName, value) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options[propertyName] = value;
    return fetch(input, options);
  };
};

/**
 * Sets the request method.
 */
var method = exports.method = function method(verb) {
  return init('method', verb);
};

var setHeader = function setHeader(options, name, value) {
  (options.headers || (options.headers = {}))[name] = value;
};

/**
 * Adds a header to the request.
 */
var header = exports.header = function header(name, value) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    setHeader(options, name, value);
    return fetch(input, options);
  };
};

/**
 * Adds an Authorization header to the request.
 */
var auth = exports.auth = function auth(value) {
  return header('Authorization', value);
};

/**
 * Adds an Accept header to the request.
 */
var accept = exports.accept = function accept(value) {
  return header('Accept', value);
};

/**
 * Adds the given string at the front of the request URL.
 */
var base = exports.base = function base(baseURL) {
  return function (fetch, input, options) {
    return fetch(baseURL + (input || ''), options);
  };
};

/**
 * Adds the given object to the query string in the request.
 */
var query = exports.query = function query(object) {
  var queryString = stringifyQuery(object);

  return function (fetch, input, options) {
    return fetch(input + (input.indexOf('?') === -1 ? '?' : '&') + queryString, options);
  };
};

/**
 * Adds the given content to the request.
 */
var body = exports.body = function body(content, contentType) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options.body = content;

    if (content.length != null) setHeader(options, 'Content-Length', (0, _byteLength2.default)(content));

    if (contentType) setHeader(options, 'Content-Type', contentType);

    return fetch(input, options);
  };
};

/**
 * Adds an application/json payload to the request.
 */
var json = exports.json = function json(object) {
  return body(stringifyJSON(object), 'application/json');
};

/**
 * Adds the given object to the query string of GET/HEAD requests
 * and as a application/x-www-form-urlencoded payload on all others.
 */
var params = exports.params = function params(object) {
  var queryString = stringifyQuery(object);

  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var verb = (options.method || 'GET').toUpperCase();
    var middleware = verb === 'GET' || verb === 'HEAD' ? query(queryString) : body(queryString, 'application/x-www-form-urlencoded');

    return middleware(fetch, input, options);
  };
};

/**
 * A helper for creating middleware that handles a successful response.
 */
var recv = exports.recv = function recv(handler) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    (options.responseHandlers || (options.responseHandlers = [])).push(handler);
    return fetch(input, options);
  };
};

// Deprecated.
var handleResponse = exports.handleResponse = recv;
var onResponse = exports.onResponse = recv;

/**
 * Reads the response stream to completion, parses its content
 * using the given parser, and adds the result to response.body.
 */
var parse = exports.parse = function parse(parser) {
  var as = arguments.length <= 1 || arguments[1] === undefined ? 'body' : arguments[1];
  return recv(function (response) {
    if (as in response) return response[as];

    return response[parser]().then(function (body) {
      response[as] = body;
      return response;
    }, function (error) {
      throw new Error('parse(\'' + parser + '\') error: ' + error.stack);
    });
  });
};

// Deprecated.
var parseJSON = exports.parseJSON = function parseJSON() {
  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'jsonData' : arguments[0];
  return parse('json', propertyName);
};

// Deprecated.
var parseText = exports.parseText = function parseText() {
  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'textString' : arguments[0];
  return parse('text', propertyName);
};

/**
 * Adds a debug property to the response/error that contains
 * the input and options used in the request. Mainly useful in
 * testing and debugging.
 */
var debug = exports.debug = function debug() {
  return function (fetch, input, options) {
    return fetch(input, options).then(function (response) {
      response.debug = { input: input, options: options };
      return response;
    }, function () {
      var error = arguments.length <= 0 || arguments[0] === undefined ? new Error() : arguments[0];

      error.debug = { input: input, options: options };
      throw error;
    });
  };
};

// Deprecated.
var requestInfo = exports.requestInfo = function requestInfo() {
  return function (fetch, input, options) {
    return fetch(input, options).then(function (response) {
      response.requestInput = input;
      response.requestOptions = options;
      return response;
    }, function () {
      var error = arguments.length <= 0 || arguments[0] === undefined ? new Error() : arguments[0];

      error.requestInput = input;
      error.requestOptions = options;
      throw error;
    });
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = __webpack_require__(9);

var _Collection2 = _interopRequireDefault(_Collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Luggage = function () {
  function Luggage(backend) {
    _classCallCheck(this, Luggage);

    this.backend = backend;
  }

  _createClass(Luggage, [{
    key: "collection",
    value: function collection(name) {
      return new _Collection2.default(name, this.backend);
    }
  }]);

  return Luggage;
}();

exports.default = Luggage;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dropboxClient = __webpack_require__(22);

var _utils = __webpack_require__(11);

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var downloadApiPath = "https://content.dropboxapi.com/2/files/download";
var uploadApiPath = "https://content.dropboxapi.com/2/files/upload";

var DropboxCollection = function () {
  function DropboxCollection(name, backend) {
    _classCallCheck(this, DropboxCollection);

    this.name = name;
    this.token = backend.token;
  }

  _createClass(DropboxCollection, [{
    key: "read",
    value: function read() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function () {
          var data = JSON.parse(request.responseText);

          if (data.error) {
            if (data.error[".tag"] === "path") {
              resolve([]);
            } else {
              reject(data.error);
            }
          } else {
            resolve(data);
          }
        };

        request.ontimeout = function () {
          reject(request.responseText);
        };
        request.onerror = function () {
          reject(request.responseText);
        };
        request.open("POST", downloadApiPath);
        request.setRequestHeader("Authorization", "Bearer " + _this.token);
        request.setRequestHeader("Dropbox-API-Arg", JSON.stringify({ path: "/" + _this.fileName }));
        request.send();
      });
    }
  }, {
    key: "write",
    value: function write() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function () {
          var response = request.responseText;
          if (response.error) {
            reject(response.error);
          } else {
            resolve(data);
          }
        };

        request.ontimeout = function () {
          reject(request.responseText);
        };
        request.onerror = function () {
          reject(request.responseText);
        };
        request.open("POST", uploadApiPath);
        request.setRequestHeader("Authorization", "Bearer " + _this2.token);
        request.setRequestHeader("Dropbox-API-Arg", JSON.stringify({ path: "/" + _this2.fileName, mode: "overwrite" }));
        request.setRequestHeader("Content-Type", "text/plain; charset=dropbox-cors-hack");
        request.send(JSON.stringify(data));
      });
    }
  }, {
    key: "fileName",
    get: function get() {
      return this.name + ".json";
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DummyBackendCollection = function () {
  function DummyBackendCollection(data) {
    _classCallCheck(this, DummyBackendCollection);

    this.data = data;
  }

  _createClass(DummyBackendCollection, [{
    key: "read",
    value: function read() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        resolve(_this.data);
      });
    }
  }, {
    key: "write",
    value: function write(data) {
      return new Promise(function (resolve, reject) {
        resolve(data);
      });
    }
  }]);

  return DummyBackendCollection;
}();

var DummyBackend = function () {
  function DummyBackend(name, data) {
    _classCallCheck(this, DummyBackend);

    this.collections = _defineProperty({}, name, new DummyBackendCollection(data));
  }

  _createClass(DummyBackend, [{
    key: "collection",
    value: function collection(name) {
      return this.collections.hasOwnProperty(name) ? this.collections[name] : new DummyBackendCollection([]);
    }
  }]);

  return DummyBackend;
}();

exports.default = DummyBackend;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _deepEqual = __webpack_require__(16);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _events = __webpack_require__(3);

var _events2 = __webpack_require__(0);

var _events3 = _interopRequireDefault(_events2);

var _Filterable2 = __webpack_require__(14);

var _Filterable3 = _interopRequireDefault(_Filterable2);

var _compose = __webpack_require__(1);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collection = (_dec = (0, _compose2.default)(_events.EventEmitter.prototype), _dec(_class = function (_Filterable) {
  _inherits(Collection, _Filterable);

  function Collection(name, backend) {
    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this));

    _this.backend = backend.collection(name);
    _this.name = name;
    return _this;
  }

  _createClass(Collection, [{
    key: "read",
    value: function read() {
      return this.backend.read().then(this.dataChanged.bind(this));
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.backend.write(data).then(this.dataChanged.bind(this));
    }
  }, {
    key: "dataChanged",
    value: function dataChanged(data) {
      this.emit(_events3.default.DATA_EVENT, data);
      return data;
    }
  }, {
    key: "add",
    value: function add(newRecord) {
      var _this2 = this;

      return this.backend.read().then(function (data) {
        data.push(newRecord);
        return Promise.all([newRecord, _this2.write(data)]);
      });
    }
  }, {
    key: "updateRecord",
    value: function updateRecord(record, transform) {
      var _this3 = this;

      return Promise.all([record.read(), this.read()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            record = _ref2[0],
            data = _ref2[1];

        var recordIndex = data.findIndex(function (r) {
          return (0, _deepEqual2.default)(r, record);
        });
        return [recordIndex, record, data];
      }).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3),
            recordIndex = _ref4[0],
            record = _ref4[1],
            data = _ref4[2];

        var newRecord = transform.call(null, Object.assign({}, record));
        data[recordIndex] = newRecord;
        return Promise.all([newRecord, record, _this3.write(data)]);
      });
    }
  }, {
    key: "deleteRecord",
    value: function deleteRecord(record) {
      var _this4 = this;

      return Promise.all([record.read(), this.read()]).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            record = _ref6[0],
            data = _ref6[1];

        var recordIndex = data.findIndex(function (r) {
          return (0, _deepEqual2.default)(r, record);
        });
        data.splice(recordIndex, 1);
        return Promise.all([record, _this4.write(data)]);
      });
    }
  }]);

  return Collection;
}(_Filterable3.default)) || _class);
exports.default = Collection;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _events = __webpack_require__(3);

var _events2 = __webpack_require__(0);

var _events3 = _interopRequireDefault(_events2);

var _compose = __webpack_require__(1);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function wrapTransform(transform) {
  if (typeof transform === "function") {
    return transform;
  }

  return function (record) {
    return Object.assign({}, record, transform);
  };
}

var Record = (_dec = (0, _compose2.default)(_events.EventEmitter.prototype), _dec(_class = function () {
  function Record(collection) {
    _classCallCheck(this, Record);

    this.collection = collection;
    this.collection.on(_events3.default.DATA_EVENT, this.dataChanged.bind(this));
  }

  _createClass(Record, [{
    key: "read",
    value: function read() {
      return this.collection.read().then(function (data) {
        return data[0];
      });
    }
  }, {
    key: "update",
    value: function update(transform) {
      return this.collection.updateRecord(this, wrapTransform(transform));
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this.collection.deleteRecord(this);
    }
  }, {
    key: "dataChanged",
    value: function dataChanged(data) {
      this.emit(_events3.default.DATA_EVENT, data[0]);
    }
  }]);

  return Record;
}()) || _class);
exports.default = Record;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Luggage = __webpack_require__(5);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Luggage).default;
  }
});
Object.defineProperty(exports, 'Luggage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Luggage).default;
  }
});

var _DropboxXMLHttpBackend = __webpack_require__(7);

Object.defineProperty(exports, 'DropboxXMLHttpBackend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropboxXMLHttpBackend).default;
  }
});

var _DropboxBackend = __webpack_require__(6);

Object.defineProperty(exports, 'DropboxBackend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropboxBackend).default;
  }
});

var _DummyBackend = __webpack_require__(8);

Object.defineProperty(exports, 'DummyBackend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DummyBackend).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delegate;
function delegate(that, what, whom) {
  that[what] = whom[what].bind(whom);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(3);

var _events2 = __webpack_require__(0);

var _events3 = _interopRequireDefault(_events2);

var _delegate = __webpack_require__(13);

var _delegate2 = _interopRequireDefault(_delegate);

var _compose = __webpack_require__(1);

var _compose2 = _interopRequireDefault(_compose);

var _Record = __webpack_require__(10);

var _Record2 = _interopRequireDefault(_Record);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function wrapFilter(filter) {
  if (typeof filter === "function") {
    return filter;
  }

  return function (item) {
    return Object.keys(filter).every(function (k) {
      return filter[k] === item[k];
    });
  };
}

var Filterable = function () {
  function Filterable() {
    _classCallCheck(this, Filterable);
  }

  _createClass(Filterable, [{
    key: "where",
    value: function where(filter) {
      return new FilteredCollection(this, wrapFilter(filter));
    }
  }, {
    key: "and",
    value: function and(filter) {
      return this.where(filter);
    }
  }, {
    key: "find",
    value: function find(filter) {
      return new _Record2.default(this.where(filter));
    }
  }]);

  return Filterable;
}();

var FilteredCollection = (_dec = (0, _compose2.default)(_events.EventEmitter.prototype), _dec(_class = function (_Filterable) {
  _inherits(FilteredCollection, _Filterable);

  function FilteredCollection(collection, filter) {
    _classCallCheck(this, FilteredCollection);

    var _this = _possibleConstructorReturn(this, (FilteredCollection.__proto__ || Object.getPrototypeOf(FilteredCollection)).call(this));

    _this.collection = collection;
    _this.filter = filter;

    _this.collection.on(_events3.default.DATA_EVENT, _this.dataChanged.bind(_this));

    (0, _delegate2.default)(_this, "updateRecord", _this.collection);
    (0, _delegate2.default)(_this, "deleteRecord", _this.collection);
    return _this;
  }

  _createClass(FilteredCollection, [{
    key: "read",
    value: function read() {
      var _this2 = this;

      return this.collection.read().then(function (data) {
        return data.filter(_this2.filter);
      });
    }
  }, {
    key: "dataChanged",
    value: function dataChanged(data) {
      this.emit(_events3.default.DATA_EVENT, data.filter(this.filter));
    }
  }]);

  return FilteredCollection;
}(Filterable)) || _class);
exports.default = Filterable;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Calculate the byte lengths for utf8 encoded strings.
 *
 * @param {String} str
 * @return {Number}
 */
module.exports = function byteLength (str) {
  var i, len;
  if (!str) return 0;
  str = str.toString();

  for (i = len = str.length; i--;) {
    var code = str[i].charCodeAt();
    if (0xDC00 <= code && code <= 0xDFFF) i--;
    if (0x7f < code && code <= 0x7ff) len++;
    else if (0x7ff < code && code <= 0xffff) len += 2;
  }

  return len;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(18);
var isArguments = __webpack_require__(17);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBearerToken = exports.generateAuthorizeURL = undefined;

var _queryString = __webpack_require__(25);

var _httpClient = __webpack_require__(2);

var generateAuthorizeURL = exports.generateAuthorizeURL = function generateAuthorizeURL(client_id, redirect_uri, state) {
  var force_reapprove = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
  return 'https://www.dropbox.com/1/oauth2/authorize?' + (0, _queryString.stringify)({
    response_type: 'code',
    client_id: client_id,
    redirect_uri: redirect_uri,
    state: state,
    force_reapprove: force_reapprove
  });
};

var getData = function getData(response) {
  var data = response.jsonData;

  if (data.error) throw new Error(data.error + ': ' + data.error_description);

  return data;
};

var getAccessToken = function getAccessToken(data) {
  return data.access_token;
};

var returnToken = (0, _httpClient.createStack)((0, _httpClient.parseJSON)(), (0, _httpClient.handleResponse)(getData), (0, _httpClient.handleResponse)(getAccessToken));

var getBearerToken = exports.getBearerToken = function getBearerToken(client_id, client_secret, code, redirect_uri) {
  return (0, _httpClient.createFetch)((0, _httpClient.method)('POST'), (0, _httpClient.params)({
    client_id: client_id,
    client_secret: client_secret,
    grant_type: 'authorization_code',
    redirect_uri: redirect_uri,
    code: code
  }), returnToken)('https://api.dropboxapi.com/1/oauth2/token');
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.getThumbnail = exports.getPreview = exports.download = undefined;

var _httpClient = __webpack_require__(2);

var bearerToken = function bearerToken(token) {
  return (0, _httpClient.auth)('Bearer ' + token);
};

var apiVersion = function apiVersion(version) {
  return (0, _httpClient.base)('https://content.dropboxapi.com/' + version);
};

var apiArgs = function apiArgs(args) {
  return (0, _httpClient.header)('Dropbox-API-Arg', JSON.stringify(args));
};

var apiResult = function apiResult() {
  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'apiResult' : arguments[0];
  return (0, _httpClient.handleResponse)(function (response) {
    var result = response.headers.get('Dropbox-API-Result');

    if (result) response[propertyName] = JSON.parse(result);

    return response;
  });
};

var returnFile = (0, _httpClient.createStack)(apiResult(), (0, _httpClient.handleResponse)(function (response) {
  return {
    metadata: response.apiResult,
    content: response.body
  };
}));

var getFile = function getFile(token, path, args) {
  return (0, _httpClient.createFetch)((0, _httpClient.method)('POST'), bearerToken(token), apiVersion(2), apiArgs(args), returnFile)(path);
};

var putFile = function putFile(token, content, contentType, path, args) {
  return (0, _httpClient.createFetch)((0, _httpClient.method)('POST'), bearerToken(token), apiVersion(2), apiArgs(args), (0, _httpClient.body)(content, contentType))(path);
};

var download = exports.download = function download(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return getFile(token, '/files/download', params);
};

var getPreview = exports.getPreview = function getPreview(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return getFile(token, '/files/get_preview', params);
};

var getThumbnail = exports.getThumbnail = function getThumbnail(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return getFile(token, '/files/get_thumbnail', params);
};

var upload = exports.upload = function upload(token, content) {
  var contentType = arguments.length <= 2 || arguments[2] === undefined ? 'application/octet-stream' : arguments[2];
  var params = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
  return putFile(token, content, contentType, '/files/upload', params);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpaceUsage = exports.getCurrentAccount = exports.getAccountBatch = exports.getAccount = exports.listFolderContinue = exports.listFolder = exports.getMetadata = exports.createFolder = exports.copy = undefined;

var _httpClient = __webpack_require__(2);

var bearerToken = function bearerToken(token) {
  return (0, _httpClient.auth)('Bearer ' + token);
};

var apiVersion = function apiVersion(version) {
  return (0, _httpClient.base)('https://api.dropboxapi.com/' + version);
};

var returnJSON = (0, _httpClient.createStack)((0, _httpClient.parseJSON)(), (0, _httpClient.handleResponse)(function (response) {
  var data = response.jsonData;

  if (data.error_summary) throw new Error(data.error_summary);

  return data;
}));

var post = function post(token, path) {
  return (0, _httpClient.createFetch)((0, _httpClient.method)('POST'), bearerToken(token), apiVersion(2), returnJSON)(path);
};

var postParams = function postParams(token, path, params) {
  return (0, _httpClient.createFetch)((0, _httpClient.method)('POST'), bearerToken(token), apiVersion(2), (0, _httpClient.json)(params), returnJSON)(path);
};

var copy = exports.copy = function copy(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return postParams(token, '/files/copy', params);
};

var createFolder = exports.createFolder = function createFolder(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return postParams(token, '/files/create_folder', params);
};

var getMetadata = exports.getMetadata = function getMetadata(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return postParams(token, '/files/get_metadata', params);
};

var listFolder = exports.listFolder = function listFolder(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return postParams(token, '/files/list_folder', params);
};

var listFolderContinue = exports.listFolderContinue = function listFolderContinue(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return postParams(token, '/files/list_folder/continue', params);
};

var getAccount = exports.getAccount = function getAccount(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return postParams(token, '/users/get_account', params);
};

var getAccountBatch = exports.getAccountBatch = function getAccountBatch(token) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return postParams(token, '/users/get_account_batch', params);
};

var getCurrentAccount = exports.getCurrentAccount = function getCurrentAccount(token) {
  return post(token, '/users/get_current_account');
};

var getSpaceUsage = exports.getSpaceUsage = function getSpaceUsage(token) {
  return post(token, '/users/get_space_usage');
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DropboxAuth = __webpack_require__(19);

Object.defineProperty(exports, 'generateAuthorizeURL', {
  enumerable: true,
  get: function get() {
    return _DropboxAuth.generateAuthorizeURL;
  }
});
Object.defineProperty(exports, 'getBearerToken', {
  enumerable: true,
  get: function get() {
    return _DropboxAuth.getBearerToken;
  }
});

var _DropboxRPC = __webpack_require__(21);

Object.defineProperty(exports, 'copy', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.copy;
  }
});
Object.defineProperty(exports, 'createFolder', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.createFolder;
  }
});
Object.defineProperty(exports, 'getMetadata', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.getMetadata;
  }
});
Object.defineProperty(exports, 'listFolder', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.listFolder;
  }
});
Object.defineProperty(exports, 'listFolderContinue', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.listFolderContinue;
  }
});
Object.defineProperty(exports, 'getAccount', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.getAccount;
  }
});
Object.defineProperty(exports, 'getAccountBatch', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.getAccountBatch;
  }
});
Object.defineProperty(exports, 'getCurrentAccount', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.getCurrentAccount;
  }
});
Object.defineProperty(exports, 'getSpaceUsage', {
  enumerable: true,
  get: function get() {
    return _DropboxRPC.getSpaceUsage;
  }
});

var _DropboxContent = __webpack_require__(20);

Object.defineProperty(exports, 'download', {
  enumerable: true,
  get: function get() {
    return _DropboxContent.download;
  }
});
Object.defineProperty(exports, 'getPreview', {
  enumerable: true,
  get: function get() {
    return _DropboxContent.getPreview;
  }
});
Object.defineProperty(exports, 'getThumbnail', {
  enumerable: true,
  get: function get() {
    return _DropboxContent.getThumbnail;
  }
});
Object.defineProperty(exports, 'upload', {
  enumerable: true,
  get: function get() {
    return _DropboxContent.upload;
  }
});
Object.defineProperty(exports, 'getFile', {
  enumerable: true,
  get: function get() {
    return _DropboxContent.download;
  }
});
Object.defineProperty(exports, 'putFile', {
  enumerable: true,
  get: function get() {
    return _DropboxContent.upload;
  }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(4);
var objectAssign = __webpack_require__(24);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);

				key = key.replace(/\[\]$/, '');

				if (!result || accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(4);

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str) {
	if (typeof str !== 'string') {
		return {};
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return {};
	}

	return str.split('&').reduce(function (ret, param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}

		return ret;
	}, {});
};

exports.stringify = function (obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return key;
		}

		if (Array.isArray(val)) {
			return val.slice().sort().map(function (val2) {
				return strictUriEncode(key) + '=' + strictUriEncode(val2);
			}).join('&');
		}

		return strictUriEncode(key) + '=' + strictUriEncode(val);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ })
/******/ ]);