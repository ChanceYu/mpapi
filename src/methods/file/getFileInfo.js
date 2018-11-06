import { isAlipay, _Promised } from '../../api'

module.exports = (opts) => {
  if(isAlipay){
    opts.apFilePath = opts.filePath
  }

  return _Promised('getFileInfo', opts)
}