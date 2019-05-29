module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      key: opts
    }
  }
  
  try{
    if(this.isAlipay){
        const res = this.$global.getStorageSync(opts) || {}
  
        return res.data
    }else{
        return this.$global.getStorageSync(opts.key)
    }
  }catch(e){
  }
}