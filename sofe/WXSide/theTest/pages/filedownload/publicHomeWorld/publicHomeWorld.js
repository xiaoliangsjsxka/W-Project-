// pages/filedownload/publicHomeWorld/publicHomeWorld.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
  },
  inputChange: function(e) {
    let type = e.currentTarget.dataset.type;
    if (type == 'title') {
      this.setData({
        title: e.detail.value
      })
    }
  },
  confirm() {
    console.log("发起作业提交")
    if (this.data.title == '') {
      wx.showToast({
        title: '作业标题为空',
        icon: 'none'
      });
      return;
    }
    var that = this
    wx.request({
      url: app.baseUrl +  'teacher/buildHomework',
      method:'POST',
      data:{
        title:this.data.title
      },
      success:res=> {
        console.log(res)
        wx.showToast({
          title: '发起成功',
          icon:'success'
        })
      }
    })
    this.setData({
      modalName: null,
      title:''
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    })
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

  }
})