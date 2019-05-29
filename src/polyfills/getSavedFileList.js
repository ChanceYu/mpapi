module.exports = function(opts){
  return this.$promisfy('getSavedFileList', opts, (res) => {
    const fileList = res.fileList || []

    if(this.isAlipay){
      fileList.map((item) => {
        item.filePath = item.apFilePath
        return item
      })
    }
  })
}