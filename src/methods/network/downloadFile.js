import { isAlipay, _Promised } from '../../api'

module.exports = (opts) => {
  return _Promised('downloadFile', opts, (res) => {
    if(isAlipay){
      res.tempFilePath = res.apFilePath
    }
  })
}