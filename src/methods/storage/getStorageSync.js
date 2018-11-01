import { $global, isWechat } from '../../api'

module.exports = (opts) => {
  if(typeof opts === 'string'){
    opts = {
      key: opts
    }
  }
  
  try{
    if(isWechat){
      return $global.getStorageSync(opts.key)
    }else{
      const res = $global.getStorageSync(opts) || {}

      return res.data
    }
  }catch(e){
  }
}