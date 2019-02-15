// page/pages/home/home.js
const util = require('../../../util/util');
const config = require('../../../config');
var app = getApp();
var n;
var that;
var interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_type: [
      { url: 'https://yiqilai-image.oss-cn-beijing.aliyuncs.com/leliao/images/pexels-photo-261501%20%281%29.jpeg_gaitubao_com_150x100.jpg', name: '心情',value: '/page/pages/user/user?'},
      { url: 'https://yiqilai-image.oss-cn-beijing.aliyuncs.com/leliao/images/%E5%9B%BE%E6%A0%87%E5%9B%BE%E7%89%87%28%E9%9F%B3%E4%B9%90%29.jpeg_gaitubao_com_200x133.jpg', name: '音乐', value: '/page/pages/user/user?'},
      { url: 'https://images.pexels.com/photos/160914/smile-man-worker-vertical-160914.jpeg?auto=compress&cs=tinysrgb&h=350', name: '段子', value: '/page/pages/user/user?'},
      { url: 'https://images.pexels.com/photos/1089553/pexels-photo-1089553.jpeg?auto=compress&cs=tinysrgb&h=350', name: '日记', value: '/page/pages/user/user?'},
    ],
    topic_list: [],
    animation: '',//背景音乐
    has_login: false
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
    //请求首页接口  首页
    util.request(config.home, {}, res => {
      console.log(res.data)
      that.setData({ 
          list_banner: res.data.list
        });
    });
    util.request(config.TopicList, {}, res => {
      console.log(res.data)
      that.setData({
        topic_list: res.data.list
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
    that.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50 % 0',
      success: function (res) {

      }      
    })
    // if (wx.getStorageSync('radio') != '') {
    //背景音乐控制
    clearInterval(interval);
    n = 0;
    interval = setInterval(function () {
      n++;
      that.rotateAni(n);
    }, 1400);
      var src = 'http://yiqilai-image.oss-cn-beijing.aliyuncs.com/leliao/radio/%E4%B8%A2%E7%81%AB%E8%BD%A6%E4%B9%90%E9%98%9F%20-%20%E7%A7%8B%E5%9F%8E.mp3';
      app.musicPlay(src, true);
    // }
  },
  rotateAni: function (n) {
    that.animation.rotate(180 * (n)).step()
    that.setData({
      animation: that.animation.export()
    })
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
  /**
   * 获取banner列表
   */
  // getBanner: e => {
  //   util.request(config.home, {}, res => {
  //     that.setData({ "list": { date: res.data }, "total_page": 0, pn: 1 });
  //   });
  // },
  /**地址跳转 */
  bindRedirect: function (e) {
    var url = e.target.dataset.value
    util.bindRedirect(url)
  },
  previewUrl: function (){
    var url ='page/pages/publish/publish?';
    app.checkLogin(url);
    wx.navigateTo({
          url: '/page/pages/publish/publish?'
    });
  },
  /** 
   *  跳转到话题详情
   */
  getTopicInfo: function (e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/pages/topicinfo/topicinfo?id=' + id
    });
  }
})
