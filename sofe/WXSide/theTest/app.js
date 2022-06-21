// app.js
App({
  onLaunch() {
    // 展示本地存储能力g
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    userName:'',
    flag:1,
    _id:1,
    baseUrl:'http://localhost:3000/',
    userId:1
  }
})
