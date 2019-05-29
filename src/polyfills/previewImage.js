module.exports = function(opts){
  let current = opts.current
  let urls = opts.urls || []

  if(!this.isAlipay && typeof current === 'number'){
    current = urls[0]
  }

  if(this.isAlipay && typeof current === 'string'){
    current = urls.indexOf(current)

    if(current === -1) current = 0
  }

  if(typeof current !== 'undefined'){
    opts.current = current
  }

  return this.$promisfy('previewImage', opts)
}