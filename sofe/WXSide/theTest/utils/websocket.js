import {WSS_SERVER_URL} from "config.js"
 
//定时标识
let timing = false
 
//建立连接
function connect(user, func) {
  //设置socket连接地址 socketUrl
  wx.connectSocket({
    url: `${WSS_SERVER_URL}?type=ask&fid=${user.id}&tid=100`,
    header: { 'content-type': 'application/json' },
    success: function () {
      console.log('websocket连接成功~')
    },
    fail: function () {
      console.log('websocket连接失败~')
    }
  })
  //连接成功
 wx.onSocketOpen(function (res) {
    wx.showToast({
      title: 'websocket已开通~',
      icon: "success",
      duration: 2000
    })
    //接受服务器消息
    wx.onSocketMessage(func);//func回调可以拿到服务器返回的数据
 });
 
 //启动心跳包
 linkWebsocketXin(40000, true)
 
 wx.onSocketError(function (res) {
    wx.showToast({
      title: 'websocket连接失败，请检查！',
      icon: "none",
      duration: 2000
    })
 })
}
//心跳包
function linkWebsocketXin(time, status) {
  if (status == true) {
    timing = setInterval(function () {
      console.log("当前心跳已重新连接");
      //循环执行代码
      wx.sendSocketMessage({
        data: JSON.stringify({
          type: 'active'
        }),
        fail(res) {
          // console.log(res)
        }
      });
    }, time) //循环时间，注意不要超过1分钟  
  } else {
    //关闭定时器
    clearInterval(timing);
    console.log("当前心跳已关闭");
  }
}
//发送消息
function send(msg) {
  //关闭心跳包定时器
  linkWebsocketXin(40000, false)
  wx.sendSocketMessage({
    data: msg,
    success:res=>{
      //重启心跳包
      linkWebsocketXin(40000, true)
    }
  });
}
module.exports = {
 connect: connect,
 send: send,
 linkWebsocketXin:linkWebsocketXin
}