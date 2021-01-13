// pages/home/home.js
import { MyApi } from "../../utils/my-api.js";
var wxCharts = require('../../utils/wxcharts.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id:"chart1",
      title: "水位遥测站",
      type:'pie',
      data:[]
    }, {
      id:"chart2",
      title: "井下监测点",
      type:'pie',
      data:[]
    }, {
      id:"chart3",
      title: "雨量遥测站",
      type:'pie',
      data:[]
    }, {
      id:"chart4",
      title: "水质遥测站",
      type:'ring',
      data:[]
    },{
      id:"chart5",
      title: "流量遥测站",
      type:'ring',
      data:[]
    }],
    windowWidth: app.globalData.windowWidth
  },
  jumpLogin(){
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
  changeData:function(){
    new wxCharts({
      animation: true, //是否有动画
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
          name: '数据1',
          data: 15,
      }, { 
          name: '数据2',
          data: 35,
      }, {
          name: '数据3',
          data: 78,
      }],
      width: this.data.windowWidth-20,
      height: 300,
      dataLabel: true,
   });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for(let i = 0;i<this.data.list.length;i++){
      let item = this.data.list[i];
      new wxCharts({
        animation: true, //是否有动画
        canvasId: item.id,
        type: item.type,
        series: [{
            name: '数据1',
            data: 151,
        }, {
            name: '数据2',
            data: 351,
        }, {
            name: '数据3',
            data: 781,
        }],
        width: this.data.windowWidth-20,
        height: 300,
        dataLabel: true,
     });
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.Dialog = this.selectComponent("#modal");
    // this.selectComponent("#mDialog").showModal();
    // this.selectComponent("#mDialog").hideModal();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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