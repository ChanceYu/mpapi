module.exports = function(opts){
  opts = Object.assign({
    itemList: []
  }, opts)

  if(this.isAlipay){
    opts.items = opts.items || opts.itemList
  }

  return this.$promisfy('showActionSheet', opts, (res) => {
    if(this.isAlipay){
      res.tapIndex = res.index
    }
  })
}