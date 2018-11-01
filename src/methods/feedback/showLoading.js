import { isWechat, _Promised } from '../../api'

const defaults = {
  title: '加载中',
  mask: true,
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
  }

  return _Promised('showLoading', opts)
}