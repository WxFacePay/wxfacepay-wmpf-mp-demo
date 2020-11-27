Page({
  data: {
    hasUserInfo: false
  },
  getUserInfo(info) {
    console.log("wmpf get UserInfo")
    const userInfo = info.detail.userInfo
    console.log(JSON.stringify(userInfo))
    this.setData({
      userInfo,
      hasUserInfo: true
    })
  },
  clear() {
    console.log('wmpf clear userInfo')
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  }
})
