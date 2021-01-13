const util = require('../../utils/util.js');
// import {
//   mobile,
//   vertify
// } from '../../api'
//const api = require('../../utils/api.js');

// const VERIFY_URL = "appFrontEnd/v2/user/verifySms";
//const BIND_URL = "authApi/bindUser";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    userName: '',
    pwd:'',
    loadingHidden: true,
    checked: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let checked = wx.getStorageSync('checked');
    let un = wx.getStorageSync("username");
    console.log(un);
    if(checked){
      let pw = wx.getStorageSync("password");
      this.setData({
        pwd:pw,
      });
    }
    this.setData({
      userName:un,
      checked:checked
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
    // 隐藏掉左上角的home图标
    wx.hideHomeButton();
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
    clearInterval(this.data.timeD)
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

  checkboxChange: function (e) {
    console.log(JSON.stringify(e));
    if (this.data.checked) {
      this.setData({
        checked: false
      })
      wx.setStorageSync("checked",false);
    } else {
      this.setData({
        checked: true
      })
      wx.setStorageSync("checked",true);
    }
    
  },
  pwdInput: function (e) {
    var value = e.detail.value;
    this.setData({
      pwd: value
    })
  },
  userNameInput: function (e) {
    var value = e.detail.value;
    this.setData({
      userName: value
    })
  },
  loginIn:function(){
    if (!this.data.userName || !this.data.pwd) {
      util.toast('请输入账号和密码！');
      return;
    }
    if(this.data.checked){
      wx.setStorageSync("username",this.data.userName);
      wx.setStorageSync("password",this.data.pwd);
      wx.setStorageSync("time",new Date().getTime());
    }else{
      // wx.removeStorageSync("username");
      wx.removeStorageSync("passwrod");
      // wx.removeStorageSync("time");
    }
    app.globalData.isLogin = true;
    app.globalData.userInfo = {userName:this.data.userName,pwd:this.data.pwd}
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
})

