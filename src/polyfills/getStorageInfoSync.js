module.exports = function(){
  try{
    return this.$global.getStorageInfoSync()
  }catch(e){
  }
}