import { $global, isAlipay } from '../../api'

module.exports = (opts, data) => {
  if(typeof opts === 'string'){
    opts = {
      key: opts,
      data
    }
  }
  
  try{
    if(isAlipay){
      $global.setStorageSync(opts)
    }else{
      $global.setStorageSync(opts.key, opts.data)
    }
  }catch(e){
  }
}