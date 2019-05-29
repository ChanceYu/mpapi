/*!
 * mpapi
 * version: 0.2.0
 * address: https://github.com/ChanceYu/mpapi#readme
 * description: 小程序API兼容插件，一次编写，多端运行。支持：微信小程序、支付宝小程序、百度智能小程序、字节跳动小程序
 * author:  ChanceYu
 * license: MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("$api", [], factory);
	else if(typeof exports === 'object')
		exports["$api"] = factory();
	else
		root["$api"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _env = __webpack_require__(1);

var _env2 = _interopRequireDefault(_env);

var _polyfills = __webpack_require__(2);

var _polyfills2 = _interopRequireDefault(_polyfills);

var _apis = __webpack_require__(34);

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 全局对象
var $global = _env2.default.$global;

var api = {
  isWechat: _env2.default.isWechat,
  isAlipay: _env2.default.isAlipay,
  isSwan: _env2.default.isSwan,
  isTt: _env2.default.isTt,
  $global: $global,
  $promisfy: $promisfy,
  $promisfyApi: $promisfyApi

  // 包装成 Promise 或要兼容的小程序 API
};Object.assign(api, _polyfills2.default);

// 包装成 Promise 的小程序 API
$promisfyApi(_apis2.default);

// 挂载小程序其它 API
for (var method in $global) {
  if (api.hasOwnProperty(method)) continue;

  api[method] = $global[method];
}

/**
 * Promise 包装
 */
function $promisfy(method) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onResolve = arguments[2];
  var onReject = arguments[3];
  var context = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : $global;

  var source = void 0;
  var eventList = [];
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

    // 没有此方法忽略
    if (!isFunction(context[method])) return;

    source = context[method](opts);

    if (source) {
      if (eventList.length) {
        eventList.forEach(function (item) {
          applyEvent(source, item.event, item.args);
        });
        eventList = [];
      }
    }
  });

  // 提供 request、downloadFile 等特殊 API 的处理方法（既要支持 Promise，又要调用它的事件）
  defer.__proto__.$event = function (event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (source) {
      applyEvent(source, event, args);
    } else {
      eventList.push({ event: event, args: args });
    }
  };

  return defer;
}

/**
 * 处理特殊 API 的事件
 */
function applyEvent(source, event, args) {
  if (event in source) {
    if (isFunction(source[event])) {
      return source[event].apply(source, args);
    } else {
      return source[event];
    }
  }
}

/**
 * 一次包装多个 API
 */
function $promisfyApi(methods) {
  if (isString(methods)) methods = [methods];
  if (!isArray(methods)) return;

  methods.forEach(function (method) {
    if (isFunction($global[method])) {
      api[method] = function (opts) {
        return $promisfy(method, opts);
      };
    }
  });
}

function isFunction(val) {
  return typeof val === 'function';
}

function isString(val) {
  return typeof val === 'string';
}

function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

module.exports = api;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 微信小程序
var isWechat = typeof wx !== 'undefined' && typeof wx.showToast === 'function';

// 支付宝小程序
var isAlipay = typeof my !== 'undefined' && typeof my.showToast === 'function';

// 百度智能小程序
var isSwan = typeof swan !== 'undefined' && typeof swan.showToast === 'function';

// 字节跳动小程序
var isTt = typeof tt !== 'undefined' && typeof tt.showToast === 'function';

// 全局对象
var $global = isWechat ? wx : isAlipay ? my : isSwan ? swan : isTt ? tt : '';

if (!$global) {
  throw new Error('请在小程序环境中使用，支持：微信小程序、支付宝小程序、百度智能小程序、头条小程序');
}

module.exports = {
  isWechat: isWechat,
  isAlipay: isAlipay,
  isSwan: isSwan,
  isTt: isTt,
  $global: $global
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 兼容各端小程序的 API
 */

module.exports = {
  // 交互
  alert: __webpack_require__(3),
  confirm: __webpack_require__(4),
  showToast: __webpack_require__(5),
  showLoading: __webpack_require__(6),
  showActionSheet: __webpack_require__(7),

  // 导航栏
  setNavigationBarTitle: __webpack_require__(8),
  setNavigationBarColor: __webpack_require__(9),

  // 文件
  saveFile: __webpack_require__(10),
  getFileInfo: __webpack_require__(11),
  getSavedFileInfo: __webpack_require__(12),
  getSavedFileList: __webpack_require__(13),
  removeSavedFile: __webpack_require__(14),

  // 图片
  chooseImage: __webpack_require__(15),
  previewImage: __webpack_require__(16),
  compressImage: __webpack_require__(17),
  saveImageToPhotosAlbum: __webpack_require__(18),

  // 请求
  request: __webpack_require__(19),
  uploadFile: __webpack_require__(20),
  downloadFile: __webpack_require__(21),

  // 数据缓存
  setStorageSync: __webpack_require__(22),
  getStorageSync: __webpack_require__(23),
  clearStorageSync: __webpack_require__(24),
  getStorageInfoSync: __webpack_require__(25),
  removeStorageSync: __webpack_require__(26),

  // 系统设备
  getSystemInfoSync: __webpack_require__(27),
  setScreenBrightness: __webpack_require__(28),
  getScreenBrightness: __webpack_require__(29),
  makePhoneCall: __webpack_require__(30),
  scanCode: __webpack_require__(31),
  setClipboardData: __webpack_require__(32),
  getClipboardData: __webpack_require__(33)
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      content: opts
    };
  }

  opts = Object.assign({
    title: '',
    showCancel: false,
    confirmText: '确定'
  }, opts);

  if (this.isAlipay) {
    opts.buttonText = opts.buttonText || opts.confirmText;
  }

  return this.$promisfy(this.isAlipay ? 'alert' : 'showModal', opts);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      content: opts
    };
  }

  opts = Object.assign({
    title: '提示',
    showCancel: true,
    confirmText: '确定',
    cancelText: '取消'
  }, opts);

  if (this.isAlipay) {
    opts.confirmButtonText = opts.confirmButtonText || opts.confirmText;
    opts.cancelButtonText = opts.cancelButtonText || opts.cancelText;
  }

  return this.$promisfy(this.isAlipay ? 'confirm' : 'showModal', opts);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      title: opts
    };
  }

  opts = Object.assign({
    title: '',
    icon: 'none'
  }, opts);

  if (this.isAlipay) {
    opts.content = opts.content || opts.title;
    opts.type = opts.type || opts.icon;
  }

  return this.$promisfy('showToast', opts);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      title: opts
    };
  }

  opts = Object.assign({
    title: '加载中',
    mask: true
  }, opts);

  if (this.isAlipay) {
    opts.content = opts.content || opts.title;
  }

  return this.$promisfy('showLoading', opts);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  opts = Object.assign({
    itemList: []
  }, opts);

  if (this.isAlipay) {
    opts.items = opts.items || opts.itemList;
  }

  return this.$promisfy('showActionSheet', opts, function (res) {
    if (_this.isAlipay) {
      res.tapIndex = res.index;
    }
  });
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      title: opts
    };
  }

  return this.$promisfy(this.isAlipay ? 'setNavigationBar' : 'setNavigationBarTitle', opts);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      backgroundColor: opts
    };
  }

  return this.$promisfy(this.isAlipay ? 'setNavigationBar' : 'setNavigationBarColor', opts);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  if (this.isAlipay) {
    opts.apFilePath = opts.apFilePath || opts.tempFilePath;
  }

  return this.$promisfy('saveFile', opts, function (res) {
    if (_this.isAlipay) {
      res.savedFilePath = res.apFilePath;
    }
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.apFilePath = opts.apFilePath || opts.filePath;
  }

  return this.$promisfy('getFileInfo', opts);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.apFilePath = opts.apFilePath || opts.filePath;
  }

  return this.$promisfy('getSavedFileInfo', opts);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  return this.$promisfy('getSavedFileList', opts, function (res) {
    var fileList = res.fileList || [];

    if (_this.isAlipay) {
      fileList.map(function (item) {
        item.filePath = item.apFilePath;
        return item;
      });
    }
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.apFilePath = opts.apFilePath || opts.filePath;
  }

  return this.$promisfy('removeSavedFile', opts);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  opts = Object.assign({
    count: 1
  }, opts);

  return this.$promisfy('chooseImage', opts, function (res) {
    if (_this.isAlipay) {
      res.tempFilePaths = res.apFilePaths;
    }
  });
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var current = opts.current;
  var urls = opts.urls || [];

  if (!this.isAlipay && typeof current === 'number') {
    current = urls[0];
  }

  if (this.isAlipay && typeof current === 'string') {
    current = urls.indexOf(current);

    if (current === -1) current = 0;
  }

  if (typeof current !== 'undefined') {
    opts.current = current;
  }

  return this.$promisfy('previewImage', opts);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  if (this.isAlipay) {
    // 支付宝小程序支持压缩多张，微信小程序只支持压缩一张
    opts.apFilePaths = opts.apFilePaths || [opts.src];
  }

  return this.$promisfy('compressImage', opts, function (res) {
    if (_this.isAlipay) {
      res.tempFilePath = res.apFilePaths[0];
    }
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.url = opts.url || opts.filePath;
  }

  return this.$promisfy(this.isAlipay ? 'saveImage' : 'saveImageToPhotosAlbum', opts);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  if (this.isAlipay) {
    opts.headers = opts.headers || opts.header;
  }

  return this.$promisfy(this.isAlipay ? 'httpRequest' : 'request', opts, function (res) {
    if (_this.isAlipay) {
      res.statusCode = res.status;
      res.header = res.headers;
    }
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.fileName = opts.fileName || opts.name;
  } else {
    opts.name = opts.name || opts.fileName;
  }

  return this.$promisfy('uploadFile', opts);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  return this.$promisfy('downloadFile', opts, function (res) {
    if (_this.isAlipay) {
      res.tempFilePath = res.apFilePath;
    }
  });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts, data) {
  if (typeof opts === 'string') {
    opts = {
      key: opts,
      data: data
    };
  }

  try {
    if (this.isAlipay) {
      this.$global.setStorageSync(opts);
    } else {
      this.$global.setStorageSync(opts.key, opts.data);
    }
  } catch (e) {}
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      key: opts
    };
  }

  try {
    if (this.isAlipay) {
      var res = this.$global.getStorageSync(opts) || {};

      return res.data;
    } else {
      return this.$global.getStorageSync(opts.key);
    }
  } catch (e) {}
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  try {
    this.$global.clearStorageSync();
  } catch (e) {}
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  try {
    return this.$global.getStorageInfoSync();
  } catch (e) {}
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      key: opts
    };
  }

  try {
    if (this.isAlipay) {
      this.$global.removeStorageSync(opts);
    } else {
      this.$global.removeStorageSync(opts.key);
    }
  } catch (e) {}
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  try {
    return this.$global.getSystemInfoSync();
  } catch (e) {}
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.brightness = opts.brightness || opts.value;
  }

  return this.$promisfy('setScreenBrightness', opts);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  return this.$promisfy('getScreenBrightness', opts, function (res) {
    if (_this.isAlipay) {
      res.value = res.brightness;
    }
  });
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.number = opts.number || opts.phoneNumber;
  }

  return this.$promisfy('makePhoneCall', opts);
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPE_MAP = {
  barCode: 'bar',
  qrCode: 'qr'
};

module.exports = function (opts) {
  var _this = this;

  if (this.isAlipay) {
    opts.hideAlbum = opts.onlyFromCamera;

    if (opts.scanType) {
      opts.type = opts.type || TYPE_MAP[opts.scanType[0]];
    }
  }

  return this.$promisfy(this.isAlipay ? 'scan' : 'scanCode', opts, function (res) {
    if (_this.isAlipay) {
      res.result = res.code;
    }
  });
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  if (this.isAlipay) {
    opts.text = opts.text || opts.data;
  }

  return this.$promisfy(this.isAlipay ? 'setClipboard' : 'setClipboardData', opts);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  var _this = this;

  return this.$promisfy(this.isAlipay ? 'getClipboard' : 'getClipboardData', opts, function (res) {
    if (_this.isAlipay) {
      res.data = res.text;
    }
  });
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @description: 需要简单包装成 Promise 的 API
 * @updateDate: 2019-05-30（最后修改日期）
 *
 * wx: 微信小程序
 * my: 支付宝小程序
 * tt: 字节跳动小程序
 * swan: 百度智能小程序
 * 
 * 不写备注表示支持所有小程序平台（除了标注的开放接口以外）
 */

module.exports = [
// 交互
'hideToast', 'hideLoading', 'showModal', // wx swan tt
'prompt', // my

// 缓存
'getStorage', 'setStorage', 'removeStorage', 'getStorageInfo',

// 路由
'reLaunch', 'switchTab', 'redirectTo', 'navigateTo', 'navigateBack',

// 位置
'getLocation', 'openLocation', 'chooseLocation', // wx my swan

// 文件图片
'saveImage', // my
'getImageInfo', 'chooseVideo', // wx swan tt
'chooseMessageFile', // wx
'saveVideoToPhotosAlbum', // wx swan tt
'openDocument', // wx swan

// 音频
'stopVoice', // wx
'playVoice', // wx
'getAvailableAudioSources', // wx
'stopBackgroundAudio', // wx
'playBackgroundAudio', // wx
'seekBackgroundAudio', // wx
'pauseBackgroundAudio', // wx
'getBackgroundAudioPlayerState', // wx
'setInnerAudioOption', // wx swan
'startRecord', // wx
'stopRecord', // wx
'stopRecord', // wx

// 导航栏
'getTitleColor', // my
'setNavigationBar', // my
'showNavigationBarLoading', // wx my swan
'hideNavigationBarLoading', // wx my swan

// 背景
'setBackgroundTextStyle', // wx my swan
'setBackgroundColor', // wx my swan

// TabBar
'showTabBar', // wx my swan
'hideTabBar', // wx my swan
'setTabBarItem', // wx my swan
'setTabBarStyle', // wx my swan
'showTabBarRedDot', // wx my swan
'hideTabBarRedDot', // wx my swan
'setTabBarBadge', // wx my swan
'removeTabBarBadge', // wx my swan

// 下拉刷新
'startPullDownRefresh', 'stopPullDownRefresh',

// 滚动
'pageScrollTo',

// WebSocket
'sendSocketMessage', // wx my swan
'connectSocket', 'closeSocket', // wx my swan

// mDNS 服务
'startLocalServiceDiscovery', // wx
'stopLocalServiceDiscovery', // wx

// 置顶
'setTopBarText', // wx

// 画布
'canvasGetImageData', // wx swan tt
'canvasPutImageData', // wx swan tt
'canvasToTempFilePath', // wx swan tt

// 分享转发
'getShareInfo', // wx
'updateShareMenu', // wx
'showShareMenu', // wx tt
'hideShareMenu', // wx my tt
'showFavoriteGuide', // swan
'openShare', // swan

// 登录、授权、用户信息
'login', // wx swan
'checkSession', // wx swan
'getUserInfo', // wx swan
'getAuthCode', // my
'getAuthUserInfo', // my
'getPhoneNumber', // my
'authorize', // wx

// 支付
'tradePay', // my
'requestPayment', // wx
'requestPolymerPayment', // swan

// 开放接口
'reportAnalytics', // wx my swan
'getSetting', // wx my swan
'openSetting', // wx my swan
'chooseInvoiceTitle', // wx swan
'navigateToMiniProgram', // wx my
'navigateBackMiniProgram', // wx my

// 开放接口 - 微信小程序
'addCard', // wx
'openCard', // wx
'chooseInvoice', // wx
'startSoterAuthentication', // wx
'checkIsSoterEnrolledInDevice', // wx
'checkIsSupportSoterAuthentication', // wx
'getWeRunData', // wx

// 开放接口 - 支付宝小程序
'startZMVerify', // my
'textRiskIdentification', // my
'addCardAuth', // my
'getRunScene', // my
'chooseCity', // my
'datePicker', // my
'optionsSelect', // my
'multiLevelSelect', // my
'rsa', // my

// 开放接口 - 百度智能小程序
'getSwanId', // swan
'navigateToSmartProgram', // swan
'navigateBackSmartProgram', // swan
'setPageInfo', // swan
'setMetaDescription', // swan
'setMetaKeywords', // swan
'setDocumentTitle', // swan
'loadSubPackage', // swan

// 联系人
'chooseAddress', // wx swan
'chooseContact', // my
'choosePhoneContact', // my
'chooseAlipayContact', // my
'addPhoneContact', // wx my swan

// 字体加载
'loadFontFace', // wx my

// 系统信息
'getSystemInfo', 'getBatteryInfo', // wx my swan
'getNetworkType', 'setKeepScreenOn', // wx my swan
'startAccelerometer', // wx swan tt
'stopAccelerometer', // wx swan tt
'startCompass', // wx swan tt
'stopCompass', // wx swan tt
'startDeviceMotionListening', // wx swan
'stopDeviceMotionListening', // wx swan
'startGyroscope', // wx swan
'stopGyroscope', // wx swan
'vibrate', // my
'vibrateShort', 'vibrateLong', 'watchShake', // my
'setEnableDebug', // wx swan
'getServerTime', // my
'scan', // my

// 蓝牙无线
'getBeacons', // wx my
'startBeaconDiscovery', // wx my
'stopBeaconDiscovery', // wx my
'startWifi', // wx
'stopWifi', // wx
'setWifiList', // wx
'getWifiList', // wx
'connectWifi', // wx
'getConnectedWifi', // wx
'getBLEDeviceServices', // wx my
'getBLEDeviceCharacteristics', // wx my
'createBLEConnection', // wx my
'closeBLEConnection', // wx my
'writeBLECharacteristicValue', // wx my
'readBLECharacteristicValue', // wx my
'notifyBLECharacteristicValueChange', // wx my
'startBluetoothDevicesDiscovery', // wx my
'stopBluetoothDevicesDiscovery', // wx my
'openBluetoothAdapter', // wx my
'getConnectedBluetoothDevices', // wx my
'getBluetoothDevices', // wx my
'getBluetoothAdapterState', // wx my
'closeBluetoothAdapter', // wx my
'stopHCE', // wx
'startHCE', // wx
'getHCEState', // wx
'sendHCEMessage', // wx

// 第三方平台
'getExtConfig'];

/***/ })
/******/ ]);
});