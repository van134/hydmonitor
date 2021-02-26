// pages/mine/mine.js
import { MyApi } from "../../utils/my-api.js";
const app = getApp()
const auth = require('../../utils/wx-auth-util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowModal:false,
    isLogin:app.globalData.isLogin,
    userInfo:app.globalData.userInfo,
    userE:null, 
    phoneNumberE:null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLogout:false
  },
  jumpLogin(){
    // MyApi.getOrderDetail({id:"",success:data=>{},error:error=>{}});
    wx.showModal({
      title: '提示',
      content: '请先登录！',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }
      }
    });
  },
  rentLog() {
    if(!app.globalData.isLogin){
      this.jumpLogin();
    }else{
      wx.navigateTo({
        url: '/pages/rentlist/rentlist',
      })
    }
  },
  repair(){
    if(!app.globalData.isLogin){
      this.jumpLogin();
    }else{
      wx.navigateTo({
        url: '/pages/repair/repair',
      })
    }
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  bindGetUserInfo (e) {
    if(!e.detail.userInfo){
      return;
    }
    // auth.grantUser(e);
    console.log(JSON.stringify(e));
    // app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      isShowModal:true,
      userE:e
    });
    // this.setData({
    //   userInfo:e.detail.userInfo
    // });
  },
  getPhoneNumber (e) {
    console.log(JSON.stringify(e));
    this.setData({
      phoneNumberE:e,
      isShowModal:false
    });
    this.firstLogin();
  },
  cancelModal(){
    this.setData({
      isShowModal:false,
      phoneNumberE:null
    });
    this.firstLogin();
  },
  firstLogin(){
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
          app.globalData.isLogin = true;
          app.globalData.headerInfo.Authorization = data.tokenHead+" "+data.token;
          wx.setStorageSync('token', data.tokenHead+" "+data.token);
          // this.globalData.openid = data.openid;
          this.initUserInfo();
        },
        error: error => {
          wx.hideLoading({
            success: (res) => {},
          });
          wx.showToast({
           icon:'none',
            title: '登录失败:'+error,
          })
          console.log("error error==>"+JSON.stringify(error));
        },
      });
    });
  },
  
  _confirmEvent(){

  },
  mkcall(){
    wx.makePhoneCall({
      phoneNumber:'123456'
    })
  },

  logout:function(){
    wx.showModal({
      title: '提示',
      content: '确定注销退出系统吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          app.globalData.isLogin = false;
          wx.redirectTo({
              url: '/pages/login/login'
          });
          
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.userInfo.avatarUrl = "../../image/head.png";
    this.setData({
      userInfo: app.globalData.userInfo,
      isLogin:app.globalData.isLogin
    });
    console.log("gload host:"+app.globalData.host);
    MyApi.regCode({
      code:'aaa',
      success: data => {
        console.log("success data==>"+JSON.stringify(data));
        app.globalData.isLogin = true;
        app.globalData.headerInfo.Authorization = data.tokenHead+" "+data.token;
        wx.setStorageSync('token', data.tokenHead+" "+data.token);
        // this.globalData.openid = data.openid;
        this.initUserInfo();
      },
      error: error => {
        wx.hideLoading({
          success: (res) => {},
        });
        wx.showToast({
         icon:'none',
          title: '登录失败:'+error,
        })
        console.log("error error==>"+JSON.stringify(error));
      },
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
    //从修改密码页面回来后 判断如果需要退出 则退出让其重新登录
    if(this.data.isLogout){
      wx.removeStorageSync("passwrod");
      wx.removeStorageSync("checked");
      app.globalData.isLogin = false;
      app.globalData.userInfo = {};
      app.globalData.isLogin = false;
      wx.redirectTo({
          url: '/pages/login/login'
      });
    }
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