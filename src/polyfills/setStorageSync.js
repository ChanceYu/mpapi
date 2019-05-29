module.exports = function(opts, data){
  if(typeof opts === 'string'){
    opts = {
      key: opts,
      data
    }
  }
  
  try{
    if(this.isAlipay){
      this.$global.setStorageSync(opts)
    }else{
      this.$global.setStorageSync(opts.key, opts.data)
    }
  }catch(e){
  }
}