module.exports = function(opts){
  if(this.isAlipay){
    opts.fileName = opts.fileName || opts.name
  }else{
    opts.name = opts.name || opts.fileName
  }

  return this.$promisfy('uploadFile', opts)
}