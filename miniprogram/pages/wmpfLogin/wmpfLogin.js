const app = getApp()
Page({
  data: {
    hasLogin: false,
    wxa_openid: '',
    session_key: ''
  },
  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin,
      wxa_openid: app.globalData.wxa_openid,
      session_key: app.globalData.session_key
    })
  },
  login() {
    console.log("wmpf login")
    const that = this
    wx.login({
      success(res) {
        console.log(JSON.stringify(res))
        //小程序AppSecret不能写在小程序代码中，所以建议将wx.login拿到的code给到后台去换取openid和session_key
        wx.request({
          url: 'https://miniprog.pay.weixin.qq.com/xphp/cfacepaydemo/jscode2session',
          method: 'GET',
          data: {
            js_code: res.code
          },
          success(res) {
            console.log('jscode2session response')
            console.log(JSON.stringify(res.data))
            app.globalData.hasLogin = true
            app.globalData.wxa_openid = res.data.openid
            app.globalData.session_key = res.data.session_key

            that.setData({
              hasLogin: true,
              wxa_openid: res.data.openid,
              session_key: res.data.session_key
            })
          },
          fail(res) {
            console.log(JSON.stringify(res))
          }
        })
      }
    })
  }
})
