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
    userInfo: {},
    oldpwd: '',
    pwd1:'',
    pwd2:'',
    loadingHidden: true,
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
  oldpwdInput: function (e) {
    var value = e.detail.value;
    this.setData({
      oldpwd: value
    })
  },
  pwd1Input: function (e) {
    var value = e.detail.value;
    this.setData({
      pwd1: value
    })
  },
  pwd2Input: function (e) {
    var value = e.detail.value;
    this.setData({
      pwd2: value
    })
  },
  updateClick:function(){
    if (!this.data.oldpwd) {
      util.toast('请输入旧密码！');
      return;
    }
   
    if (!this.data.pwd1) {
      util.toast('请输入新密码！');
      return;
    }
    if (!this.data.pwd2) {
      util.toast('请确认新密码！');
      return;
    }
    if (this.data.pwd1!=this.data.pwd2) {
      util.toast('两次密码输入不一致！');
      return;
    }
    if(this.data.oldpwd!=app.globalData.userInfo.pwd){
      util.toast('旧密码输入错误！');
      return;
    }

    // wx.reLaunch({
    //     url: '/pages/login/login'
    // });
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
 
    let prevPage = pages[ pages.length - 2 ];  
    
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
    
        isLogout:true, // 这里是修改了上一个页面数据:name
    
    })
    util.toast('密码修改成功，请重新登录!');
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
    },1500);
  },
})

