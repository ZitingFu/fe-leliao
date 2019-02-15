// page/pages/login/login.js
const config = require('../../../config');
const util = require('../../../util/util');
const app = getApp();
var that;
var token;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redirectUrl: '/page/pages/home/home',
  },
  onLoad: function (options) {
    that = this;
    if (options.r != undefined){
      that.setData({
        redirectUrl: options.r
      });
    }
  },
  onGetUserInfo: function (e) {
    console.log(e)
    app.login(e.detail.encryptedData, e.detail.iv, res => {
      wx.setStorageSync("token", res.data.data.token)
      token = res.data.data.token;
      //更新用户基本信息
      var userinfo = {};
      userinfo.name = e.detail.userInfo.nickName;
      userinfo.avatar = e.detail.userInfo.avatarUrl;
      userinfo.sex = e.detail.userInfo.gender;
      util.request(config.UserInfoUpdate, userinfo, re => {
        wx.reLaunch({
          url: that.data.redirectUrl,
        })
      });
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: util.getStorageSync(config.b + ":share_title"),
      imageUrl: util.getStorageSync(config.b + ":share_image"),
      path: '/page/pages/home/home',
      success: function (res) {
        util.setStorageSync(config.b + ':SVIP', 1)
        // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'none',
          duration: 2000
        });
      },
      fail: function (res) {
        util.setStorageSync(config.b + ':SVIP', 1)
        // 转发失败
      }
    }
  }
})
// 验证码倒计时
var syncSecond = function () {
  leftSecond--;
  if (leftSecond < 1) {
    that.setData({ codeMsg: '重新发送' });
    return;
  }
  that.setData({ codeMsg: leftSecond + '秒后重试' });
  load = setTimeout(syncSecond, 1000);
};
