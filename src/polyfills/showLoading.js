module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      title: opts
    }
  }

  opts = Object.assign({
    title: '加载中',
    mask: true,
  }, opts)

  if(this.isAlipay){
    opts.content = opts.content || opts.title
  }

  return this.$promisfy('showLoading', opts)
}