const config = require('./config');
const util = require('./util/util');
const innerAudioContext = wx.createInnerAudioContext();
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //存储首次播放音乐
    // wx.setStorageSync("radio", 1);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login: function (encryptedData, iv, succFunc) {
    if (!encryptedData && !iv) {
      wx.showModal({
        title: '无法完成登录',
        showCancel: false,
        content: '「乐聊」小程序需要获取你的用户资料，用于登录。请重试登录并确保允许小程序获取用户资料',
      })
      return false;
    }
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: config.login,
          data: {
            code: res.code,
            encrypted_data: encryptedData,
            iv: iv
          },
          method: 'POST',
          success: function (ress) {
            console.log(ress)
           wx.setStorageSync("token", ress.data.token);
            succFunc(ress);
          }, fail: function (res) {
            wx.showModal({
              title: '登录失败',
              content: '登录失败，请重启小程序以完成登录',
            })
          }
        })
      }
    })
  },
  onShow: function (options) {
    //清空本地存储地址
    
  },
  //获取用户token
  getToken: function () {
     return wx.getStorageSync('token');
  },
  checkLogin: function (url) {
    
    if(url == ''){
      var pages = getCurrentPages(); //获取加载的页面
      var currentPage = pages[pages.length - 1]; //获取当前页面的对象
      var url = currentPage.route; //当前页面url
    }else{
      var url = url;
    }
    if (this.getToken() == false) {
      wx.navigateTo({
        url: '/page/pages/login/login?r=/' + url,
      })
      return false;
    }
  },
  //音乐播放
  musicPlay: function (src, status) {
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var url = currentPage.route; //当前页面url
    if (status == true && url == 'page/pages/home/home') {
      innerAudioContext.autoplay = status;
      innerAudioContext.src = src;
      innerAudioContext.loop = status;
      console.log(src);
      innerAudioContext.play();
    }else{
      innerAudioContext.pause();
    }
  },
  globalData: {
    userInfo: null
  }
})
