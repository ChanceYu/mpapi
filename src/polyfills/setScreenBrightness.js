module.exports = function(opts){
  if(this.isAlipay){
    opts.brightness = opts.brightness || opts.value
  }

  return this.$promisfy('setScreenBrightness', opts)
}