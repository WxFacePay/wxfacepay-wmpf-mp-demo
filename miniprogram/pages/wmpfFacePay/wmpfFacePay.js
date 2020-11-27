const app = getApp()
Page({
  data: {
    hasLogin: false,
    user_openid: '',
    face_code: ''
  },
  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin,
      user_openid: app.globalData.user_openid,
      face_code: app.globalData.face_code
    })
  },

  getFaceCode() {
    console.log("wmpf getFaceCode")

    const that = this
    wmpf.wxFacePay.getFaceCode({
      success: res=> {
        console.log(res);
        app.globalData.user_openid = res.openid
        app.globalData.face_code = res.face_code
        that.setData({
          user_openid: res.openid,
          face_code: res.face_code
        })
      },
      fail: res=> {
        console.log(res);
      }
    })
  },

  passFaceCode() {
    console.log("wmpf passFaceCode")

    if (this.data.openid != '' && this.data.face_code != '') {
      wx.showLoading({
        title: '支付中...',
      })
      wmpf.Channel.invoke({
        command: 'passFaceCode',
        data: {
          openid: this.data.user_openid,
          faceCode: this.data.face_code
        },
        success: function(res) {
          console.log(res)
          var response = res
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: response.data,
              })
            },
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '无法进行支付',
      })
    }
  }
})
