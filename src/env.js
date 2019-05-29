// 微信小程序
const isWechat = typeof wx !== 'undefined' && typeof wx.showToast === 'function'

// 支付宝小程序
const isAlipay = typeof my !== 'undefined' && typeof my.showToast === 'function'

// 百度智能小程序
const isSwan   = typeof swan !== 'undefined' && typeof swan.showToast === 'function'

// 字节跳动小程序
const isTt   = typeof tt !== 'undefined' && typeof tt.showToast === 'function'

// 全局对象
const $global = isWechat ? wx : isAlipay ? my : isSwan ? swan : isTt ? tt : ''

if(!$global){
  throw new Error('请在小程序环境中使用，支持：微信小程序、支付宝小程序、百度智能小程序、头条小程序')
}

module.exports = {
  isWechat,
  isAlipay,
  isSwan,
  isTt,
  $global
}