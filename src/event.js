/**
 * 特殊API的事件处理（既要支持Promise，又要绑定事件）
 */
class Event{

  constructor(){
    this.listeners = []
  }

  fire(name, ...value){
    this.listeners.push({
      name,
      value
    })

    this.trigger()
  }

  trigger(s){
    if(s) this.source = s

    let source = this.source
    if(!source) return

    while(this.listeners.length){
      let event = this.listeners.shift()
      let { name, value } = event
      
      if(typeof source[name] === 'function'){
        source[name](...value)
      }
    }
  }
}

module.exports = Event