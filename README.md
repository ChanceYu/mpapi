# mpapi

mpapi（miniProgram API），小程序API兼容插件，一次编写，多端运行。支持：微信小程序、支付宝小程序、百度智能小程序

[![NPM][img-npm]][url-npm]

[![Language][img-javascript]][url-github]
[![License][img-mit]][url-mit]


## 特点
- 一次编写，多端运行，支持: 微信小程序、支付宝小程序、百度智能小程序
- 支持 Promise（包含success回调的才有）
- 支持特定 API 的事件处理，例如：中断，`request`、`downloadFile` 请求，[详情查看](#特殊api的处理)
- 支持不同端的判断，`api.isWechat`、`api.isAlipay`、`api.isSwan`


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
- [兼容列表](#兼容列表)
- [API差异](#微信小程序和支付宝小程序的api差异)
- [使用说明](#使用说明)
- [特殊API的处理](#特殊api的处理)，`request`、`downloadFile`、`uploadFile` 等
- 官方API文档：[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/)、[支付宝小程序](https://docs.alipay.com/mini/api/overview)、[百度智能小程序](http://smartprogram.baidu.com/docs/develop/api/net_rule/)


## 兼容列表
- 操作反馈
  - [x] `alert`
  - [x] `confirm`
  - [x] `showActionSheet`
  - [x] `showLoading`
  - [x] `showToast`
- 文件相关
  - [x] `getFileInfo`
  - [x] `getSavedFileInfo`
  - [x] `getSavedFileList`
  - [x] `removeSavedFile`
  - [x] `saveFile`
- 图片相关
  - [x] `chooseImage`
  - [x] `getImageInfo`
  - [x] `previewImage`
- 请求相关
  - [x] `downloadFile`
  - [x] `request`
  - [x] `uploadFile`
- 数据缓存
  - [x] `clearStorage`
  - [x] `clearStorageSync`
  - [x] `getStorage`
  - [x] `getStorageSync`
  - [x] `getStorageInfo`
  - [x] `getStorageInfoSync`
  - [x] `removeStorage`
  - [x] `removeStorageSync`
  - [x] `setStorage`
  - [x] `setStorageSync`


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


## 特殊API的处理
某些 API 既要支持 Promise，又要监听它的回调函数，那么可以采用如下方式：
```javascript
const api = require('mpapi')

const downloadTask = api.downloadFile({
  url: 'https://example.com/audio/123', //仅为示例，并非真实的资源
}).then((res) => {
  console.log(res)
})

downloadTask.$event('onProgressUpdate', (res) => {
  console.log(res)
})

downloadTask.$event('abort') // 取消下载任务
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

