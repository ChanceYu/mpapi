import { $global, isWechat } from '../../api'

module.exports = (opts, data) => {
  if(typeof opts === 'string'){
    opts = {
      key: opts,
      data
    }
  }
  
  try{
    if(isWechat){
      $global.setStorageSync(opts.key, opts.data)
    }else{
      $global.setStorageSync(opts)
    }
  }catch(e){
  }
}