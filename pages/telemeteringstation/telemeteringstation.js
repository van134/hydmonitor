//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    list: [{
      title: "水位遥测站",
      data:[]
    }, {
      title: "井下监测点",
      data:[]
    }, {
      title: "雨量遥测站",
      data:[]
    }, {
      title: "水质遥测站",
      data:[]
    },{
      title: "流量遥测站",
      data:[]
    }],
  },
  itemClick:function(e){
    console.log(JSON.stringify(e.currentTarget.dataset.index));
    wx.navigateTo({
      url: './stationdetail/stationdetail',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
