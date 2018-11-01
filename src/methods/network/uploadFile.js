import { isWechat, _Promised } from '../../api'

module.exports = (opts) => {
  if(!isWechat){
    opts.fileName = opts.name
  }else{
    opts.name = opts.fileName
  }

  return _Promised('uploadFile', opts)
}