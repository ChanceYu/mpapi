import { isWechat, _Promised } from '../../api'

module.exports = (opts) => {
  if(!isWechat){
    opts.apFilePath = opts.filePath
  }

  return _Promised('getFileInfo', opts)
}