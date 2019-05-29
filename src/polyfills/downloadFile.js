module.exports = function(opts){
  return this.$promisfy('downloadFile', opts, (res) => {
    if(this.isAlipay){
      res.tempFilePath = res.apFilePath
    }
  })
}