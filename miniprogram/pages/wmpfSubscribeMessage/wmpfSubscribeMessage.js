Page({
  // 请求订阅
  requestSubscribeMessage() {
    const self = this
    wx.requestSubscribeMessage({
      tmplIds: ['BJC-_9zA6XJf0COtzhu0gXj7RMltEPS5g0fXPuaUcbo'],
      success(res) {
        console.log(res)
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          //self.subscribeMessageSend()
          wx.showToast({
            title: '订阅成功',
          })
        }
      },
      complete(res) {
        console.log(res)
      }
    })
  },

  // 下发订阅消息，注意下面使用的是云开发来下发订阅消息
  // 请开发者参照小程序开发文档按实际情况调整为实际的实现方式
  subscribeMessageSend() {
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'sendSubscribeMessage'
      },
      success: res => {
        console.warn('[云函数] [openapi] templateMessage.send 调用成功：', res)
        wx.showModal({
          title: '订阅成功',
          content: '请返回微信主界面查看',
          showCancel: false,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [openapi] templateMessage.send 调用失败：', err)
      }
    })
  }
})