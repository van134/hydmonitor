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
    let that = this;
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
    // setTimeout(function(){
    //   that.setData({
    //     isShow:true
    //   });
    // },1000);
    new wxCharts({
      animation: false, //是否有动画
      canvasId: 'state',
      type: 'ring',
      series: [{
          name: '异常站点 2',
          data: 2,
          color:'gray'
      },{
        name: '正常站点 12',
        data: 12,
        color:'#5956ef'
    }],
    title: {
      name: '2',
      color: '#f47807',
      
    },
    subtitle: {
      name: '异常站点',
      color: '#000000',
    },
      width: this.data.windowWidth-20,
      height: 200,
      dataLabel: false,
      legend:false,
   });


   new wxCharts({
    animation: true, //是否有动画
    canvasId: 'realtime',
    type: 'column',
    extra:{column:{width:40}},
    categories: ['实时数据'],
    series: [{
        name: '温度',
        data: [15],
    },{
      name: '水温',
      data: [20],
  },{
    name: '风力',
    data: [ 45],
},{
  name: '精力',
  data: [37],
}],
    yAxis: {
        format: function (val) {
            return val;
        },
        min:0
    },
    width: this.data.windowWidth-20,
    height: 300,
   
    dataLabel: true,
    legend:true,
 });


 
 new wxCharts({
  animation: true, //是否有动画
  canvasId: 'aweek',
  type: 'area',
  extra:{lineStyle:'curve'},
  categories: ['02-08', '02-09', '02-10', '02-11', '02-12', '02-13', '02-14'],
    series: [{
        name: '温度',
        data: [70, 40, 65, 10, 34, 18,11],
        format: function (val) {
            return val+ '℃';
        }
    }, {
        name: '水温',
        data: [15, 20, 45, 37, 4, 80,22],
        format: function (val) {
            return  val+ '℃';
        }
    }, {
      name: '风力',
      data: [35, 27, 15, 7, 14, 10,32],
      format: function (val) {
          return  val+ 'm/s';
      }
  }, {
    name: '精力',
    data: [5, 23, 15, 17, 40, 20,27],
    format: function (val) {
        return  val;
    }
}],

  yAxis: {
      format: function (val) {
          return val;
      },
      min:0
  },
  width: this.data.windowWidth-20,
  height: 300,
  dataLabel: false,
  legend:true,
});




new wxCharts({
  animation: true, //是否有动画
  canvasId: 'shuiwei',
  type: 'column',
  extra:{column:{width:40}},
  categories: ['水位遥测站'],
  series: [{
      name: '埋深',
      data: [20],
  },{
    name: '湿度',
    data: [10],
},{
  name: '气温',
  data: [15],
},{
  name: '电压',
  data: [20],
},{
  name: '水位标高',
  data: [5],
},{
  name: '埋深变化',
  data: [1],
}],
  yAxis: {
      format: function (val) {
          return val;
      },
      min:0
  },
  width: this.data.windowWidth-20,
  height: 300,
 
  dataLabel: true,
  legend:true,
});



new wxCharts({
  animation: true, //是否有动画
  canvasId: 'yuliang',
  type: 'column',
  extra:{column:{width:40}},
  categories: ['雨量遥测站'],
  series: [{
      name: '埋深',
      data: [20],
  },{
    name: '湿度',
    data: [10],
},{
  name: '气温',
  data: [15],
},{
  name: '电压',
  data: [20],
},{
  name: '水位标高',
  data: [5],
},{
  name: '埋深变化',
  data: [1],
}],
  yAxis: {
      format: function (val) {
          return val;
      },
      min:0
  },
  width: this.data.windowWidth-20,
  height: 300,
 
  dataLabel: true,
  legend:true,
});


new wxCharts({
  animation: true, //是否有动画
  canvasId: 'shuizhi',
  type: 'column',
  extra:{column:{width:40}},
  categories: ['水质遥测站'],
  series: [{
      name: '埋深',
      data: [20],
  },{
    name: '湿度',
    data: [10],
},{
  name: '气温',
  data: [15],
},{
  name: '电压',
  data: [20],
},{
  name: '水位标高',
  data: [5],
},{
  name: '埋深变化',
  data: [1],
}],
  yAxis: {
      format: function (val) {
          return val;
      },
      min:0
  },
  width: this.data.windowWidth-20,
  height: 300,
 
  dataLabel: true,
  legend:true,
});


new wxCharts({
  animation: true, //是否有动画
  canvasId: 'liuliang',
  type: 'column',
  extra:{column:{width:40}},
  categories: ['水质遥测站'],
  series: [{
      name: '埋深',
      data: [20],
  },{
    name: '湿度',
    data: [10],
},{
  name: '气温',
  data: [15],
},{
  name: '电压',
  data: [20],
},{
  name: '水位标高',
  data: [5],
},{
  name: '埋深变化',
  data: [1],
}],
  yAxis: {
      format: function (val) {
          return val;
      },
      min:0
  },
  width: this.data.windowWidth-20,
  height: 300,
 
  dataLabel: true,
  legend:true,
});
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