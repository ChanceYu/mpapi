import nocallback from './methods/nocallback'
import Event from './event'

// 微信小程序
const isWechat = typeof wx !== 'undefined' && typeof wx.showToast === 'function'

// 支付宝小程序
const isAlipay = typeof my !== 'undefined' && typeof my.showToast === 'function'

// 百度智能小程序
const isSwan   = typeof swan !== 'undefined' && typeof swan.showToast === 'function'

const $global = isWechat ? wx : (isAlipay ? my : swan)

const _toString = Object.prototype.toString

/**
 * 挂载API
 */
function _addMethod(methods){
  Object.assign(this, methods)

  // 其它 API 或属性
  for (let attr in $global) {
    if (this.hasOwnProperty(attr)) continue;

    if(typeof $global[attr] === 'function'){

      this[attr] = (opts) => {
        let type = _toString.call(opts)

        if((type === '[object Undefined]' || type === '[object Object]')
         && nocallback.indexOf(attr) === -1){
          return _Promised(attr, opts)
        }else{
          return $global[attr](opts)
        }
      }

    }else{
      this[attr] = $global[attr]
    }
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
function _Promised(method, opts = {}, onResolve, onReject){
  let oEvent = new Event()
  let defer = new Promise((resolve, reject) => {
    const _success = opts.success
    const _fail = opts.fail

    opts.success = (res) => {
      onResolve && onResolve(res)
      _success && _success(res)
      resolve(res)
    }
    opts.fail = (res) => {
      onReject && onReject(res)
      _fail && _fail(res)
      reject(res)
    }
    
    if(typeof $global[method] === 'function'){
      let source = $global[method](opts)

      oEvent.trigger(source)
    }
  })

  // 绑定事件回调
  defer.__proto__.$event = (...args) => oEvent.fire.apply(oEvent, args)
  defer.__proto__.$get = () => oEvent.source

  return defer
}

module.exports = {
  isWechat,
  isAlipay,
  isSwan,
  $global,
  _addMethod,
  _Promised
}