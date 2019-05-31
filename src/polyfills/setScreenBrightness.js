module.exports = function(opts){
  if(this.isAlipay){
    if(!opts.hasOwnProperty('brightness')){
      opts.brightness = opts.value
    }
  }

  return this.$promisfy('setScreenBrightness', opts)
}