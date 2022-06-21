// pages/mine/updatePassword/updatePassword.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  inputChange: function(e) {
    let type = e.currentTarget.dataset.type;
    if (type == 'origin') {
      this.setData({
        originPassword: e.detail.value.replace(/\s*/g, "")
      })
    } else if (type == 'new') {
      this.setData({
        newPassword: e.detail.value.replace(/\s*/g, "")
      })
    } else {
      this.setData({
        confirmPassword: e.detail.value.replace(/\s*/g, "")
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },
  updatePassword: function() {
    if (this.data.originPassword == '') {
      wx.showToast({
        title: '原始密码为空',
        icon: 'none'
      })
      return;
    } else if (this.data.newPassword == '') {
      wx.showToast({
        title: '新的密码为空',
        icon: 'none'
      })
      return;
    } else if (this.data.confirmPassword == '') {
      wx.showToast({
        title: '确认密码为空',
        icon: 'none'
      })
      return;
    }
    if (this.data.newPassword != this.data.confirmPassword) {
      wx.showToast({
        title: '新密码和确认密码不一样',
        icon: 'none'
      })
      return;
    }
    if (this.data.originPassword == this.data.confirmPassword) {
      wx.showToast({
        title: '新密码和原始密码一样',
        icon: 'none'
      })
      return;
    }
    let flag = app.flag
    if(flag == 1) {
      //教师修改密码
      
    }else {
      wx.request({
        url:app.baseUrl +  'student/infoChange',
        method:'POST',
        data:{
          id:app.userId,
          data:{
            psw:this.data.newPassword
          }
        },
        success:res=> {
          console.log(res)
          wx.reLaunch({
            url: '/pages/mine/mine',
          })
        }
      })
    }
  }
})
