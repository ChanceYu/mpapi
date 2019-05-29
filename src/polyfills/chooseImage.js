module.exports = function(opts){
  opts = Object.assign({
    count: 1,
  }, opts)

  return this.$promisfy('chooseImage', opts, (res) => {
    if(this.isAlipay){
      res.tempFilePaths = res.apFilePaths
    }
  })
}