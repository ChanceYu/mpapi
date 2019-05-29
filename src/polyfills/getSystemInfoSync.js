module.exports = function(){
  try{
    return this.$global.getSystemInfoSync()
  }catch(e){
  }
}