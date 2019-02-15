// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
// module.exports = {
//   formatTime: formatTime
// }
const config = require('../config');
let request = (url, data, succ, fail, method = 'POST', redirectLogin = false) => {
   if (data.token == undefined) {
     const token = wx.getStorageSync('token');
    data.token = token;
  }
  if (redirectLogin) {
    wx.navigateTo({
      url: '/page/pages/login/login',
    })
  }
  wx.request({
    url: url,
    data: data,
    success: (res) => {
      succ(res.data);
    },
    method: method,
    fail: (res) => {
      fail(fail)
    },
  });
};
/***
 * 地址跳转
 */
function bindRedirect(url) {
  //var url = e.target.dataset.value
  wx.navigateTo({
    url: url
  });
};
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
// 转换日期格式
let toDate = (number) => {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}

function setStorageSync(key, val) {
  if (key.indexOf(':') < 0) {
    key = config.b + ':' + key;
  }
  var _karr = config.host.split('.');
  key = _karr[0] + key;
  wx.setStorageSync(key, val);
};

function setStorage(obj) {
  var key = obj.key;
  if (key.indexOf(':') < 0) {
    key = config.b + ':' + key;
  }
  var _karr = config.host.split('.');
  obj.key = _karr[0] + key;
  wx.setStorage(obj);
};

function getStorageSync(key) {
  if (key.indexOf(':') < 0) {
    key = config.b + ':' + key;
  }
  var _karr = config.host.split('.');
  key = _karr[0] + key;
  return wx.getStorageSync(key);
}

function removeStorageSync(key) {
  if (key.indexOf(':') < 0) {
    key = config.b + ':' + key;
  }
  var _karr = config.host.split('.');
  key = _karr[0] + key;
  wx.removeStorageSync(key);
}
/*
 * 获取用户信息
 */
function getUserInfo(succ){
  wx.getSetting({
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: (res) => {
            succ(res.userInfo)
          }
        })
      }
    }
  })
}
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  request: request,
  toDate: toDate,
  setStorageSync: setStorageSync,
  setStorage: setStorage,
  getStorageSync: getStorageSync,
  removeStorageSync: removeStorageSync,
  bindRedirect: bindRedirect,//地址跳转方法
  getUserInfo: getUserInfo,//获取用户信息
}

