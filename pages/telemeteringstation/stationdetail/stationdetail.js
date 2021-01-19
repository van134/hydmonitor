// pages/telemeteringstation/stationdetail/stationdetail.js
var wxCharts = require('../../../utils/wxcharts.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subStationList: ['分站1', '分站2', '分站3', '分站4'],
    subStationIndex:0,
    lineTypeList: ['水质PH', '水温', '湿度'],
    lineTypeIndex:0,
    startDate:'2021-01-08',
    endDate:'2021-01-09',
    windowWidth: app.globalData.windowWidth,
    stripe: true,
    border: true,
    outBorder: true,
    tableHeader:[ {
      prop: 'time',
      width: 300,
      label: '时间',
      color: '#55C355'
    },
    {
      prop: 'value',
      width: 300,
      label: '数据'
    }],
    data:[],
  },
  bindStationPickerChange: function(e) {
    this.setData({
      subStationIndex: e.detail.value
    })
  },
  bindLineTypePickerChange:function(e){
    this.setData({
      lineTypeIndex: e.detail.value
    })
  },
  bindStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  searchClick:function(){
    let data = [{
      time:'12',
      value:'1.5'
    },{
      time:'13',
      value:'15'
    },{
      time:'14',
      value:'5'
    },{
      time:'15',
      value:'25'
    }];
    this.setData({
      data:data
    });
    let cate = [];
    let value = [];
    for(let i = 0;i<data.length;i++){
      let item = data[i];
      cate.push(item.time);
      value.push(item.value);
    }
    new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories:  cate,//['1', '2', '3', '4', '5', '6' ,'7' ,'8' ,'9' ,'10'],
      animation: true,
      background: '#f5f5f5',
      legend:false,
      series: [{
          name: '成交量1',
          data: value,//[21, 0, 0, 3, 11, 4, 0, 0, 2, 0],
          format: function (val, name) {
              return val.toFixed(2) + '万';
          }
      }, 
      // {
      //     name: '成交量2',
      //     data: [2, 0, 0, 3, 12, 4, 0, 0, 2, 0],
      //     format: function (val, name) {
      //         return val.toFixed(2) + '万';
      //     }
      // }
    ],
      xAxis: {
          disableGrid: true
      },
      yAxis: {
          title: '监测量',
          format: function (val) {
              return val.toFixed(2);
          },
          min: 0
      },
      width:this.data.windowWidth-40,
      height: 280,
      dataLabel: false,
      dataPointShape: true,
      extra: {
          lineStyle: 'curve'
      }
   });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.stringify(options));
    wx.setNavigationBarTitle({
      title: options.title
    })
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