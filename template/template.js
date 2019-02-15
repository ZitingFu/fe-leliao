// template/template.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentUrl : {
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        
    },
    // //红点
    // redDot: {
    //     type: Boolean,
    //     value: false,
    //     observer: function(newVal, oldVal){
    //         this.setData({redDot: newVal});
    //     }
    // },
    login: {
        type: Boolean,
        value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
      
  },
  /**
   * 组件的方法列表
   */
  methods: {
    Publish: function(e){
        var myEventDetail = {} // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('click', myEventDetail, myEventOption);  
    },
    previewUrl: function (e) {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('click', myEventDetail, myEventOption);  
    }
  }
})
