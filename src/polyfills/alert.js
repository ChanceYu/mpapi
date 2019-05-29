module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      content: opts
    }
  }

  opts = Object.assign({
    title: '',
    showCancel: false,
    confirmText: '确定'
  }, opts)

  if(this.isAlipay){
    opts.buttonText = opts.buttonText || opts.confirmText
  }

  return this.$promisfy(this.isAlipay ? 'alert' : 'showModal', opts)
}