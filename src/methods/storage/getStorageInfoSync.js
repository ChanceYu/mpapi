import { $global } from '../../api'

module.exports = () => {
  try{
    return $global.getStorageInfoSync()
  }catch(e){
  }
}