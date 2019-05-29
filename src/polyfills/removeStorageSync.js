module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      key: opts
    }
  }

  try{
    if(this.isAlipay){
      this.$global.removeStorageSync(opts)
    }else{
      this.$global.removeStorageSync(opts.key)
    }
  }catch(e){
  }
}