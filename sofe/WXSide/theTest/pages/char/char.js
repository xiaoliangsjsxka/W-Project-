// pages/char/char.js
const app = getApp().globalData;
var websocket = require('../../utils/websocket.js');
var utils = require('../../utils/util.js');
import socket from '../../utils/socket.io.js'
let io = socket('http://localhost:3000/')
import config, {
  HTTP_REQUEST_URL,
  HEADER,
  USER_ID,
  OPEN_ID
} from "../../utils/config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    newslist: [],
    userInfo: {},
    scrollTop: 0,
    increase: false, //图片添加区域隐藏
    aniStyle: true, //动画效果
    message: "",
    previewImgList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:app.userName
    })
    io.on("connect", () => {
    })
    io.on('talk',(res)=>{
      console.log(res)
      this.setData({
        newslist:this.data.newslist.concat(res)
      })
    })
    wx.request({
      url:app.baseUrl + 'showTalkList',
      method:'GET',
      success:res=> {
        console.log(res)
        let data = res.data.info
        this.setData({
          newslist:this.data.newslist.concat(data)
        })
      }
    })

  },
  send() {
    io.emit("talk", {name:app.userName,info:this.data.message})
    
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
  //监听input值的改变
  bindChange(res) {
    // console.log(res.detail.value)
    this.setData({
      message: res.detail.value
    })
  },
  cleanInput() {
    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值
    this.setData({
      message: this.data.message
    })
  },
  increase() {
    this.setData({
      increase: true,
      aniStyle: true
    })
  },
  //点击空白隐藏message下选框
  outbtn() {
    this.setData({
      increase: false,
      aniStyle: true
    })
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