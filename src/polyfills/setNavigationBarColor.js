module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      backgroundColor: opts
    }
  }

  return this.$promisfy(this.isAlipay ? 'setNavigationBar': 'setNavigationBarColor', opts)
}