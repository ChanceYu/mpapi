import api from './api'

// 操作反馈
import alert           from './methods/feedback/alert'
import confirm         from './methods/feedback/confirm'
import showActionSheet from './methods/feedback/showActionSheet'
import showLoading     from './methods/feedback/showLoading'
import showToast       from './methods/feedback/showToast'

// 文件相关
import getFileInfo      from './methods/file/getFileInfo'
import getSavedFileInfo from './methods/file/getSavedFileInfo'
import getSavedFileList from './methods/file/getSavedFileList'
import removeSavedFile  from './methods/file/removeSavedFile'
import saveFile         from './methods/file/saveFile'

// 图片相关
import chooseImage  from './methods/image/chooseImage'
import getImageInfo from './methods/image/getImageInfo'
import previewImage from './methods/image/previewImage'

// 请求相关
import downloadFile from './methods/network/downloadFile'
import request      from './methods/network/request'
import uploadFile   from './methods/network/uploadFile'

// 数据缓存
import clearStorage       from './methods/storage/clearStorage'
import clearStorageSync   from './methods/storage/clearStorageSync'
import getStorage         from './methods/storage/getStorage'
import getStorageSync     from './methods/storage/getStorageSync'
import getStorageInfo     from './methods/storage/getStorageInfo'
import getStorageInfoSync from './methods/storage/getStorageInfoSync'
import removeStorage      from './methods/storage/removeStorage'
import removeStorageSync  from './methods/storage/removeStorageSync'
import setStorage         from './methods/storage/setStorage'
import setStorageSync     from './methods/storage/setStorageSync'

api._addMethod({
  alert,
  confirm,
  showActionSheet,
  showLoading,
  showToast,

  getFileInfo,
  getSavedFileInfo,
  getSavedFileList,
  removeSavedFile,
  saveFile,

  chooseImage,
  getImageInfo,
  previewImage,

  downloadFile,
  request,
  uploadFile,

  clearStorage,
  clearStorageSync,
  getStorage,
  getStorageSync,
  getStorageInfo,
  getStorageInfoSync,
  removeStorage,
  removeStorageSync,
  setStorage,
  setStorageSync,
})

module.exports = api