import { isWechat, _Promised } from '../../api'

const defaults = {
  title: '',
  showCancel: false,
  confirmText: '确定'
}

module.exports = (opts) => {
  if(typeof opts === 'string'){
    opts = {
      content: opts
    }
  }

  opts = Object.assign({}, defaults, opts)

  if(!isWechat){
    opts.buttonText = opts.confirmText
  }

  return _Promised(isWechat ? 'showModal' : 'alert', opts)
}