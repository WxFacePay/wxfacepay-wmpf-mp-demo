var WXBizDataCrypt = require('../../utils/WXBizDataCrypt')

const app = getApp()
Page({
  data: {
    hasLogin: false,
    hasPhoneNumber: false,
    phoneNumber: ''
  },
  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },

  getPhoneNumber(info) {
    console.log("wmpf get phone number")
    console.log(JSON.stringify(info.detail))

    var appId = app.globalData.appid
    var session_key = app.globalData.session_key    
    var encryptedData = info.detail.encryptedData  
    var iv = info.detail.iv  

    var pc = new WXBizDataCrypt(appId, session_key)
    var data = pc.decryptData(encryptedData , iv)
    this.setData({
      hasPhoneNumber: true,
      phoneNumber: data.phoneNumber
    })
    
    //将手机号传给商户应用
    wmpf.Channel.invoke({
      command: 'passPhoneNumber',
      data: {
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        purePhoneNumber: data.purePhoneNumber
      },
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  clear() {
    console.log('wmpf clear phone number')
    this.setData({
      hasPhoneNumber: false,
      phoneNumber: ''
    })
  }
})
