# mpapi

> mpapi（miniProgram API），优雅的小程序API兼容插件，一次编写，多端运行。支持：微信小程序、支付宝小程序、百度智能小程序、字节跳动小程序

[![NPM][img-npm]][url-npm]

[![Language][img-javascript]][url-github]
[![License][img-mit]][url-mit]

**此项目解决的问题**：寻找不同小程序 API 之间的差异，尽可能地通过**一套 API 兼容多个小程序使用**。


## 特点
- 一次编写，多端运行，支持: 微信小程序、支付宝小程序、百度智能小程序、字节跳动小程序
- 支持 Promise（包含success回调的才有）
- 支持特殊 API 的事件处理，例如：`request`、`downloadFile`，[详情查看](#特殊api的事件处理)
- 支持不同端的判断，`api.isWechat`、`api.isAlipay`、`api.isSwan`、`api.isTt`


## 安装
非npm安装方式，直接引入 `lib` 目录下的 `mpapi.js` 到项目即可
```bash
npm install mpapi --save
```
使用
```javascript
const api = require('mpapi')

api.alert({...}).then((res) => {})
api.confirm({...}).then((res) => {})
api.getLocation().then((res) => {})
...

// 微信小程序的处理
if(api.isWechat){
  api.setTopBarText({...}).then((res) => {})
}

// 支付宝小程序的处理
if(api.isAlipay){
  api.startZMVerify({...}).then((res) => {})
}

// 百度智能小程序的处理
if(api.isSwan){
  api.getSwanId().then((res) => {})
}
```


## 快速查看
- [兼容API列表](#兼容api列表)
- [其它包装成Promise的API](#其它包装成promise的api)
- [API差异](#小程序之间的api差异)
- [使用说明](#使用说明)
- [特殊API的事件处理](#特殊api的事件处理)，`request`、`downloadFile`、`uploadFile` 等
- 官方API文档：[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/)、[支付宝小程序](https://docs.alipay.com/mini/api/overview)、[百度智能小程序](http://smartprogram.baidu.com/docs/develop/api/net_rule/)、[字节跳动小程序](https://developer.toutiao.com/docs/framework/)

## 兼容API列表
> 所有小程序都可以使用的 API

- 交互
  - [x] `alert`
  - [x] `confirm`
  - [x] `showToast`
  - [x] `showLoading`
  - [x] `showActionSheet`


- 导航栏
  - [x] `setNavigationBarTitle`
  - [x] `setNavigationBarColor`


- 文件
  - [x] `saveFile`
  - [x] `getFileInfo`
  - [x] `getSavedFileInfo`
  - [x] `getSavedFileList`
  - [x] `removeSavedFile`


- 图片
  - [x] `chooseImage`
  - [x] `previewImage`
  - [x] `compressImage`
  - [x] `saveImageToPhotosAlbum`


- 请求
  - [x] `request`
  - [x] `uploadFile`
  - [x] `downloadFile`


- 数据缓存
  - [x] `setStorageSync`
  - [x] `getStorageSync`
  - [x] `clearStorageSync`
  - [x] `getStorageInfoSync`
  - [x] `removeStorageSync`


- 系统设备
  - [x] `getSystemInfoSync`
  - [x] `setScreenBrightness`
  - [x] `getScreenBrightness`
  - [x] `makePhoneCall`
  - [x] `scanCode`
  - [x] `setClipboardData`
  - [x] `getClipboardData`




## 其它包装成Promise的API
> 只在特定小程序下才会支持，默认支持所有。

微信小程序![](./assets/wx.png)、支付宝小程序![](./assets/my.png)、百度智能小程序![](./assets/swan.png)、字节跳动小程序![](./assets/tt.png)，有对应图标表示支持。


- 交互
  - [x] `hideToast` 
  - [x] `hideLoading` 
  - [x] `showModal`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `prompt`  ![](./assets/my.png) 


- 缓存
  - [x] `getStorage` 
  - [x] `setStorage` 
  - [x] `removeStorage` 
  - [x] `getStorageInfo` 


- 路由
  - [x] `reLaunch` 
  - [x] `switchTab` 
  - [x] `redirectTo` 
  - [x] `navigateTo` 
  - [x] `navigateBack` 


- 位置
  - [x] `getLocation` 
  - [x] `openLocation` 
  - [x] `chooseLocation`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 


- 文件图片
  - [x] `saveImage`  ![](./assets/my.png) 
  - [x] `getImageInfo` 
  - [x] `chooseVideo`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `chooseMessageFile`  ![](./assets/wx.png) 
  - [x] `saveVideoToPhotosAlbum`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `openDocument`  ![](./assets/wx.png)  ![](./assets/swan.png) 


- 音频
  - [x] `stopVoice`  ![](./assets/wx.png) 
  - [x] `playVoice`  ![](./assets/wx.png) 
  - [x] `getAvailableAudioSources`  ![](./assets/wx.png) 
  - [x] `stopBackgroundAudio`  ![](./assets/wx.png) 
  - [x] `playBackgroundAudio`  ![](./assets/wx.png) 
  - [x] `seekBackgroundAudio`  ![](./assets/wx.png) 
  - [x] `pauseBackgroundAudio`  ![](./assets/wx.png) 
  - [x] `getBackgroundAudioPlayerState`  ![](./assets/wx.png) 
  - [x] `setInnerAudioOption`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `startRecord`  ![](./assets/wx.png) 
  - [x] `stopRecord`  ![](./assets/wx.png) 
  - [x] `stopRecord`  ![](./assets/wx.png) 


- 导航栏
  - [x] `getTitleColor`  ![](./assets/my.png) 
  - [x] `setNavigationBar`  ![](./assets/my.png) 
  - [x] `showNavigationBarLoading`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `hideNavigationBarLoading`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 


- 背景
  - [x] `setBackgroundTextStyle`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `setBackgroundColor`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `showTabBar`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `hideTabBar`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `setTabBarItem`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `setTabBarStyle`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `showTabBarRedDot`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `hideTabBarRedDot`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `setTabBarBadge`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `removeTabBarBadge`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 


- 下拉刷新
  - [x] `startPullDownRefresh` 
  - [x] `stopPullDownRefresh` 


- 滚动
  - [x] `pageScrollTo` 
  - [x] `sendSocketMessage`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `connectSocket` 
  - [x] `closeSocket`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `startLocalServiceDiscovery`  ![](./assets/wx.png) 
  - [x] `stopLocalServiceDiscovery`  ![](./assets/wx.png) 


- 置顶
  - [x] `setTopBarText`  ![](./assets/wx.png) 


- 画布
  - [x] `canvasGetImageData`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `canvasPutImageData`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `canvasToTempFilePath`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 


- 分享转发
  - [x] `getShareInfo`  ![](./assets/wx.png) 
  - [x] `updateShareMenu`  ![](./assets/wx.png) 
  - [x] `showShareMenu`  ![](./assets/wx.png)  ![](./assets/tt.png) 
  - [x] `hideShareMenu`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/tt.png) 
  - [x] `showFavoriteGuide`  ![](./assets/swan.png) 
  - [x] `openShare`  ![](./assets/swan.png) 


- 登录、授权、用户信息
  - [x] `login`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `checkSession`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `getUserInfo`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `getAuthCode`  ![](./assets/my.png) 
  - [x] `getAuthUserInfo`  ![](./assets/my.png) 
  - [x] `getPhoneNumber`  ![](./assets/my.png) 
  - [x] `authorize`  ![](./assets/wx.png) 


- 支付
  - [x] `tradePay`  ![](./assets/my.png) 
  - [x] `requestPayment`  ![](./assets/wx.png) 
  - [x] `requestPolymerPayment`  ![](./assets/swan.png) 


- 开放接口
  - [x] `reportAnalytics`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `getSetting`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `openSetting`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `chooseInvoiceTitle`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `navigateToMiniProgram`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `navigateBackMiniProgram`  ![](./assets/wx.png)  ![](./assets/my.png) 


- 开放接口 - 微信小程序
  - [x] `addCard`  ![](./assets/wx.png) 
  - [x] `openCard`  ![](./assets/wx.png) 
  - [x] `chooseInvoice`  ![](./assets/wx.png) 
  - [x] `startSoterAuthentication`  ![](./assets/wx.png) 
  - [x] `checkIsSoterEnrolledInDevice`  ![](./assets/wx.png) 
  - [x] `checkIsSupportSoterAuthentication`  ![](./assets/wx.png) 
  - [x] `getWeRunData`  ![](./assets/wx.png) 


- 开放接口 - 支付宝小程序
  - [x] `startZMVerify`  ![](./assets/my.png) 
  - [x] `textRiskIdentification`  ![](./assets/my.png) 
  - [x] `addCardAuth`  ![](./assets/my.png) 
  - [x] `getRunScene`  ![](./assets/my.png) 
  - [x] `chooseCity`  ![](./assets/my.png) 
  - [x] `datePicker`  ![](./assets/my.png) 
  - [x] `optionsSelect`  ![](./assets/my.png) 
  - [x] `multiLevelSelect`  ![](./assets/my.png) 
  - [x] `rsa`  ![](./assets/my.png) 


- 开放接口 - 百度智能小程序
  - [x] `getSwanId`  ![](./assets/swan.png) 
  - [x] `navigateToSmartProgram`  ![](./assets/swan.png) 
  - [x] `navigateBackSmartProgram`  ![](./assets/swan.png) 
  - [x] `setPageInfo`  ![](./assets/swan.png) 
  - [x] `setMetaDescription`  ![](./assets/swan.png) 
  - [x] `setMetaKeywords`  ![](./assets/swan.png) 
  - [x] `setDocumentTitle`  ![](./assets/swan.png) 
  - [x] `loadSubPackage`  ![](./assets/swan.png) 


- 联系人
  - [x] `chooseAddress`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `chooseContact`  ![](./assets/my.png) 
  - [x] `choosePhoneContact`  ![](./assets/my.png) 
  - [x] `chooseAlipayContact`  ![](./assets/my.png) 
  - [x] `addPhoneContact`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 


- 字体加载
  - [x] `loadFontFace`  ![](./assets/wx.png)  ![](./assets/my.png) 


- 系统信息
  - [x] `getSystemInfo` 
  - [x] `getBatteryInfo`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `getNetworkType` 
  - [x] `setKeepScreenOn`  ![](./assets/wx.png)  ![](./assets/my.png)  ![](./assets/swan.png) 
  - [x] `startAccelerometer`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `stopAccelerometer`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `startCompass`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `stopCompass`  ![](./assets/wx.png)  ![](./assets/swan.png)  ![](./assets/tt.png) 
  - [x] `startDeviceMotionListening`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `stopDeviceMotionListening`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `startGyroscope`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `stopGyroscope`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `vibrate`  ![](./assets/my.png) 
  - [x] `vibrateShort` 
  - [x] `vibrateLong` 
  - [x] `watchShake`  ![](./assets/my.png) 
  - [x] `setEnableDebug`  ![](./assets/wx.png)  ![](./assets/swan.png) 
  - [x] `getServerTime`  ![](./assets/my.png) 
  - [x] `scan`  ![](./assets/my.png) 


- 蓝牙无线
  - [x] `getBeacons`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `startBeaconDiscovery`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `stopBeaconDiscovery`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `startWifi`  ![](./assets/wx.png) 
  - [x] `stopWifi`  ![](./assets/wx.png) 
  - [x] `setWifiList`  ![](./assets/wx.png) 
  - [x] `getWifiList`  ![](./assets/wx.png) 
  - [x] `connectWifi`  ![](./assets/wx.png) 
  - [x] `getConnectedWifi`  ![](./assets/wx.png) 
  - [x] `getBLEDeviceServices`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `getBLEDeviceCharacteristics`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `createBLEConnection`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `closeBLEConnection`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `writeBLECharacteristicValue`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `readBLECharacteristicValue`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `notifyBLECharacteristicValueChange`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `startBluetoothDevicesDiscovery`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `stopBluetoothDevicesDiscovery`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `openBluetoothAdapter`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `getConnectedBluetoothDevices`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `getBluetoothDevices`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `getBluetoothAdapterState`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `closeBluetoothAdapter`  ![](./assets/wx.png)  ![](./assets/my.png) 
  - [x] `stopHCE`  ![](./assets/wx.png) 
  - [x] `startHCE`  ![](./assets/wx.png) 
  - [x] `getHCEState`  ![](./assets/wx.png) 
  - [x] `sendHCEMessage`  ![](./assets/wx.png) 


- 第三方平台
  - [x] `getExtConfig`  ![](./assets/wx.png)  ![](./assets/swan.png) 




## 小程序之间的API差异

1、传参不一致
 
例如：`showLoading` 方法，加载的显示文案，微信和百度里面是 `title` 参数，支付宝里面是 `content` 参数，如下
```javascript
// 微信
wx.showLoading({
  title: '加载中'
})

// 百度
swan.showLoading({
  title: '加载中'
})

// 支付宝
my.showLoading({
  content: '加载中'
})

// 使用 mpapi 之后，多端兼容
api.showLoading('加载中')
api.showLoading({
  title: '提示内容'
})
```

2、返回参不一致
 
例如：`showActionSheet` 方法，执行完之后获取选择的索引，微信和百度里面是 `res.tapIndex`，支付宝里面是 `res.index`，如下
```javascript
// 微信
wx.showActionSheet({
  itemList: ['台球', '羽毛球', '篮球'],
  success: (res) => {
    // res.tapIndex
  }
})

// 支付宝
my.showActionSheet({
  items: ['台球', '羽毛球', '篮球'],
  success: (res) => {
    // res.index
  }
})

// 使用 mpapi，多端兼容
api.showActionSheet({
  itemList: ['台球', '羽毛球', '篮球'],
  success: (res) => {
    // res.tapIndex
  }
})
```

3、不支持，但可兼容

例如：支付宝里面有 `my.alert`，而微信和百度里面没有此方法，但是可以通过微信的 `wx.showModal` 或百度的 `swan.showModal` 封装一个 `alert` 方法，如下
```javascript
api.alert('提示内容')

api.alert({
  content: '提示内容'
})

// 请求数据，兼容多端
api.request({...}).then((res) => {})
```

4、不支持，无法兼容

有的 API 只在特定端里面有效，无法兼容处理，如下
```javascript
// 只在支付宝里面有效，微信和百度小程序里面会报错
api.startZMVerify({...})

// 建议这样处理
if(api.isAlipay){
  api.startZMVerify({...})
}

// 只在微信里面有效，支付宝或百度小程序里面会报错
api.setTopBarText({...})

// 建议这样处理
if(api.isWechat){
  api.setTopBarText({...})
}

// 百度智能小程序的特殊 API 一样的道理
if(api.isSwan){
  api.getSwanId().then((res) => {})
}
```


## 使用说明

1、支持 `Promise` 风格

所有小程序的 API 只要包含 `success` 回调，都已经用 `Promise` 封装过，可以直接使用，两种写法都支持，例如
```javascript
// 使用回调
api.showActionSheet({
  itemList: ['台球', '羽毛球', '篮球'],
  success: (res) => {
    // res.tapIndex
  }
})

// 或者
api.showActionSheet({
  itemList: ['台球', '羽毛球', '篮球']
}).then((res) => {
    // res.tapIndex
})

// 其它
api.setStorage({...}).then((res) => {})
api.chooseImage({...}).then((res) => {})
...
```

2、兼容方法里的传参和返回参，**以微信小程序调用为准**。其它端不兼容的参数不处理，例如
```javascript
api.chooseImage({
  count: 1,
  sizeType: ['original', 'compressed'], // 只在微信可用
  sourceType: ['album', 'camera'],
}).then((res) => {
  // res.tempFilePaths 在微信和支付宝都可用
  // res.tempFiles 只在微信可用
})
```

3、不在兼容列表里面的方法，也可以通过 `api` 来调用，并且支持 `Promise` 语法（**有 `success` 回调的才有**）
```javascript
// 微信小程序可用（检查登录态是否过期）
api.checkSession().then((res) => {})


// 支付宝小程序可用（获取授权码）
api.getAuthCode().then((res) => {})


// 小程序都可用（获取地理位置）
api.getLocation().then((res) => {})
```


## 特殊API的事件处理
某些 API 既要支持 Promise，又要调用它的事件，那么可以采用如下方式：

**以前：**
```javascript
const downloadTask = wx.downloadFile({
  url: 'https://example.com/audio/123', // 仅为示例，并非真实的资源
  success(res){
    console.log(res)
  }
})

downloadTask.onProgressUpdate((res) => {
  console.log(res)
})

downloadTask.abort() // 取消下载任务
```
**使用 `mpapi` 之后：**
```javascript
const api = require('mpapi')

const downloadTask = api.downloadFile({
  url: 'https://example.com/audio/123' // 仅为示例，并非真实的资源
}).then((res) => {
  console.log('success')
  console.log(res)
})

downloadTask.$event('onProgressUpdate', (res) => {
  console.log(res)
})

// downloadTask.$event('abort') // 取消下载任务
```
其它 API 可以类似处理，例如：`request`、`uploadFile`、`connectSocket`

## 协议

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/mpapi
[url-npm]: https://www.npmjs.com/package/mpapi
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/mpapi.png?compact=true
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

