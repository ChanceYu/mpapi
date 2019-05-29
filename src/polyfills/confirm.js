module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      content: opts
    }
  }

  opts = Object.assign({
    title: '提示',
    showCancel: true,
    confirmText: '确定',
    cancelText: '取消'
  }, opts)

  if(this.isAlipay){
    opts.confirmButtonText = opts.confirmButtonText || opts.confirmText
    opts.cancelButtonText = opts.cancelButtonText || opts.cancelText
  }

  return this.$promisfy(this.isAlipay ? 'confirm' : 'showModal', opts)
}