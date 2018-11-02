module.exports = [
  {
    title: '操作交互',
    items: [
      ['alert', {
        content: '普通提示呀',
        confirmText: '好的'
      }],
      ['confirm', {
        content: '确认提示呀',
        confirmText: '好的'
      }],
      ['showActionSheet', {
        itemList: ['台球', '羽毛球', '篮球']
      }],
      ['showLoading'],
      ['showToast', '提示信息'],
    ]
  }
]