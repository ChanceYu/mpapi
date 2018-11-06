import { isAlipay, _Promised } from '../../api'

module.exports = (opts) => {
  if(isAlipay){
    opts.fileName = opts.name
  }else{
    opts.name = opts.fileName
  }

  return _Promised('uploadFile', opts)
}