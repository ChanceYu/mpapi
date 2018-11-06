import { isAlipay, _Promised } from '../../api'

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

  if(isAlipay){
    opts.buttonText = opts.confirmText
  }

  return _Promised(isAlipay ? 'alert' : 'showModal', opts)
}