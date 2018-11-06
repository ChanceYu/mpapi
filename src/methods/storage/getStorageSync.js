import { $global, isAlipay } from '../../api'

module.exports = (opts) => {
  if(typeof opts === 'string'){
    opts = {
      key: opts
    }
  }
  
  try{
    if(isAlipay){
        const res = $global.getStorageSync(opts) || {}
  
        return res.data
    }else{
        return $global.getStorageSync(opts.key)
    }
  }catch(e){
  }
}