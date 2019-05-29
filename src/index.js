import env from './env'
import polyfills from './polyfills'
import apis from './apis'

// 全局对象
const $global = env.$global

const api = {
  isWechat: env.isWechat,
  isAlipay: env.isAlipay,
  isSwan: env.isSwan,
  isTt: env.isTt,
  $global,
  $promisfy,
  $promisfyApi
}

// 包装成 Promise 或要兼容的小程序 API
Object.assign(api, polyfills)

// 包装成 Promise 的小程序 API
$promisfyApi(apis)

// 挂载小程序其它 API
for (let method in $global) {
  if (api.hasOwnProperty(method)) continue;
  
  api[method] = $global[method]
}

/**
 * Promise 包装
 */
function $promisfy(method, opts = {}, onResolve, onReject, context = $global){
  let source
  let eventList = []
  let defer = new Promise(function (resolve, reject) {
    let _success = opts.success
    let _fail = opts.fail

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
    
    // 没有此方法忽略
    if(!isFunction(context[method])) return

    source = context[method](opts)

    if(source){
      if(eventList.length){
        eventList.forEach((item) => {
          applyEvent(source, item.event, item.args)
        })
        eventList = []
      }
    }
  })

   // 提供 request、downloadFile 等特殊 API 的处理方法（既要支持 Promise，又要调用它的事件）
  defer.__proto__.$event = (event, ...args) => {
    if(source){
      applyEvent(source, event, args)
    }else{
      eventList.push({ event, args })
    }
  }

  return defer
}

/**
 * 处理特殊 API 的事件
 */
function applyEvent(source, event, args){
  if(event in source){
    if(isFunction(source[event])){
      return source[event].apply(source, args)
    }else{
      return source[event]
    }
  }
}

/**
 * 一次包装多个 API
 */
function $promisfyApi(methods){
  if(isString(methods)) methods = [methods]
  if(!isArray(methods)) return

  methods.forEach((method) => {
    if(isFunction($global[method])){
      api[method] = (opts) => $promisfy(method, opts)
    }
  })
}

function isFunction(val){
  return typeof val === 'function'
}

function isString(val){
  return typeof val === 'string'
}

function isArray(val){
  return Object.prototype.toString.call(val) === '[object Array]'
}

module.exports = api