// page/pages/topicinfo/topicinfo.js
const util = require('../../../util/util');
const config = require('../../../config');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;
      console.log(options)
    // if (app.getToken() == '') {
    //   that.setData({ has_login: false });
    // } else {
    //   that.setData({ has_login: true });
    // }
    //请求首页接口  首页
    util.request(config.TopicInfo, {id: options.id}, res => {
      console.log(res.data.info)
      that.setData({
        info: res.data.info
      });
    });
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