module.exports = function(opts){
  if(typeof opts === 'string'){
    opts = {
      title: opts
    }
  }

  opts = Object.assign({
    title: '',
    icon: 'none',
  }, opts)

  if(this.isAlipay){
    opts.content = opts.content || opts.title
    opts.type = opts.type || opts.icon
  }

  return this.$promisfy('showToast', opts)
}