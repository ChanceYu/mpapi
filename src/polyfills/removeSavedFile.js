module.exports = function(opts){
  if(this.isAlipay){
    opts.apFilePath = opts.apFilePath || opts.filePath
  }

  return this.$promisfy('removeSavedFile', opts)
}