// pages/mine/mine.js
const app = getApp().globalData
Page({
  data: {
    fileList: [],
    flag: 1
  },
  publicHomeWorld() {
    wx.navigateTo({
      url: '/pages/filedownload/publicHomeWorld/publicHomeWorld',
    })
  },
  filedownload() {
    wx.navigateTo({
      url: '/pages/filedownload/filedownload',
    })
  },
  ChooseFile() {
    console.log("上传文件")
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: res => {
        let tempFiles = res.tempFiles
        this.setData({
          fileList: tempFiles
        })
      }
    })
  },
  uploadFile() {
    let tempFiles = this.data.fileList
    console.log(tempFiles)
    tempFiles.forEach(item => {
      console.log(item)
      wx.uploadFile({
        filePath: item.path,
        name: item.name,
        id: app.userId,
        url: app.baseUrl + 'teacher/buildDoc',
        method: "post",
        formData: {
          fileName: app.userId + item.name,
          id: this.data.homeworldId,
          name: app.userName,
        },
        header: {
          "content-type": "multipart/form-data"
        },
        success: result => {
          console.log(result)
        }
      })
    })
    this.setData({
      fileList: []
    })
    wx.showToast({
      title: '上传成功',
      icon: 'success'
    })
  },
  DelFile(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    wx.showModal({
      title: '删除文件',
      content: '确定这个文件吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.fileList.splice(index, 1)
          this.setData({
            fileList: this.data.fileList
          })
        }
      }
    })
  },

  //修改密码
  toUpdatePassword() {
    wx.navigateTo({
      url: './updatePassword/updatePassword',
    })
  },
  toHomeWorldList() {
    wx.navigateTo({
      url: '/pages/filedownload/filedownload',
    })
  },
  onLoad: function (options) {
    console.log("sdasda", app.flag)
    this.setData({
      flag: app.flag
    })
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