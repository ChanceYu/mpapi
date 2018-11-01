import { $global } from '../../api'

module.exports = () => {
  try{
    $global.clearStorageSync()
  }catch(e){
  }
}