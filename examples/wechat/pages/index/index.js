var api = require('../../js/mpapi');
var polyfills = require('../../js/polyfills');

console.log(api)

Page({
  data: {
    polyfills: polyfills
  },
  onLoad(){
    // api.getLocation().then(console.log)
    // api.checkSession().then(console.log)
    // var mgr = api.getFileSystemManager();

    const downloadTask = api.downloadFile({
      url: 'http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=http%3A%2F%2Fimg0.ph.126.net%2FN-NC7rYIyT8xkke30LPpYw%3D%3D%2F3038522373608588337.jpg&thumburl=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3773031852%2C3740119135%26fm%3D26%26gp%3D0.jpg'
    }).then((res) => {
      console.log('success')
      console.log(res)
    }).catch((res) => {
      console.log('fail')
      console.log(res)
    })

    downloadTask.$event('onProgressUpdate', (res) => {
      console.log(res)
    })

    // downloadTask.$event('abort')

    api.setNavigationBarTitle({ title: 'name' }).then(console.log)
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