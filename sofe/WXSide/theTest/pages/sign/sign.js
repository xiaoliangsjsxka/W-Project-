// pages/sign/sign.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:'正在使用lbs定位，请稍候....',
    time:'LBS签到',
    tip:'未签到',
    _id:1,
    baseUrl:'http://localhost:3000/'
  },
  ToSign() {
    // console.log(this.data.location)
    let name =  app.globalData.userName
    wx.request({
      url:this.data.baseUrl + 'student/studentSign',
      method:'POST',
      data:{
        id:this.data._id,
        name:name,
        info:this.data.location
      },
      success:res=> {
        console.log(res)
      }
    })
    let date = new Date();
    let hour = date.getHours();
    if(hour < 10) {hour = '0' + hour}
    let minute = date.getMinutes();
    if(minute < 10) {minute = '0' + minute}
    let time = hour + ":" + minute
    this.setData({
      time:time,
      tip:'已签到'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("活动id",options._id)
    this.setData({
      _id:options._id
    })
    setTimeout(() => {
      this.GetLocation()
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  GetLocation() {
    // var key = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77' //写自己申请的key
    wx.getLocation({
      type: 'wgs84',
          success:  res=> {
            wx.request({
              url:"https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=ZDVBZ-DGJKW-TVJRX-RIIB5-Z27X7-BLBPQ",
              success: res=> {
                console.log(res);
                //根据自己项目需求获取res内容
                var addresscity = res.data.result.address
                console.log(addresscity)
                this.setData({
                  location:addresscity
                })
              }
            })
          },
        })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})