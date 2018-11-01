import { isWechat, _Promised } from '../../api'

module.exports = (opts) => {
  return _Promised('downloadFile', opts, (res) => {
    if(!isWechat){
      res.tempFilePath = res.apFilePath
    }
  })
}