/**
 * 兼容各端小程序的 API
 */

module.exports = {
  // 交互
  alert:                  require('./alert'),
  confirm:                require('./confirm'),
  showToast:              require('./showToast'),
  showLoading:            require('./showLoading'),
  showActionSheet:        require('./showActionSheet'),

  // 导航栏
  setNavigationBarTitle:  require('./setNavigationBarTitle'),
  setNavigationBarColor:  require('./setNavigationBarColor'),

  // 文件
  saveFile:               require('./saveFile'),
  getFileInfo:            require('./getFileInfo'),
  getSavedFileInfo:       require('./getSavedFileInfo'),
  getSavedFileList:       require('./getSavedFileList'),
  removeSavedFile:        require('./removeSavedFile'),

  // 图片
  chooseImage:            require('./chooseImage'),
  previewImage:           require('./previewImage'),
  compressImage:          require('./compressImage'),
  saveImageToPhotosAlbum: require('./saveImageToPhotosAlbum'),

  // 请求
  request:                require('./request'),
  uploadFile:             require('./uploadFile'),
  downloadFile:           require('./downloadFile'),

  // 数据缓存
  setStorageSync:         require('./setStorageSync'),
  getStorageSync:         require('./getStorageSync'),
  clearStorageSync:       require('./clearStorageSync'),
  getStorageInfoSync:     require('./getStorageInfoSync'),
  removeStorageSync:      require('./removeStorageSync'),

  // 系统设备
  getSystemInfoSync:      require('./getSystemInfoSync'),
  setScreenBrightness:    require('./setScreenBrightness'),
  getScreenBrightness:    require('./getScreenBrightness'),
  makePhoneCall:          require('./makePhoneCall'),
  scanCode:               require('./scanCode'),
  setClipboardData:       require('./setClipboardData'),
  getClipboardData:       require('./getClipboardData'),
}