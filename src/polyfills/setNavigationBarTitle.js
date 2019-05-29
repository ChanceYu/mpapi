module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      title: opts
    }
  }

  return this.$promisfy(this.isAlipay ? 'setNavigationBar': 'setNavigationBarTitle', opts)
}