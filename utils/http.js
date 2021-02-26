import { getSign } from './wx-auth-util.js';
let uploadFile = (url, formData = {}, fileName, filePath, success = () => { }, fail = () => { }, force = false) => {
  let header = getApp().globalData.headerInfo;
  header.wx = getApp().globalData.wx;
  header.accessToken = getApp().globalData.token;
  if (!header.wx && !force) {
    console.log("无有效签名,放弃该请求", url);
    return;
  }
  wx.uploadFile({
    url: url,
    header: header,
    filePath: filePath,
    formData: formData,
    name: fileName,
    success: function (res) {
      if (res.statusCode == 200) {
        try {
          if (res.data && res.data.length > 0) {
            res.data = JSON.parse(res.data);
          }
        } catch (err) {
          fail("upload 解析失败");
          return;
        }
        if (res.data.status == 0) {
          success(res.data);
        } else {
          fail(res.data.message);
        }
      } else if (res.statusCode == 401) {
        wx.removeStorageSync('token');
        wx.removeStorageSync('expireTime');
        wx.removeStorageSync('user');
        getApp().globalData.token = null;
        getApp().globalData.expireTime = null;
        getApp().globalData.user = null;
        fail('无权限访问');
      } else if (res.statusCode == 404) {
        fail('资源未找到');
      } else if (res.statusCode == 500) {
        fail('服务器异常');
      } else {
        fail('Http 异常. [code]: ' + res.statusCode);
      }
    },
    fail: function (err) {
      console.log('HTTP UPLOAD FAIL', err); ``
      fail('网络请求异常');
    }
  });
}

// get请求
let httpGet = (url, data = {}, success = () => { }, fail = () => { }, force = false) => {
  let header = getApp().globalData.headerInfo;
  // header.accessToken = getApp().globalData.token;
  getSign().then(res => {
    header.wx = getApp().globalData.wx;
    // console.log("header==>"+JSON.stringify(header));
    wx.request({
      url: url,
      header: header,
      method: 'GET',
      success: function (res) {
        // console.log("http get ==>"+JSON.stringify(res));
        if (res.statusCode == 200) {
          
          success(res.data);
        } else if (res.statusCode == 401) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('expireTime');
          wx.removeStorageSync('user');
          getApp().globalData.token = null;
          getApp().globalData.expireTime = null;
          getApp().globalData.user = null;
          fail("无权限访问");
        } else if (res.statusCode == 404) {
          fail('资源未找到');
        } else if (res.statusCode == 500) {
          fail('服务器异常');
        } else {
          fail('Http 异常. [code]: ' + res.statusCode);
        }
      },
      fail: function (err) {
        console.log('HTTP GET FAIL', err);
        fail('网络请求异常');
      }
    });
  }).catch(err => {
    if (!force) {
      console.log("无有效签名,放弃该请求", url);
      return;
    } else {
      wx.request({
        url: url,
        header: header,
        method: 'GET',
        success: function (res) {
          if (res.statusCode == 200) {
            success(res.data);
          } else if (res.statusCode == 401) {
            wx.removeStorageSync('token');
            wx.removeStorageSync('expireTime');
            wx.removeStorageSync('user');
            getApp().globalData.token = null;
            getApp().globalData.expireTime = null;
            getApp().globalData.user = null;
            fail("无权限访问");
          } else if (res.statusCode == 404) {
            fail('资源未找到');
          } else if (res.statusCode == 500) {
            fail('服务器异常');
          } else {
            fail('Http 异常. [code]: ' + res.statusCode);
          }
        },
        fail: function (err) {
          console.log('HTTP GET FAIL', err);
          fail('网络请求异常');
        }
      });
    }
  });
}

let httpPost = (url, data, success, fail, force = false) => {
  let header = getApp().globalData.headerInfo;
  // header.Authorization = getApp().globalData.token;
  header['Content-Type'] = 'application/json';
  // header['Content-Type'] = 'application/x-www-form-urlencoded';
  console.log("data==>"+JSON.stringify(data));
  getSign().then(res => {
    // header.wx = getApp().globalData.wx;
    wx.request({
      url: url,
      header: header,
      data: data,
      method: 'POST',
      success: function (res) {
        // console.log("http post ==>"+JSON.stringify(res));
        if (res.statusCode == 200) {
          success(res.data);
        } else if (res.statusCode == 401) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('expireTime');
          wx.removeStorageSync('user');
          getApp().globalData.token = null;
          getApp().globalData.expireTime = null;
          getApp().globalData.user = null;
          fail('无权限访问');
        } else if (res.statusCode == 404) {
          fail('资源未找到');
        } else if (res.statusCode == 500) {
          fail('服务器异常');
        } else {
          fail('Http 异常. [code]: ' + res.statusCode);
        }
      },
      fail: function (err) {
        console.log('HTTP POST FAIL', err);
        fail('网络请求异常');
      }
    });
  }).catch(err => {
    if (!force) {
      console.log("无有效签名,放弃该请求", url);
      return;
    } else {
      wx.request({
        url: url,
        header: header,
        data: data,
        method: 'POST',
        success: function (res) {
          if (res.statusCode == 200) {
            success(res.data);
          } else if (res.statusCode == 401) {
            wx.removeStorageSync('token');
            wx.removeStorageSync('expireTime');
            wx.removeStorageSync('user');
            getApp().globalData.token = null;
            getApp().globalData.expireTime = null;
            getApp().globalData.user = null;
            fail('无权限访问');
          } else if (res.statusCode == 404) {
            fail('资源未找到');
          } else if (res.statusCode == 500) {
            fail('服务器异常');
          } else {
            fail('Http 异常. [code]: ' + res.statusCode);
          }
        },
        fail: function (err) {
          console.log('HTTP POST FAIL', err);
          fail('网络请求异常');
        }
      });
    }
  });


}
module.exports = {
  httpGet: httpGet,
  httpPost: httpPost,
  uploadFile: uploadFile
}