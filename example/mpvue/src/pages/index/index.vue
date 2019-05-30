<template>
  <view>
    
    <view>
      <view
        class="method-item"
        hover-class="hover"
        v-for="(item, index) in apis"
        :key="index"
        @click="handlerApi(item)"
      >
        {{item.method}}
      </view>
    </view>

    <map id="maper" longitude="113.324520" latitude="23.099994" scale="14" show-location style="width: 100%; height: 300px;"></map>
    
  </view>
</template>

<script>
import api from 'mpapi'

let apis = [
  {
    method: 'alert',
    args: {
      content: '普通提示呀',
      confirmText: '好的'
    }
  },
  {
    method: 'confirm',
    args: {
      content: '确认提示呀',
      confirmText: '好的'
    }
  },
  {
    method: 'showActionSheet',
    args: {
      itemList: ['台球', '羽毛球', '篮球']
    }
  },
  {
    method: 'showLoading',
    args: {}
  },
  {
    method: 'showToast',
    args: '提示信息'
  }
]

export default {
  data () {
    return {
      apis: apis
    }
  },

  methods: {
    handlerApi (item) {
      let method = item.method
      let args = item.args
      let result = api[method](args)

      if (result && result.then) {
        result
          .then((res) => {
            console.log('method: then')
            console.log(res)
          })
          .catch((res) => {
            console.log('method: catch')
            console.log(res)
          })
      }

      // 额外处理
      if (method === 'showLoading') {
        setTimeout(() => api.hideLoading(), 1500)
      }
    },

    testInstanceApi () {
      let mapContext = api.createMapContext('maper')

      mapContext.$getCenterLocation().then((res) => {
        console.log('createMapContext:getCenterLocation')
        console.log(res)
      })
    },

    testNormalApi () {
      // api.getLocation().then(console.log)
      // api.checkSession().then(console.log)

      const downloadTask = api.downloadFile({
        url: 'http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=http%3A%2F%2Fimg0.ph.126.net%2FN-NC7rYIyT8xkke30LPpYw%3D%3D%2F3038522373608588337.jpg&thumburl=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3773031852%2C3740119135%26fm%3D26%26gp%3D0.jpg'
      }).then((res) => {
        console.log('downloadFile: then')
        console.log(res)
      }).catch((res) => {
        console.log('downloadFile: catch')
        console.log(res)
      })

      downloadTask.$event('onProgressUpdate', (res) => {
        console.log('downloadFile:onProgressUpdate')
        console.log(res)
      })

      // downloadTask.$event('abort')
    },

    testDeepApi () {
      // 支付宝小程序
      if (api.isAlipay) {
        api.ap.$faceVerify({})
          .then((res) => {
            console.log('api.ap.$faceVerify: then')
            console.log(res)
          })
          .catch((res) => {
            console.log('api.ap.$faceVerify: catch')
            console.log(res)
          })
      }
    }
  },

  mounted () {
    setTimeout(() => this.testInstanceApi(), 500)
    this.testNormalApi()
    this.testDeepApi()
  }
}
</script>

<style scoped>
.method-item{
  font-size: 18px;
  padding: 10px;
  color: rgba(0, 0, 0, .87);
  border-bottom: 1px solid #eee;
}

.method-item.hover{
  background: #eee;
}
</style>
