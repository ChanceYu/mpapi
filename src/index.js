import util from './util'
import polyfills from './polyfills'
import normalApi from './api/normalApi'
import deepApi from './api/deepApi'
import instanceApi from './api/instanceApi'

const api = {
  ...util,
  ...polyfills, // 兼容所有小程序 API
}

/**
 * 普通的包装成 Promise 的小程序 API
 */
api.$promisfyApi(normalApi)

/**
 * 某些新实例对象上面的 API 包装成 Promise
 * 例如：createMapContext、getFileSystemManager 等
 */
api.$promisfyInstanceApi(instanceApi)

/**
 * 挂载小程序其它 API
 */
api.$injectExtraApi()

/**
 * 深层次的 API 包装成 Promise
 */
api.$promisfyDeepApi(deepApi)

module.exports = api