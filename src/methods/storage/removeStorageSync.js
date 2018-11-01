import { $global, isWechat } from '../../api'

module.exports = (opts) => {
  if(typeof opts === 'string'){
    opts = {
      key: opts
    }
  }

  try{
    if(isWechat){
      $global.removeStorageSync(opts.key)
    }else{
      $global.removeStorageSync(opts)
    }
  }catch(e){
  }
}