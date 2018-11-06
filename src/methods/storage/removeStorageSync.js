import { $global, isAlipay } from '../../api'

module.exports = (opts) => {
  if(typeof opts === 'string'){
    opts = {
      key: opts
    }
  }

  try{
    if(isAlipay){
      $global.removeStorageSync(opts)
    }else{
      $global.removeStorageSync(opts.key)
    }
  }catch(e){
  }
}