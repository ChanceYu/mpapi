import { isAlipay, _Promised } from '../../api'

module.exports = (opts) => {
  if(isAlipay){
    opts.headers = opts.header
  }

  return _Promised(isAlipay ? 'httpRequest' : 'request', opts, (res) => {
    if(isAlipay){
      res.statusCode = res.status
      res.header = res.headers
    }
  })
}