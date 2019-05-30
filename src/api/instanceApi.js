/**
 * @description: 某些新实例 context 对象上面的 API 包装成 Promise
 * 
 * example:
 * 
 * let mapContext = api.createMapContext(id)
 * 
 * mapContext.$getCenterLocation().then()
 * mapContext.$getRegion().then()
 * ...
 */

module.exports = [
  'createMapContext', // wx my swan
  'createVideoContext', // wx swan
  'createAudioContext', // wx
  'createCameraContext', // wx swan
  'createInnerAudioContext', // wx swan tt
  'createLivePusherContext', // wx
  'createLivePlayerContext', // wx
  'getBackgroundAudioManager', // wx swan
  'getRecorderManager', // wx swan tt
  'createSelectorQuery',
  'getFileSystemManager', // wx
  'createARCameraContext', // swan
]