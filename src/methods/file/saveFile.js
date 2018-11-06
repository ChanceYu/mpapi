import { isAlipay, _Promised } from '../../api'

module.exports = (opts) => {
  if(isAlipay){
    opts.apFilePath = opts.tempFilePath
  }

  return _Promised('saveFile', opts, (res) => {
    if(isAlipay){
      res.savedFilePath = res.apFilePath
    }
  })
}