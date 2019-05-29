module.exports = function(opts){
  if(this.isAlipay){
    opts.text = opts.text || opts.data
  }

  return this.$promisfy(this.isAlipay ? 'setClipboard' : 'setClipboardData', opts)
}