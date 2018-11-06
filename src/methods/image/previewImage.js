import { isAlipay, _Promised } from '../../api'

module.exports = (opts) => {
  let current = opts.current
  let urls = opts.urls || []

  if(!isAlipay && typeof current === 'number'){
    current = urls[0]
  }

  if(isAlipay && typeof current === 'string'){
    current = urls.indexOf(current)

    if(current === -1) current = 0
  }

  if(typeof current !== 'undefined'){
    opts.current = current
  }

  return _Promised('previewImage', opts)
}