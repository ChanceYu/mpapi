import { isAlipay, _Promised } from '../../api'

const defaults = {
  itemList: []
}

module.exports = (opts) => {
  opts = Object.assign({}, defaults, opts)

  if(isAlipay){
    opts.items = opts.itemList
  }

  return _Promised('showActionSheet', opts, (res) => {
    if(isAlipay){
      res.tapIndex = res.index
    }
  })
}