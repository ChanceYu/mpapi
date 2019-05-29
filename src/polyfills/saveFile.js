module.exports = function(opts){
  if(this.isAlipay){
    opts.apFilePath = opts.apFilePath || opts.tempFilePath
  }

  return this.$promisfy('saveFile', opts, (res) => {
    if(this.isAlipay){
      res.savedFilePath = res.apFilePath
    }
  })
}