module.exports = function(opts){
  if(this.isAlipay){
    opts.number = opts.number || opts.phoneNumber
  }

  return this.$promisfy('makePhoneCall', opts)
}