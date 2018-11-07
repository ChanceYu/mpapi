/*!
 * mpapi
 * version: 0.0.6
 * address: https://github.com/ChanceYu/mpapi#readme
 * description: 小程序API兼容插件，一次编写，多端运行。支持：微信小程序、支付宝小程序、百度智能小程序
 * author:  ChanceYu
 * license: MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mpApi", [], factory);
	else if(typeof exports === 'object')
		exports["mpApi"] = factory();
	else
		root["mpApi"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nocallback = __webpack_require__(2);

var _nocallback2 = _interopRequireDefault(_nocallback);

var _event = __webpack_require__(30);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 微信小程序
var isWechat = typeof wx !== 'undefined' && typeof wx.showToast === 'function';

// 支付宝小程序
var isAlipay = typeof my !== 'undefined' && typeof my.showToast === 'function';

// 百度智能小程序
var isSwan = typeof swan !== 'undefined' && typeof swan.showToast === 'function';

var $global = isWechat ? wx : isAlipay ? my : swan;

var _toString = Object.prototype.toString;

/**
 * 挂载API
 */
function _addMethod(methods) {
  var _this = this;

  Object.assign(this, methods);

  // 其它 API 或属性

  var _loop = function _loop(attr) {
    if (_this.hasOwnProperty(attr)) return 'continue';

    if (typeof $global[attr] === 'function') {

      _this[attr] = function (opts) {
        var type = _toString.call(opts);

        if ((type === '[object Undefined]' || type === '[object Object]') && _nocallback2.default.indexOf(attr) === -1) {
          return _Promised(attr, opts);
        } else {
          return $global[attr](opts);
        }
      };
    } else {
      _this[attr] = $global[attr];
    }
  };

  for (var attr in $global) {
    var _ret = _loop(attr);

    if (_ret === 'continue') continue;
  }
}

/**
 * Promise包装
 * @param {string} method 
 * @param {object} opts 
 * @param {function} onResolve 
 * @param {function} onReject 
 * @param {function} onInvoke 
 */
function _Promised(method) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onResolve = arguments[2];
  var onReject = arguments[3];

  var oEvent = new _event2.default();
  var defer = new Promise(function (resolve, reject) {
    var _success = opts.success;
    var _fail = opts.fail;

    opts.success = function (res) {
      onResolve && onResolve(res);
      _success && _success(res);
      resolve(res);
    };
    opts.fail = function (res) {
      onReject && onReject(res);
      _fail && _fail(res);
      reject(res);
    };

    if (typeof $global[method] === 'function') {
      var source = $global[method](opts);

      oEvent.trigger(source);
    }
  });

  defer.__proto__.$event = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return oEvent.fire.apply(oEvent, args);
  };
  defer.__proto__.$get = function () {
    return oEvent.source;
  };

  return defer;
}

module.exports = {
  isWechat: isWechat,
  isAlipay: isAlipay,
  isSwan: isSwan,
  $global: $global,
  _addMethod: _addMethod,
  _Promised: _Promised
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

var _alert = __webpack_require__(3);

var _alert2 = _interopRequireDefault(_alert);

var _confirm = __webpack_require__(4);

var _confirm2 = _interopRequireDefault(_confirm);

var _showActionSheet = __webpack_require__(5);

var _showActionSheet2 = _interopRequireDefault(_showActionSheet);

var _showLoading = __webpack_require__(6);

var _showLoading2 = _interopRequireDefault(_showLoading);

var _showToast = __webpack_require__(7);

var _showToast2 = _interopRequireDefault(_showToast);

var _getFileInfo = __webpack_require__(8);

var _getFileInfo2 = _interopRequireDefault(_getFileInfo);

var _getSavedFileInfo = __webpack_require__(9);

var _getSavedFileInfo2 = _interopRequireDefault(_getSavedFileInfo);

var _getSavedFileList = __webpack_require__(10);

var _getSavedFileList2 = _interopRequireDefault(_getSavedFileList);

var _removeSavedFile = __webpack_require__(11);

var _removeSavedFile2 = _interopRequireDefault(_removeSavedFile);

var _saveFile = __webpack_require__(12);

var _saveFile2 = _interopRequireDefault(_saveFile);

var _chooseImage = __webpack_require__(13);

var _chooseImage2 = _interopRequireDefault(_chooseImage);

var _getImageInfo = __webpack_require__(14);

var _getImageInfo2 = _interopRequireDefault(_getImageInfo);

var _previewImage = __webpack_require__(15);

var _previewImage2 = _interopRequireDefault(_previewImage);

var _downloadFile = __webpack_require__(16);

var _downloadFile2 = _interopRequireDefault(_downloadFile);

var _request = __webpack_require__(17);

var _request2 = _interopRequireDefault(_request);

var _uploadFile = __webpack_require__(18);

var _uploadFile2 = _interopRequireDefault(_uploadFile);

var _clearStorage = __webpack_require__(19);

var _clearStorage2 = _interopRequireDefault(_clearStorage);

var _clearStorageSync = __webpack_require__(20);

var _clearStorageSync2 = _interopRequireDefault(_clearStorageSync);

var _getStorage = __webpack_require__(21);

var _getStorage2 = _interopRequireDefault(_getStorage);

var _getStorageSync = __webpack_require__(22);

var _getStorageSync2 = _interopRequireDefault(_getStorageSync);

var _getStorageInfo = __webpack_require__(23);

var _getStorageInfo2 = _interopRequireDefault(_getStorageInfo);

var _getStorageInfoSync = __webpack_require__(24);

var _getStorageInfoSync2 = _interopRequireDefault(_getStorageInfoSync);

var _removeStorage = __webpack_require__(25);

var _removeStorage2 = _interopRequireDefault(_removeStorage);

var _removeStorageSync = __webpack_require__(26);

var _removeStorageSync2 = _interopRequireDefault(_removeStorageSync);

var _setStorage = __webpack_require__(27);

var _setStorage2 = _interopRequireDefault(_setStorage);

var _setStorageSync = __webpack_require__(28);

var _setStorageSync2 = _interopRequireDefault(_setStorageSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 数据缓存


// 图片相关


// 操作反馈
_api2.default._addMethod({
  alert: _alert2.default,
  confirm: _confirm2.default,
  showActionSheet: _showActionSheet2.default,
  showLoading: _showLoading2.default,
  showToast: _showToast2.default,

  getFileInfo: _getFileInfo2.default,
  getSavedFileInfo: _getSavedFileInfo2.default,
  getSavedFileList: _getSavedFileList2.default,
  removeSavedFile: _removeSavedFile2.default,
  saveFile: _saveFile2.default,

  chooseImage: _chooseImage2.default,
  getImageInfo: _getImageInfo2.default,
  previewImage: _previewImage2.default,

  downloadFile: _downloadFile2.default,
  request: _request2.default,
  uploadFile: _uploadFile2.default,

  clearStorage: _clearStorage2.default,
  clearStorageSync: _clearStorageSync2.default,
  getStorage: _getStorage2.default,
  getStorageSync: _getStorageSync2.default,
  getStorageInfo: _getStorageInfo2.default,
  getStorageInfoSync: _getStorageInfoSync2.default,
  removeStorage: _removeStorage2.default,
  removeStorageSync: _removeStorageSync2.default,
  setStorage: _setStorage2.default,
  setStorageSync: _setStorageSync2.default
});

// 请求相关


// 文件相关


module.exports = _api2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 无 success 回调的 API（不能包装成 Promise）
 */
module.exports = ['createInnerAudioContext', 'getRecorderManager', 'getBackgroundAudioManager', 'createCameraContext', 'createLivePusherContext', 'getFileSystemManager', 'getBatteryInfoSync', 'getMenuButtonBoundingClientRect', 'createAnimation', 'getUpdateManager', 'createIntersectionObserver', 'createSelectorQuery', 'getSystemInfoSync', 'getExtConfigSync', 'getLogManager'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

var defaults = {
  title: '',
  showCancel: false,
  confirmText: '确定'
};

module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      content: opts
    };
  }

  opts = Object.assign({}, defaults, opts);

  if (_api.isAlipay) {
    opts.buttonText = opts.confirmText;
  }

  return (0, _api._Promised)(_api.isAlipay ? 'alert' : 'showModal', opts);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

var defaults = {
  title: '提示',
  showCancel: true,
  confirmText: '确定',
  cancelText: '取消'
};

module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      content: opts
    };
  }

  opts = Object.assign({}, defaults, opts);

  if (_api.isAlipay) {
    opts.confirmButtonText = opts.confirmText;
    opts.cancelButtonText = opts.cancelText;
  }

  return (0, _api._Promised)(_api.isAlipay ? 'confirm' : 'showModal', opts);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

var defaults = {
  itemList: []
};

module.exports = function (opts) {
  opts = Object.assign({}, defaults, opts);

  if (_api.isAlipay) {
    opts.items = opts.itemList;
  }

  return (0, _api._Promised)('showActionSheet', opts, function (res) {
    if (_api.isAlipay) {
      res.tapIndex = res.index;
    }
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

var defaults = {
  title: '加载中',
  mask: true
};

module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      title: opts
    };
  }

  opts = Object.assign({}, defaults, opts);

  if (_api.isAlipay) {
    opts.content = opts.title;
  }

  return (0, _api._Promised)('showLoading', opts);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

var defaults = {
  title: '',
  icon: 'none'
};

module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      title: opts
    };
  }

  opts = Object.assign({}, defaults, opts);

  if (_api.isAlipay) {
    opts.content = opts.title;
    opts.type = opts.icon;
  }

  return (0, _api._Promised)('showToast', opts);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (_api.isAlipay) {
    opts.apFilePath = opts.filePath;
  }

  return (0, _api._Promised)('getFileInfo', opts);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (_api.isAlipay) {
    opts.apFilePath = opts.filePath;
  }

  return (0, _api._Promised)('getSavedFileInfo', opts);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('getSavedFileList', opts, function (res) {
    var fileList = res.fileList || [];

    if (_api.isAlipay) {
      fileList.map(function (item) {
        item.filePath = item.apFilePath;
        return item;
      });
    }
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (_api.isAlipay) {
    opts.apFilePath = opts.filePath;
  }

  return (0, _api._Promised)('removeSavedFile', opts);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (_api.isAlipay) {
    opts.apFilePath = opts.tempFilePath;
  }

  return (0, _api._Promised)('saveFile', opts, function (res) {
    if (_api.isAlipay) {
      res.savedFilePath = res.apFilePath;
    }
  });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

var defaults = {
  count: 1
};

module.exports = function (opts) {
  opts = Object.assign({}, defaults, opts);

  return (0, _api._Promised)('chooseImage', opts, function (res) {
    if (_api.isAlipay) {
      res.tempFilePaths = res.apFilePaths;
    }
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('getImageInfo', opts);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  var current = opts.current;
  var urls = opts.urls || [];

  if (!_api.isAlipay && typeof current === 'number') {
    current = urls[0];
  }

  if (_api.isAlipay && typeof current === 'string') {
    current = urls.indexOf(current);

    if (current === -1) current = 0;
  }

  if (typeof current !== 'undefined') {
    opts.current = current;
  }

  return (0, _api._Promised)('previewImage', opts);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('downloadFile', opts, function (res) {
    if (_api.isAlipay) {
      res.tempFilePath = res.apFilePath;
    }
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (_api.isAlipay) {
    opts.headers = opts.header;
  }

  return (0, _api._Promised)(_api.isAlipay ? 'httpRequest' : 'request', opts, function (res) {
    if (_api.isAlipay) {
      res.statusCode = res.status;
      res.header = res.headers;
    }
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (_api.isAlipay) {
    opts.fileName = opts.name;
  } else {
    opts.name = opts.fileName;
  }

  return (0, _api._Promised)('uploadFile', opts);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('clearStorage', opts);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function () {
  try {
    _api.$global.clearStorageSync();
  } catch (e) {}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('getStorage', opts);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      key: opts
    };
  }

  try {
    if (_api.isAlipay) {
      var res = _api.$global.getStorageSync(opts) || {};

      return res.data;
    } else {
      return _api.$global.getStorageSync(opts.key);
    }
  } catch (e) {}
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('getStorageInfo', opts);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function () {
  try {
    return _api.$global.getStorageInfoSync();
  } catch (e) {}
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('removeStorage', opts);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      key: opts
    };
  }

  try {
    if (_api.isAlipay) {
      _api.$global.removeStorageSync(opts);
    } else {
      _api.$global.removeStorageSync(opts.key);
    }
  } catch (e) {}
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts) {
  return (0, _api._Promised)('setStorage', opts);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(0);

module.exports = function (opts, data) {
  if (typeof opts === 'string') {
    opts = {
      key: opts,
      data: data
    };
  }

  try {
    if (_api.isAlipay) {
      _api.$global.setStorageSync(opts);
    } else {
      _api.$global.setStorageSync(opts.key, opts.data);
    }
  } catch (e) {}
};

/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event() {
    _classCallCheck(this, Event);

    this.listeners = [];
  }

  _createClass(Event, [{
    key: 'fire',
    value: function fire(name) {
      for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        value[_key - 1] = arguments[_key];
      }

      this.listeners.push({
        name: name,
        value: value
      });

      this.trigger();
    }
  }, {
    key: 'trigger',
    value: function trigger(s) {
      if (s) this.source = s;

      var source = this.source;
      if (!source) return;

      while (this.listeners.length) {
        var event = this.listeners.shift();
        var name = event.name,
            value = event.value;


        if (typeof source[name] === 'function') {
          source[name].apply(source, _toConsumableArray(value));
        }
      }
    }
  }]);

  return Event;
}();

module.exports = Event;

/***/ })
/******/ ]);
});