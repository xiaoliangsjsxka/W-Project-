// pages/filedownload/downHomeWorld/downHomeWorld.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homwWorldList: []
  },
  download(e) {
    // console.log(e)
    let fileName = e.currentTarget.dataset.filename
    let studentName = e.currentTarget.dataset.username
    if (!fileName) {
      wx.showToast({
        icon: 'none',
        title: '该同学尚未提交此次作业',
      })
    } else {
      wx.downloadFile({
        url: app.baseUrl + 'student/homeworkDownload?fileName=' + fileName,
        // filePath: wx.env.USER_DATA_PATH  +'/test.docx', //自定义文件地址
        filePath: wx.env.USER_DATA_PATH  +`/${studentName}.docx`,
        success: function (res) {
          var filePath = res.filePath
          wx.openDocument({ //打开
            filePath: filePath,
            success: function (res) {}
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let homeworldid = options.homeworldid
    // console.log("本次作业id",homeworldid)
    wx.request({
      url: app.baseUrl + 'student/homeworksDetail',
      method: 'POST',
      data: {
        id: homeworldid
      },
      success: res => {
        console.log("dad", res)
        this.setData({
          homwWorldList: res.data.info[0].students
        })
      }
    })
    // wx.getSavedFileList({  // 获取文件列表
    //   success(res) {
    //     console.log(res)
    //     res.fileList.forEach((val, key) => { // 遍历文件列表里的数据
    //       // 删除存储的垃圾数据
    //       wx.removeSavedFile({
    //         filePath: val.filePath
    //       });
    //     })
    //   }
    // })
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