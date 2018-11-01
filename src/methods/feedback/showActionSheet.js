import { isWechat, _Promised } from '../../api'

const defaults = {
  itemList: []
}

module.exports = (opts) => {
  opts = Object.assign({}, defaults, opts)

  if(!isWechat){
    opts.items = opts.itemList
  }

  return _Promised('showActionSheet', opts, (res) => {
    if(!isWechat){
      res.tapIndex = res.index
    }
  })
}