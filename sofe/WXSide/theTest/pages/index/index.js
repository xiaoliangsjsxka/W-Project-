// index.js
// 获取应用实例
const app = getApp().globalData;

Page({
  data: {
  active:[],
   flag:2, 
   title:'',
   time: '12:01',
   endTime:'12:05',
   baseUrl:'http://222.16.23.130:3000/'
  },
  RoSignIn(e) {
    // console.log(e)
    let _id = e.currentTarget.dataset._id
    wx.navigateTo({
      url: '/pages/sign/sign?_id='+_id,
    })
  },
  signDetail() {
    wx.navigateTo({
      url: '/pages/signList/signList',
    })
  },
  inputChange: function(e) {
    let type = e.currentTarget.dataset.type;
    if (type == 'title') {
      this.setData({
        title: e.detail.value
      })
    }
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  EndTimeChange(e) {
    this.setData({
      endTime:e.detail.value
    })
  },
  confirm() {
    console.log("发起签到")
    if (this.data.title == '') {
      wx.showToast({
        title: '标题为空',
        icon: 'none'
      });
      return;
    }
    var that = this
    // console.log("标题",this.data.title,"开始时间",this.data.time,"结束时间",this.data.endTime)
    wx.request({
      url: app.baseUrl +  'teacher/buildActive',
      method:'POST',
      data:{
        name:this.data.title,
        startTime:this.data.time,
        endTime:this.data.endTime
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
  onLoad(optins) {
    let flag = parseInt(app.flag )
    console.log("类型:",flag)
    this.setData({
      flag:flag
    })
    if(flag == 2) {
      wx.request({
        url:app.baseUrl +  'student/showAllActives',
        method:'GET',
        success:res=> {
          console.log(res)
          this.setData({
            active:res.data.info
          })
        }
      })
    }
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
})
