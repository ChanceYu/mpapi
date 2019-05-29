module.exports = function(opts){
  return this.$promisfy('getScreenBrightness', opts, (res) => {
    if(this.isAlipay){
      res.value = res.brightness
    }
  })
}