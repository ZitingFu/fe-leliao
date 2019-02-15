// pages/user/user.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLogin: false,
    user: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    if (app.getToken() == '') {
      that.setData({ has_login: false });
    } else {
      that.setData({ has_login: true });
    }
    that.setData({
      user: app.globalData.userInfo
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
    app.musicPlay('', false);
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
  
  },
  previewUrl: function () {
    console.log('dddddddddddddddddddddddddddddddddddddddddddddd')
    var url = 'page/pages/user/user?';
    app.checkLogin(url);
    wx.navigateTo({
      url: url
    });
  }
})