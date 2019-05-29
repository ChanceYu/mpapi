module.exports = function(opts){
  if(this.isAlipay){
    // 支付宝小程序支持压缩多张，微信小程序只支持压缩一张
    opts.apFilePaths = opts.apFilePaths || [opts.src]
  }

  return this.$promisfy('compressImage', opts, (res) => {
    if(this.isAlipay){
      res.tempFilePath = res.apFilePaths[0]
    }
  })
}