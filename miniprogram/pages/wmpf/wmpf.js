const app = getApp()
Page({
  data: {
  },

  onLoad() {
  },

  wmpfLogin() {
    console.log("wmpf wmpfLogin")
    wx.navigateTo({
      url: '../wmpfLogin/wmpfLogin',
    })
  },

  wmpfGetUserInfo() {
    console.log("wmpf wmpfGetUserInfo")
    wx.navigateTo({
      url: '../wmpfGetUserInfo/wmpfGetUserInfo',
    })
  },

  wmpfGetOpenData() {
    console.log("wmpf wmpfGetOpenData")
    wx.navigateTo({
      url: '../wmpfOpenData/wmpfOpenData',
    })
  },

  wmpfGetPhoneNumber() {
    console.log("wmpf wmpfGetPhoneNumber")
    wx.navigateTo({
      url: '../wmpfGetPhoneNumber/wmpfGetPhoneNumber',
    })
  },

  wmpfShareButton() {
    console.log("wmpf wmpfShareButton")
    wx.navigateTo({
      url: '../wmpfShareButton/wmpfShareButton',
    })
  },

  wmpfSubscribeMessage() {
    console.log("wmpf wmpfSubscribeMessage")
    wx.navigateTo({
      url: '../wmpfSubscribeMessage/wmpfSubscribeMessage',
    })
  },

  wmpfFacePay() {
    console.log("wmpf wmpfFacePay")
    wx.navigateTo({
      url: '../wmpfFacePay/wmpfFacePay',
    })
  },

  wmpfInvokeChannel() {
    console.log("wmpf wmpfInvokeChannel")
    wx.navigateTo({
      url: '../wmpfInvokeChannel/wmpfInvokeChannel',
    })
  }

})
