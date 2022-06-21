// pages/filedownload/filedownload.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    homeworldList: [],
    fileList: [],
    homeworldId: 1,
    referList: []
  },
  toDownload(e) {
    let homeworldid = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: './downHomeWorld/downHomeWorld?homeworldid=' + homeworldid,
    })
  },
  uploadHomeworld(e) {
    let homeworldId = e.currentTarget.dataset.id
    this.setData({
      homeworldId: homeworldId
    })
    let userId = app.userId
    console.log(homeworldId, userId)
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: res => {
        let tempFiles = res.tempFiles
        console.log(tempFiles)
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
        name: app.userId + item.name,
        url: app.baseUrl + 'student/uploadHomeworks',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flag: app.flag
    })
    wx.request({
      url: app.baseUrl + 'student/showAllHomeworks',
      method: 'get',
      success: res => {
        let homeList = res.data.info
        this.setData({
          homeworldList: homeList
        })
      }
    })
    wx.request({
      url: app.baseUrl + 'showAllDocs',
      method: 'GET',
      success: res => {
        // console.log("参考资料",res)
        let referList = res.data.info
        this.setData({
          referList: referList
        })
      }
    })
  },

  //下载参考资料
  downRefer(e) {
    let referName = e.currentTarget.dataset.refername
    wx.downloadFile({
      url: app.baseUrl + 'docDownload?fileName=' + referName,
      filePath: wx.env.USER_DATA_PATH + `/${referName}.docx`,
      success: function (res) {
        var filePath = res.filePath
        wx.openDocument({ //打开
          filePath: filePath,
          success: function (res) {}
        })
      }
    })
  },
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