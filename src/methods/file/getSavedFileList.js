import { isAlipay, _Promised } from '../../api'

module.exports = (opts) => {
  return _Promised('getSavedFileList', opts, (res) => {
    const fileList = res.fileList || []

    if(isAlipay){
      fileList.map((item) => {
        item.filePath = item.apFilePath
        return item
      })
    }
  })
}