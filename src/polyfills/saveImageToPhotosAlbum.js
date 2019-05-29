module.exports = function(opts){
  if(this.isAlipay){
    opts.url = opts.url || opts.filePath
  }

  return this.$promisfy(this.isAlipay ? 'saveImage' : 'saveImageToPhotosAlbum', opts)
}