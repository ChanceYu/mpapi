import { isWechat, _Promised } from '../../api'

const defaults = {
  title: '',
  icon: 'none',
}

module.exports = (opts) => {
  if(typeof opts === 'string'){
    opts = {
      title: opts
    }
  }

  opts = Object.assign({}, defaults, opts)

  if(!isWechat){
    opts.content = opts.title
    opts.type = opts.icon
  }

  return _Promised('showToast', opts)
}