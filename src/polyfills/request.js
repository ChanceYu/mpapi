module.exports = function(opts){
  if(this.isAlipay){
    opts.headers = opts.headers || opts.header
  }

  return this.$promisfy(this.isAlipay ? 'httpRequest' : 'request', opts, (res) => {
    if(this.isAlipay){
      res.statusCode = res.status
      res.header = res.headers
    }
  })
}