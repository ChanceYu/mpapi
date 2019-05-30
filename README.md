# mpapi

> mpapi（miniProgram API），小程序 API 兼容插件，一次编写，多端运行。

:alarm_clock: 更新日期: 2019-05-30

[![NPM][img-npm-badge]][url-npm] [![Language][img-javascript]][url-github] [![License][img-mit]][url-mit]

**此项目解决的问题**：寻找不同小程序 API 之间的差异，尽可能地通过**一套 API 兼容多个小程序使用**。


## 特点
- 一次编写，多端运行，支持: 微信小程序、支付宝小程序、百度智能小程序、字节跳动小程序
- 支持 Promise（包含 success 回调的才有）
- 针对某些 API 使用做了优化，如：`api.showToast` 可以直接传 `string`、`api.setStorageSync` 无需调用 `try catch 等`
- 支持特殊 API 的事件处理，例如：`request`、`downloadFile`，[详情](#特殊api的事件处理)
- 支持不同端的判断，`api.isWechat`、`api.isAlipay`、`api.isSwan`、`api.isTt`


## 安装
```bash
npm install mpapi --save
```
非npm安装方式，直接引入 `lib` 目录下的 `mpapi.js` 到项目即可


## 使用
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
- [兼容 API 列表](#兼容api列表)
- [其它包装成 Promise 的 API](#其它包装成promise的api)
- [优化的 API](#优化的api)
- [API 差异](#小程序之间的api差异)
- [使用说明](#使用说明)
- [特殊 API 的事件处理](#特殊api的事件处理)，`request`、`downloadFile`、`uploadFile` 等
- 官方 API 文档：[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/)、[支付宝小程序](https://docs.alipay.com/mini/api/overview)、[百度智能小程序](http://smartprogram.baidu.com/docs/develop/api/net_rule/)、[字节跳动小程序](https://developer.toutiao.com/docs/framework/)

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
> 只在特定小程序下才会支持。

微信小程序![wx](./assets/wx.png)、支付宝小程序![my](./assets/my.png)、百度智能小程序![swan](./assets/swan.png)、字节跳动小程序![tt](./assets/tt.png)，有图标表示只支持对应小程序，没有图标表示支持所有小程序。


- 交互
  - [x] `hideToast` 
  - [x] `hideLoading` 
  - [x] `showModal`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `prompt`  ![%= lbl %>](./assets/my.png) 


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
  - [x] `chooseLocation`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 


- 文件图片
  - [x] `saveImage`  ![%= lbl %>](./assets/my.png) 
  - [x] `getImageInfo` 
  - [x] `chooseVideo`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `chooseMessageFile`  ![%= lbl %>](./assets/wx.png) 
  - [x] `saveVideoToPhotosAlbum`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `openDocument`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 


- 音频
  - [x] `stopVoice`  ![%= lbl %>](./assets/wx.png) 
  - [x] `playVoice`  ![%= lbl %>](./assets/wx.png) 
  - [x] `getAvailableAudioSources`  ![%= lbl %>](./assets/wx.png) 
  - [x] `stopBackgroundAudio`  ![%= lbl %>](./assets/wx.png) 
  - [x] `playBackgroundAudio`  ![%= lbl %>](./assets/wx.png) 
  - [x] `seekBackgroundAudio`  ![%= lbl %>](./assets/wx.png) 
  - [x] `pauseBackgroundAudio`  ![%= lbl %>](./assets/wx.png) 
  - [x] `getBackgroundAudioPlayerState`  ![%= lbl %>](./assets/wx.png) 
  - [x] `setInnerAudioOption`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `startRecord`  ![%= lbl %>](./assets/wx.png) 
  - [x] `stopRecord`  ![%= lbl %>](./assets/wx.png) 
  - [x] `stopRecord`  ![%= lbl %>](./assets/wx.png) 


- 导航栏
  - [x] `getTitleColor`  ![%= lbl %>](./assets/my.png) 
  - [x] `setNavigationBar`  ![%= lbl %>](./assets/my.png) 
  - [x] `showNavigationBarLoading`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `hideNavigationBarLoading`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 


- 背景
  - [x] `setBackgroundTextStyle`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `setBackgroundColor`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `showTabBar`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `hideTabBar`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `setTabBarItem`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `setTabBarStyle`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `showTabBarRedDot`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `hideTabBarRedDot`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `setTabBarBadge`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `removeTabBarBadge`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 


- 下拉刷新
  - [x] `startPullDownRefresh` 
  - [x] `stopPullDownRefresh` 


- 滚动
  - [x] `pageScrollTo` 
  - [x] `sendSocketMessage`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `connectSocket` 
  - [x] `closeSocket`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `startLocalServiceDiscovery`  ![%= lbl %>](./assets/wx.png) 
  - [x] `stopLocalServiceDiscovery`  ![%= lbl %>](./assets/wx.png) 


- 置顶
  - [x] `setTopBarText`  ![%= lbl %>](./assets/wx.png) 


- 画布
  - [x] `canvasGetImageData`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `canvasPutImageData`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `canvasToTempFilePath`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 


- 分享转发
  - [x] `getShareInfo`  ![%= lbl %>](./assets/wx.png) 
  - [x] `updateShareMenu`  ![%= lbl %>](./assets/wx.png) 
  - [x] `showShareMenu`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `hideShareMenu`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `showFavoriteGuide`  ![%= lbl %>](./assets/swan.png) 
  - [x] `openShare`  ![%= lbl %>](./assets/swan.png) 


- 登录、授权、用户信息
  - [x] `login`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `checkSession`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `getUserInfo`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `getAuthCode`  ![%= lbl %>](./assets/my.png) 
  - [x] `getAuthUserInfo`  ![%= lbl %>](./assets/my.png) 
  - [x] `getPhoneNumber`  ![%= lbl %>](./assets/my.png) 
  - [x] `authorize`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/tt.png) 


- 支付
  - [x] `tradePay`  ![%= lbl %>](./assets/my.png) 
  - [x] `requestPayment`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `requestPolymerPayment`  ![%= lbl %>](./assets/swan.png) 


- 开放接口
  - [x] `getSetting` 
  - [x] `openSetting` 
  - [x] `reportAnalytics` 
  - [x] `chooseInvoiceTitle`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `navigateToMiniProgram`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `navigateBackMiniProgram`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 


- 开放接口 - 微信小程序
  - [x] `addCard`  ![%= lbl %>](./assets/wx.png) 
  - [x] `openCard`  ![%= lbl %>](./assets/wx.png) 
  - [x] `chooseInvoice`  ![%= lbl %>](./assets/wx.png) 
  - [x] `startSoterAuthentication`  ![%= lbl %>](./assets/wx.png) 
  - [x] `checkIsSoterEnrolledInDevice`  ![%= lbl %>](./assets/wx.png) 
  - [x] `checkIsSupportSoterAuthentication`  ![%= lbl %>](./assets/wx.png) 
  - [x] `getWeRunData`  ![%= lbl %>](./assets/wx.png) 


- 开放接口 - 支付宝小程序
  - [x] `startZMVerify`  ![%= lbl %>](./assets/my.png) 
  - [x] `textRiskIdentification`  ![%= lbl %>](./assets/my.png) 
  - [x] `addCardAuth`  ![%= lbl %>](./assets/my.png) 
  - [x] `getRunScene`  ![%= lbl %>](./assets/my.png) 
  - [x] `chooseCity`  ![%= lbl %>](./assets/my.png) 
  - [x] `datePicker`  ![%= lbl %>](./assets/my.png) 
  - [x] `optionsSelect`  ![%= lbl %>](./assets/my.png) 
  - [x] `multiLevelSelect`  ![%= lbl %>](./assets/my.png) 
  - [x] `rsa`  ![%= lbl %>](./assets/my.png) 


- 开放接口 - 百度智能小程序
  - [x] `getSwanId`  ![%= lbl %>](./assets/swan.png) 
  - [x] `navigateToSmartProgram`  ![%= lbl %>](./assets/swan.png) 
  - [x] `navigateBackSmartProgram`  ![%= lbl %>](./assets/swan.png) 
  - [x] `setPageInfo`  ![%= lbl %>](./assets/swan.png) 
  - [x] `setMetaDescription`  ![%= lbl %>](./assets/swan.png) 
  - [x] `setMetaKeywords`  ![%= lbl %>](./assets/swan.png) 
  - [x] `setDocumentTitle`  ![%= lbl %>](./assets/swan.png) 
  - [x] `loadSubPackage`  ![%= lbl %>](./assets/swan.png) 


- 联系人
  - [x] `chooseAddress`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `chooseContact`  ![%= lbl %>](./assets/my.png) 
  - [x] `choosePhoneContact`  ![%= lbl %>](./assets/my.png) 
  - [x] `chooseAlipayContact`  ![%= lbl %>](./assets/my.png) 
  - [x] `addPhoneContact`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 


- 字体加载
  - [x] `loadFontFace`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 


- 系统信息
  - [x] `getSystemInfo` 
  - [x] `getBatteryInfo`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `getNetworkType` 
  - [x] `setKeepScreenOn`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `startAccelerometer`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `stopAccelerometer`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `startCompass`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `stopCompass`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png)  ![%= lbl %>](./assets/tt.png) 
  - [x] `startDeviceMotionListening`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `stopDeviceMotionListening`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `startGyroscope`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `stopGyroscope`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `vibrate`  ![%= lbl %>](./assets/my.png) 
  - [x] `vibrateShort` 
  - [x] `vibrateLong` 
  - [x] `watchShake`  ![%= lbl %>](./assets/my.png) 
  - [x] `setEnableDebug`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 
  - [x] `getServerTime`  ![%= lbl %>](./assets/my.png) 
  - [x] `scan`  ![%= lbl %>](./assets/my.png) 


- 蓝牙无线
  - [x] `getBeacons`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `startBeaconDiscovery`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `stopBeaconDiscovery`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `startWifi`  ![%= lbl %>](./assets/wx.png) 
  - [x] `stopWifi`  ![%= lbl %>](./assets/wx.png) 
  - [x] `setWifiList`  ![%= lbl %>](./assets/wx.png) 
  - [x] `getWifiList`  ![%= lbl %>](./assets/wx.png) 
  - [x] `connectWifi`  ![%= lbl %>](./assets/wx.png) 
  - [x] `getConnectedWifi`  ![%= lbl %>](./assets/wx.png) 
  - [x] `getBLEDeviceServices`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `getBLEDeviceCharacteristics`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `createBLEConnection`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `closeBLEConnection`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `writeBLECharacteristicValue`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `readBLECharacteristicValue`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `notifyBLECharacteristicValueChange`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `startBluetoothDevicesDiscovery`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `stopBluetoothDevicesDiscovery`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `openBluetoothAdapter`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `getConnectedBluetoothDevices`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `getBluetoothDevices`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `getBluetoothAdapterState`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `closeBluetoothAdapter`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/my.png) 
  - [x] `stopHCE`  ![%= lbl %>](./assets/wx.png) 
  - [x] `startHCE`  ![%= lbl %>](./assets/wx.png) 
  - [x] `getHCEState`  ![%= lbl %>](./assets/wx.png) 
  - [x] `sendHCEMessage`  ![%= lbl %>](./assets/wx.png) 


- 第三方平台
  - [x] `getExtConfig`  ![%= lbl %>](./assets/wx.png)  ![%= lbl %>](./assets/swan.png) 




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

2、兼容方法里的传参和返回参，**以微信小程序调用为准**。其它端不兼容的参数不处理（某些参数也无法处理，特定小程序不支持）开发者需要留意，例如
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

3、深层级的 API，也可以通过 `api` 来调用，并且支持 `Promise` 语法（**有 `success` 回调的才有**）
```javascript
// 支付宝小程序支持的
api.ap.imgRisk({...}).then((res) => {})
api.ap.navigateToAlipayPage({...}).then((res) => {})
...
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


## Issues
如果您在使用过程中发现 Bug，或者有好的建议，欢迎[报告问题](https://github.com/ChanceYu/mpapi/issues)。


## Changelog
[更新日志](./CHANGELOG.md)。


## License

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/mpapi
[url-npm]: https://www.npmjs.com/package/mpapi
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/mpapi.png?compact=true
[img-npm-badge]: https://img.shields.io/npm/v/mpapi.svg
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

