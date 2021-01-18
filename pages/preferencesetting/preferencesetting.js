// pages/preferencesetting/preferencesetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'108.94138670654297',//经度
    latitude:'34.27083981508979',//纬度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  mapclick: function() {
    var that = this;
    console.log("地图点击");
    wx.chooseLocation({
      success: function(res) {
        console.log("地图点击事件：" + JSON.stringify(res));
        var user_longitude = res.longitude;
        var user_latitude = res.latitude;
        var user_address = res.address;
        var nowAddress = {};
        nowAddress["name"] = res.name;
        nowAddress["desc"] = res.address;
        that.setData({
          latitude: user_latitude,
          longitude: user_longitude,
          // addressName: user_address,
          // textData: nowAddress,
        });
        //移动marker
        // that.mapCtx.moveToLocation();
      },
      fail: function(res) {  
        console.log("点击地图fail:" + JSON.stringify(res));     
      },
           complete: function(res) {        // complete
        console.log("点击地图complete:" + JSON.stringify(res));         
      }
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