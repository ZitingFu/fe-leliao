// pages/home/home.js

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
        {'id':1, 'value':12},
        { 'id': 2, 'value': 13},
        { 'id': 3, 'value': 14},
        { 'id': 4, 'value': 15},
    ],
    msg: '小程序绑定值',
    is_true: true, //0 false    1 true
    id: 99,
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    numberArray: [1, 2, 3, 4],
    list_icon: [
      { url: 'https://static001.geekbang.org/account/avatar/00/10/70/b3/a07a9bf4.jpg', name: '首页'},
      { url: 'http://img2.imgtn.bdimg.com/it/u=4046568560,861792304&fm=26&gp=0.jpg', name: '社区' },
      { url: 'http://img3.imgtn.bdimg.com/it/u=4276491126,3511500973&fm=26&gp=0.jpg', name: '我的' },
      { url: 'http://img0.imgtn.bdimg.com/it/u=4099729563,2946474661&fm=26&gp=0.jpg', name: '发布' },
    ],
    /*可以移动区域*/
    x: 0,
    y: 0,
    /**icon  大小以及类型 */
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],
    /*text*/
    text: 'Click Me！',
    /*rich-text   标签样式*/
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'click me 程序跑通了会显示-->？'
      }]
    }],
    /*获取用户信息**/
    user:{},
    /*checkbox*/
    check_box: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    checkboxItems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本', checked: 'true' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    /*picker  选择器*/
    array: ['美国', '中国', '巴西', '日本'],/*普通*/
    index: 1,/*默认值*/
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],/*多列*/
    multiIndex: [0, 0, 0],/*默认值*/
    /*时间选择器*/
    time: '12:00',
    /*日期选择器*/
    date: '2018-09-10',
    /*省市区选择器*/
    region: ['陕西省', '西安市', '长安区'],/*默认值*/
    /*滚动选择器*/
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    checked: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
        // this.setData({
        // })
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
   /**video */
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  },
  /*text*/
  textBind(){
    this.setData({
        text: "我是你点击过后的text文本"
    })
  },
  /*rich-text*/
  RichtextBind(){
    // 这块对象数组不能直接取值  因为index是动态的  
    var text  = "nodes["+0+"].children["+0+"].text";
    // var style = "nodes[" + 0 +"].attrs.style";  对象的写法
    // var name = "nodes.name";
    this.setData({
      [text]: "hello world!",
      ["nodes[" + 0 +"].attrs.style"]: "line-height: 80px; color: green;",
      /*注释部分为替换成图片标签*/
      // ["nodes[" + 0 + "].name"]: 'img',   
      // ["nodes[" + 0 + "].attrs.src"]:"http://img0.imgtn.bdimg.com/it/u=4099729563,2946474661&fm=26&gp=0.jpg"
    })
  },
  /**button 时间获取用户信息 */
  onGotUserInfo: function (e) {
    console.log(e);
    this.setData({
      ["user.name"]: e.detail.userInfo.nickName,
      ["user.area"]: e.detail.userInfo.country,
      ["user.avatar"]: e.detail.userInfo.avatarUrl,
    })
  },
  /**获取手机号 */
  getPhoneNumber: function (e){
    console.log(e);
  },
  /*check-box*/
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  /*form 表单提交*/
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  checkboxChange: function (e) {
    console.log(e)
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  /*picker  选择器   普通*/
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /*多列选择器*/
  bindchange: function (e){
    console.log(e)
  },
  bindMultiPickerChange: function (e){
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log(e)
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        // data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /*选择器  取消*/
  BindCancel: function (e){
    console.log(e);
    wx.showModal({/*微信弹框*/
      title: '取消选择',
      content: '取消选择系统将获取默认选择或最终的选择',
      mask: false,
      showCancel: true,//双事件     false  单事件按钮
      confirmText: '我知道了',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: '/page/pages/user/user',
          });
        } else {
          wx.redirectTo({
            url: '/page/pages/home/home',
          });
        }
      }
    })
  },
  /*时间选择器*/ 
  bindTimeChange: function (e){
      this.setData({
        time: e.detail.value
      })
  },
  /*日期选择器*/
  bindDateChange: function (e){
    this.setData({
      date: e.detail.value
    })
  },
  /*省市区选择器*/
  bindRegionChange: function (e){
    this.setData({
      region: e.detail.value
    })
  },
  /*滚动选择器*/
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  /*单项选择器  radio*/
  radioChange: function (e) {
    // console.log(e)
  },
  /*开关选择器*/
  switch2Change: function (e) {
    console.log(e.detail.value)
  },
  /*多行输入框*/
  
})