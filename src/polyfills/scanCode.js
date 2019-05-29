const TYPE_MAP = {
  barCode: 'bar',
  qrCode: 'qr'
}

module.exports = function(opts){
  if(this.isAlipay){
    opts.hideAlbum = opts.onlyFromCamera

    if(opts.scanType){
      opts.type = opts.type || TYPE_MAP[opts.scanType[0]]
    }
  }

  return this.$promisfy(this.isAlipay ? 'scan' : 'scanCode', opts, (res) => {
    if(this.isAlipay){
      res.result = res.code
    }
  })
}