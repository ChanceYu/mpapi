import { isWechat, _Promised } from '../../api'

const defaults = {
  title: '提示',
  showCancel: true,
  confirmText: '确定',
  cancelText: '取消'
}

module.exports = (opts) => {
  if(typeof opts === 'string'){
    opts = {
      content: opts
    }
  }

  opts = Object.assign({}, defaults, opts)

  if(!isWechat){
    opts.confirmButtonText = opts.confirmText
    opts.cancelButtonText = opts.cancelText
  }

  return _Promised(isWechat ? 'showModal' : 'confirm', opts)
}