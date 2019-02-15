// page/pages/publish/publish.js
const config = require('../../../config');

const util = require('../../../util/util');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最大字符数
    maxTextLen: 1000,
    // 默认长度
    textLen: 0,
    //发布类型
    types: [
      { name: '心情', type: 1},
      { name: '段子', type: 2},
      { name: '日记', type: 3},
    ],
    images: [],//上传图片
    images_bd: [], 
    upload_img_types: true,
    showLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    // app.checkLogin();
  },
  /**文本输入字节 */
  getWords(e) {
     let page = this;
    // 设置最大字符串长度(为-1时,则不限制)
    let maxTextLen = page.data.maxTextLen;
    // 文本长度
    let textLen = e.detail.value.length;

    page.setData({
      maxTextLen: maxTextLen,
      textLen: textLen
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
    if (app.getToken() == '') {
      that.setData({ showLogin: false });
    } else {
      that.setData({ showLogin: true });
    }
    app.checkLogin();
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
  /***
   * form提交事件
   */
  bindFormSubmit: function (e) {
    var data = [];
    data = e.detail.value;
    data.images = JSON.stringify(that.data.images);
    console.log('form发生了submit事件，携带数据为：', e.detail)
    console.log(data)
    if (!data.type || !data.content.replace(/\s+/g, '')) {
      wx.showToast({
        title: !data.type ? "请选择话题类型" : "话题内容不能为空",
        icon: 'none',
        duration: 2000
      });
      return;
    }
    util.request(config.TopicCreate, data, function (ret) {
      if (ret.flag == 0) {
        wx.showModal({
          title: '发布成功',
          content: '快去首页查看最新发布的话题吧！',
          mask: true,
          showCancel: false,
          confirmText: '我知道了',
          success: function (res) {
            wx.navigateTo({
              url: '../../pages/home/home?'
            });
          }
        })
      }else{
        wx.showModal({
          title: '发布失败',
          content: '请联系工作人员处理！',
          mask: true,
          showCancel: true,
          confirmText: '继续发布',
          cancelText: '回到首页',
          success: function (res) {
            // wx.navigateTo({
            //   url: '../../pages/publish/publish?'
            // });
            if (res.confirm) {
              wx.redirectTo({
                url: '../../pages/publish/publish'
              });
            } else {
              wx.redirectTo({
                url: '../../pages/home/home'
              });
            }
          }
        })
      }
    })
  },
  // 点击上传图片
  uploadImg: () => {
    wx.chooseImage({
      count: 10, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.uploadFile({
          url: config.image,
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
          },
          success: function (ress) {
            if (ress.flag) {
              wx.showToast({
                title: "上传图片失败",
                icon: 'none',
                duration: 2000
              });
              return;
            }
            var ims = JSON.parse(ress.data);
            var tempFilePaths = ims.data.url;
            that.data.images.push(tempFilePaths)
            that.data.images_bd.push(res.tempFilePaths[0])
            if (that.data.images.length == 6) {
              that.setData({ upload_img_types: false });
            }
            that.setData({ images: that.data.images, images_bd: that.data.images_bd });
          }
        })
      },
      fail: function (res) {
      }
    })
  },
  // 删除图片
  del: (e) => {
    var id = e.currentTarget.dataset.id;
    that.data.images.splice(id, 1);
    that.data.images_bd.splice(id, 1);
    that.setData({ images: that.data.images, upload_img_types: true, images_bd: that.data.images_bd });
    if (that.data.images.length == 0) {
      that.setData({ msg_types: true, gray: false });
    }
  },
  //获取用户信息
  // getUserInfo: function (e) {
  //   app.login(e.detail.encryptedData, e.detail.iv, res => {
  //     that.setData({showLogin: true });
  //   });
  // },
})