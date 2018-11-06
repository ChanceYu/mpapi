import { isWechat, _Promised } from '../../api'

module.exports = (opts) => {
  if(!isWechat){
    opts.fileName = opts.name
  }else{
    opts.name = opts.fileName
  }


  let invoker = new SourceInvoker()
  let defer = _Promised('uploadFile', opts, null, null, source => invoker.bindSource(source))

  invoker.bindEvents(defer, ['onProgressUpdate', 'abort'])
  
  return defer
}

class SourceInvoker{

  constructor(){
    this.listeners = []
  }

  bindEvents(defer, events){
    this.defer = defer
    
    events.forEach(name => {
      defer[name] = function(...args){
        if(this.source){
          return this.source[name].apply(null, args)
        }else{
          this.listeners.push({
            name,
            args
          })
        }
      }
    })
  }

  bindSource(source){
    this.source = source
    this.defer.$source = source

    this.listeners.forEach(event => source[event.name].apply(null, event.args))
  }
}