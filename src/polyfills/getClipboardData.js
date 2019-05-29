module.exports = function(opts){
  return this.$promisfy(this.isAlipay ? 'getClipboard' : 'getClipboardData', opts, (res) => {
    if(this.isAlipay){
      res.data = res.text
    }
  })
}