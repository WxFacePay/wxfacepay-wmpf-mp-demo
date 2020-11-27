const app = getApp()
Page({
  data: {
    sn: '',
    event: '',    
    eventListenState: 0,
    invokeResult: '',
    callback: null
  },
  onLoad() {
    var that = this
    wmpf.Channel.registerEvent({
      event: 'test',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(JSON.stringify(res))
        that.clearEvent()
      }
    })
  },
  onUnload() {
    var that = this
    wmpf.Channel.unregisterEvent({
      event: 'test',
      success: function(res) {
        console.log("wmpf unregisterEvent")
        console.log(res)
      },
      fail: function(res) {
        console.log(JSON.stringify(res))
        that.clearEvent()
      }
    })
  },

  getDeviceSerialNumber() {
    console.log("wmpf getDeviceSerialNumber")
    var that = this
    wmpf.getDeviceSerialNumber({
      success: function(res) {
          console.log(res.serialNumber)
          that.setData({
            sn: res.serialNumber
          })
      },
      fail: function(res) {
          console.log(JSON.stringify(res))
      }
    })
  },

  invoke() {
    console.log("wmpf invoke")
    
    var that = this
    wmpf.Channel.invoke({
      command: 'invokeTest',
      data: {
        value: 'wmpf'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          invokeResult: res.data
        })
      },
      fail: function(res) {
        console.log(JSON.stringify(res))
        that.setData({
          invokeResult: ''
        })
      }
    })
  },

  invokeSync() {
    console.log("wmpf invokeSync")
    
    var data = wmpf.Channel.invokeSync({
      command: 'invokeTest',
      data: {
        value: 'wmpf'
      }
    })
    console.log(data.data)
    this.setData({
      invokeResult: data.data
    })
  },

  startListenEvent() {
    console.log("wmpf startListenEvent")

    var that = this
    var callback = function(data) {
      console.log(JSON.stringify(data));
      that.setData({
        event: data.data
      })
    };
    wmpf.Channel.on('test', callback);
    wx.showToast({
      title: '开始监听事件',
    })
    this.setData({
      callback: callback,
      eventListenState: 1
    })
  }, 

  stopListenEvent() {
    console.log("wmpf stopListenEvent")

    wmpf.Channel.off('test', this.data.callback);
    wx.showToast({
      title: '停止监听事件',
    })
    this.clearEvent()
  },

  clearEvent() {
    this.setData({
      event: '',
      eventListenState: 0
    })
  }
})
