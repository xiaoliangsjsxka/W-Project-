// pages/login/login.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    account: '',
    password: '',
    openId: '',
    loginType: true,
    baseUrl:'http://222.16.23.130:3000/'
  },
  switchTo: function(e) {
    this.setData({
      flag: e.detail.value
    })
  },
  inputChange: function(e) {
    let type = e.currentTarget.dataset.type;
    if (type == 'account') {
      this.setData({
        account: e.detail.value.replace(/\s*/g, "")
      })
    } else {
      this.setData({
        password: e.detail.value.replace(/\s*/g, "")
      })
    }
  },
  login: function() {
    if (this.data.account == '') {
      wx.showToast({
        title: '帐号为空',
        icon: 'none'
      });
      return;
    }
    if (this.data.password == '') {
      wx.showToast({
        title: '密码为空',
        icon: 'none'
      });
      return;
    }
    var that = this;
    console.log(this.data.flag)
    if(this.data.flag == 2) {
      // console.log("学生登录")
      wx.request({
        url: app.baseUrl + 'student/login',
        data:{
          name:this.data.account,
          psw:this.data.password
        },
        method:'POST',
        success:res=> {
          if(res.data.status == 400) {
            wx.showToast({
              title: '账号或密码错误',
              icon:'error'
            })
          }else {
            console.log("学生登录",res)
            app.userName = this.data.account
            app.flag = this.data.flag
            app.userId = res.data.data.id
            wx.reLaunch({
              url: '/pages/index/index',
            })
          } 
        }
      })
    }else {
      // console.log("教师登录")
      wx.request({
        url:  app.baseUrl + 'teacher/login',
        data:{
          name:this.data.account,
          psw:this.data.password
        },
        method:'POST',
        success:res=> {
          if(res.data.status == 400) {
            wx.showToast({
              title: '账号或密码错误',
              icon:'error'
            })
          }else {
            console.log("教师登录",res)
            app.userName = this.data.account
            app.flag = this.data.flag
            app.userId = res.data.data.id
            wx.reLaunch({
              url: '/pages/index/index',
            })
          } 
        }
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
  showLoginTab: function(){
    wx.showModal({
      title: '登录说明',
      content: '该帐号为学生学号或教师帐号, 用于标识学生的信息所属或教师管理范围, 无法注册, 只能通过管理员录入',
      showCancel: false,
      confirmColor: '#1e90ff'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})