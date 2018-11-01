import { isWechat, _Promised } from '../../api'

module.exports = (opts) => {
  if(!isWechat){
    opts.apFilePath = opts.tempFilePath
  }

  return _Promised('saveFile', opts, (res) => {
    if(!isWechat){
      res.savedFilePath = res.apFilePath
    }
  })
}