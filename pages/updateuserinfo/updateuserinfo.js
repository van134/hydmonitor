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
    name: '',
    email: '',
    phone: '',
    loadingHidden:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
 nameInput: function (e) {
    var value = e.detail.value;
    this.setData({
      name: value
    })
  },
  emailInput: function (e) {
    var value = e.detail.value;
    this.setData({
      email: value
    })
  },
  phoneInput: function (e) {
    var value = e.detail.value;
    this.setData({
      phone: value
    })
  },
  updateClick:function(){
    if (this.data.name.length == 0) {
      util.toast('姓名不能为空');
      return;
    }
    if (this.data.email.length == 0) {
      util.toast('邮箱不能为空');
      return;
    }
    /*第一步：验证手机号码*/
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; // 判断手机号码的正则
    if (this.data.phone.length == 0) {
      util.toast('手机号码不能为空');
      return;
    }
    if (this.data.phone.length < 11) {
      util.toast('手机号码长度有误！');
      return;
    }
    if (!myreg.test(this.data.phone)) {
      util.toast('错误的手机号码！');
      return;
    }
  },
})

