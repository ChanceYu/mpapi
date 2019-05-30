import env from './env'

// 全局对象
const $global = env.$global

/**
 * Promise 包装
 */
function $promisfy(method, opts = {}, onResolve, onReject, context = $global){
    let source
    let eventList = []
    let applyEvent = function(event, args){
      if(isFunction(source[event])){
        source[event].apply(source, args)
      }
    }
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
            applyEvent(item.event, item.args)
          })
          eventList = []
        }
      }
    })
  
     // 提供 request、downloadFile 等特殊 API 的处理方法（既要支持 Promise，又要调用它的事件）
    defer.__proto__.$event = (event, ...args) => {
      if(source){
        applyEvent(event, args)
      }else{
        eventList.push({ event, args })
      }
    }
  
    return defer
  }
  
  /**
   * 一次包装多个 API
   */
  function $promisfyApi(methods){
    if(!isArray(methods)) throw new Error('第一个参数必须为数组')

    methods.forEach((method) => {
      if(isFunction($global[method])){
        this[method] = (opts) => $promisfy(method, opts, null, null, $global)
      }
    })
  }

  /**
   * 某些新实例对象上面的 API 包装成 Promise
   * createMapContext、getFileSystemManager 等
   */
  function $promisfyInstanceApi(instanceApi){
    instanceApi.forEach((apiName) => {
      if(!$global.hasOwnProperty(apiName)) return;
      
      this[apiName] = function(...args){
        let instance = $global[apiName].apply($global, args)
        let methods = [...Object.keys(instance), ...Object.getOwnPropertyNames(instance.__proto__)]

        methods = methods.filter((method) => method !== 'constructor')

        methods.forEach((method) => {
          if(isFunction(instance[method])){
            // 不对旧的 API 重写，使用新的 API
            // 例如：MapContext.getRegion ==> MapContext.$getRegion().then
            instance['$' + method] = (opts) => $promisfy(method, opts, null, null, instance)
          }
        })
        
        return instance
      }
    })
  }


  /**
   * 深层次的 API 包装成 Promise
   * my.ap.xx
   * swan.ai.xx
   */
  function $promisfyDeepApi(deepApi){
    deepApi.forEach((apiName) => {
      if(!$global.hasOwnProperty(apiName)) return;
      

      let obj = $global[apiName]
      for(let method in obj){
        if(isFunction(obj[method])){
          this[apiName]['$' + method] = (opts) => $promisfy(method, opts, null, null, obj)
        }
      }
    })
  }

  /**
   * 挂载小程序其它 API
   */
  function $injectExtraApi(){
    for (let method in $global) {
      if (this.hasOwnProperty(method)) continue;
    
      this[method] = $global[method]
    }
  }
  
  function isFunction(val){
    return typeof val === 'function'
  }
  
  function isArray(val){
    return Object.prototype.toString.call(val) === '[object Array]'
  }

  module.exports = {
    $promisfy,
    $promisfyApi,
    $promisfyDeepApi,
    $promisfyInstanceApi,
    $injectExtraApi
  }