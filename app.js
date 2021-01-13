//app.js
import { MyApi } from "./utils/my-api.js";
const auth = require('./utils/wx-auth-util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: res => {
          this.globalData.navHeight = res.statusBarHeight;
          this.globalData.windowHeight = res.windowHeight;
          this.globalData.windowWidth = res.windowWidth;
      },
  })
    this.globalData.code = wx.getStorageSync('wxLoginCode');
    this.globalData.headerInfo.Authorization = wx.getStorageSync('token');
    if(!this.globalData.code||!this.globalData.headerInfo.Authorization){
      // this.firstLogin();
    }else{
      // wx.checkSession({
      //   success: res => {
      //     console.log("checkSession success");
      //     this.initUserInfo(false);
      //   },fail: err => {
      //     console.log("checkSession err");
      //     this.firstLogin();
      //   }
      // })
    }
  },
  firstLogin(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: '正在登录...',
          });
          auth.getWxLoginCode().then((res) =>{
            console.log("code--->"+res);
            // return;
            MyApi.regCode({
              code:res,
              success: data => {
                console.log("success data==>"+JSON.stringify(data));
                this.globalData.isLogin = true;
                this.globalData.headerInfo.Authorization = data.tokenHead+" "+data.token;
                wx.setStorageSync('token', data.tokenHead+" "+data.token);
                // this.globalData.openid = data.openid;
                this.initUserInfo(true);
              },
              error: error => {
                console.log("error error==>"+JSON.stringify(error));
                wx.hideLoading({
                  success: (res) => {},
                })
                wx.removeStorageSync('token');
                wx.removeStorageSync('wxLoginCode')
                wx.showToast({
                  icon:'none',
                  title: '登录失败，请重新登录'
                })
              },
            });
          });
        }
      }
    });
  },
  initUserInfo(isUpload){
    // 获取用户信息
    wx.getSetting({
     success: res => {
      // console.log("getSetting success");
       if (res.authSetting['scope.userInfo']) {
      
         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
         wx.getUserInfo({
           success: res => {
           
             // 可以将 res 发送给后台解码出 unionId
             this.globalData.userInfo = res.userInfo
             if(!isUpload){
              this.globalData.isLogin = true;
              return;
             }
             MyApi.userInfo({
               encryptedData:res.encryptedData,
               iv:res.iv,
               success: data => {
                wx.hideLoading({
                  success: (res) => {},
                });
                 console.log("success data==>"+JSON.stringify(data));
                 this.globalData.isLogin = true;
                 this.globalData.openid = data.openid;
               },
               error: error => {
                 wx.hideLoading({
                   success: (res) => {},
                 });
                 wx.showToast({
                  icon:'none',
                   title: '登录失败:'+error,
                 })
               },
             });
             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
             // 所以此处加入 callback 以防止这种情况
             if (this.userInfoReadyCallback) {
               this.userInfoReadyCallback(res)
             }
           }
         })
       }else{
          console.log("还未授权");
       }
     }
   })
},
  globalData: {
    windowHeight:0,
    windowWidth:0,
    navHeight:0,
    isLogin:false,
    userInfo: null,
    loginInfo:null,
    headerInfo:{
      Authorization:''
    },
    appId: 'wx8d44e6bdfb00615a',
    secret: '28ba2860bf251020623bf14c1b39144f',
    openid: '',//返回openid
    session_key: '',
    code: '',
    token:'',
    tokenHead:'',
    url:'https://hllyy.top'
  }
})