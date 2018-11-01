import { isWechat, _Promised } from '../../api'

module.exports = (opts) => {
  let current = opts.current
  let urls = opts.urls || []

  if(isWechat && typeof current === 'number'){
    current = urls[0]
  }

  if(!isWechat && typeof current === 'string'){
    current = urls.indexOf(current)

    if(current === -1) current = 0
  }

  if(typeof current !== 'undefined'){
    opts.current = current
  }

  return _Promised('previewImage', opts)
}