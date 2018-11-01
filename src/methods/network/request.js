import { isWechat, _Promised } from '../../api'

module.exports = (opts) => {
  if(!isWechat){
    opts.headers = opts.header
  }

  return _Promised(isWechat ? 'request' : 'httpRequest', opts, (res) => {
    if(!isWechat){
      res.statusCode = res.status
      res.header = res.headers
    }
  })
}