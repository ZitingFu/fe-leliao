/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

// var host = "m.pailifan.com/xcx"
var host = "wananle.cn/leliao"
var config = {
  //  b,
    // 下面的地址配合云端 Server 工作
    host,

    // 提交用户授权信息
    //update: `https://${host}/u/update`,
    //首页
    home: `https://${host}/home/home`,

    //登陆 
    login: `https://${host}/user/login`,
    //图片上传
    image: `https://${host}/upload/image`,
    
    
    //话题  段子  日记  发布
    TopicCreate: `https://${host}/topic/create`,
    //话题类型列表
    TopicList: `https://${host}/topic/list`,
    //话题详情
    TopicInfo: `https://${host}/topic/info`,

    
    //用户
    UserInfoUpdate: `https://${host}/user/update`, 
};

module.exports = config
