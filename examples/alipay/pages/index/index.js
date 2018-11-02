var api = require('../../js/mpapi');
var polyfills = require('../../js/polyfills');

console.log(api)
console.log(api.setTopBarText)

Page({
  data: {
    polyfills: polyfills
  },
  onReady() {
    api.getLocation().then(console.log)
  },
  handler(e){
    var dataset = e.target.dataset;
    var method = dataset.method;
    var option = dataset.option;

    // console.log(dataset)

    var result = api[method](option)

    if (result && result.then){
      result
      .then((res) => {
        console.log('res: success');
        console.log(res);
      })
        .catch((res) => {
          console.log('res: fail');
          console.log(res);
      })
    }

    // 额外处理
    if (method === 'showLoading'){
      setTimeout(() => api.hideLoading(), 1500)
    }
  }
})