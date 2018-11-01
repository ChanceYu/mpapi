import { isWechat, _Promised } from '../../api'

const defaults = {
  count: 1,
}

module.exports = (opts) => {
  opts = Object.assign({}, defaults, opts)

  return _Promised('chooseImage', opts, (res) => {
    if(!isWechat){
      res.tempFilePaths = res.apFilePaths
    }
  })
}