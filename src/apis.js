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
  'hideToast',
  'hideLoading',
  'showModal', // wx swan tt
  'prompt', // my

  // 缓存
  'getStorage',
  'setStorage',
  'removeStorage',
  'getStorageInfo',

  // 路由
  'reLaunch',
  'switchTab',
  'redirectTo',
  'navigateTo',
  'navigateBack',

  // 位置
  'getLocation',
  'openLocation',
  'chooseLocation', // wx my swan

  // 文件图片
  'saveImage', // my
  'getImageInfo',
  'chooseVideo', // wx swan tt
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
  'startPullDownRefresh',
  'stopPullDownRefresh',

  // 滚动
  'pageScrollTo',

  // WebSocket
  'sendSocketMessage', // wx my swan
  'connectSocket',
  'closeSocket', // wx my swan

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
  'getSystemInfo',
  'getBatteryInfo', // wx my swan
  'getNetworkType',
  'setKeepScreenOn', // wx my swan
  'startAccelerometer', // wx swan tt
  'stopAccelerometer', // wx swan tt
  'startCompass', // wx swan tt
  'stopCompass', // wx swan tt
  'startDeviceMotionListening', // wx swan
  'stopDeviceMotionListening', // wx swan
  'startGyroscope', // wx swan
  'stopGyroscope', // wx swan
  'vibrate', // my
  'vibrateShort',
  'vibrateLong',
  'watchShake', // my
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
  'getExtConfig', // wx swan
]