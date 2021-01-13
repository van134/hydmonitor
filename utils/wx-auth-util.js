
var checkToken = function () {
  console.log("准备检查token有效性");
  // let that = this;
  return new Promise((resolve, reject) => {
    let url = 'https://wifi.12306.cn/wifiapps/appFrontEnd/v2/user/getUserInfo';
    let header = getApp().globalData.headerInfo;
    header.accessToken = getApp().globalData.token;
    getSign().then(res => {
      header.wx = getApp().globalData.wx;
      wx.request({
        url: url,
        header: header,
        method: 'GET',
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.status == 0) {
              console.log("TOKEN 检查有效", res.data);
              resolve(res.data.data);
            } else {
              reject(res.data.message);
            }
          } else if (res.statusCode == 401) {
            wx.removeStorageSync('token');
            wx.removeStorageSync('expireTime');
            wx.removeStorageSync('user');
            getApp().globalData.token = null;
            getApp().globalData.expireTime = null;
            getApp().globalData.user = null;
            reject('未授权访问');
          } else if (res.statusCode == 404) {
            reject('资源未找到');
          } else if (res.statusCode == 500) {
            reject('服务器异常');
          } else {
            reject('Http 异常. [code]: ' + res.statusCode);
          }
        },
        fail: function (err) {
          console.log('HTTP GET FAIL', err);
          reject('网络请求异常');
        }
      })
    }).catch(err => {
      reject('签名失败');
    });
  });
  // ZgtlUserApi.getUserInfo({
  //   success: res => {
  //     resolve(res);
  //   },
  //   error: err => {
  //     reject();
  //   }
  // });
  // });
}
var refreshToken = function () {
  console.log("刷新token");
  let that = this;
  return new Promise((resolve, reject) => {
    let url = 'https://wifi.12306.cn/wifiapps/authApi/refreshToken'
    let header = getApp().globalData.headerInfo;
    header['Content-Type'] = 'application/x-www-form-urlencoded';
    header.accessToken = getApp().globalData.token;
    getSign().then(res => {
      header.wx = getApp().globalData.wx;
      wx.request({
        url: url,
        header: header,
        data: {
          token: getApp().globalData.token
        },
        method: 'POST',
        success: function (res) {
          if (res.statusCode == 200) {
            console.log("token刷新成功", res.data);
            if (res.data.status == 0) {
              getApp().globalData.token = res.data.data.token;
              getApp().globalData.expireTime = parseInt(res.data.data.expireAt + '');
              wx.setStorageSync('token', res.data.data.token);
              wx.setStorageSync('expireTime', res.data.data.expireAt);
              resolve(res.data.data);
            } else {
              reject('调用失败,' + res.data.message);
            }
          } else if (res.statusCode == 401) {
            wx.removeStorageSync('token');
            wx.removeStorageSync('expireTime');
            wx.removeStorageSync('user');
            getApp().globalData.token = null;
            getApp().globalData.expireTime = null;
            getApp().globalData.user = null;
            reject('无权限访问');
          } else if (res.statusCode == 404) {
            reject('资源未找到');
          } else if (res.statusCode == 500) {
            reject('服务器异常');
          } else {
            reject('Http 异常. [code]: ' + res.statusCode);
          }
        },
        fail: function (err) {
          console.log('HTTP POST FAIL', err);
          reject('网络请求异常');
        }
      });
    }).catch(err => {
      reject('签名失败');
    });
  });
  // return new Promise((resolve, reject) => {
  //   ZgtlUserApi.refreshToken({
  //     token: getApp().globalData.token,
  //     success: res => {
  //       console.log("token刷新成功", res);
  //       getApp().globalData.token = res.token;
  //       getApp().globalData.expireTime = parseInt(res.expireAt + '');
  //       wx.setStorageSync('token', res.token);
  //       wx.setStorageSync('expireTime', res.expireAt);
  //       resolve(res);
  //     },
  //     error: err => {
  //       reject();
  //     }
  //   });
  // });
}

/**
  * app启动时获取加密值
  * 执行wx.login, 保证获取用户电话前微信为登录状态
  */
var getSign = function (force = false) {
  return new Promise((resolve, reject) => {
    resolve();
  })
  // console.log("WXAUTH getSign", force);
  // let that = this;
  // if (!force && getApp().globalData.wx) {
  //   return new Promise((resolve, reject) => {
  //     resolve();
  //   });
  // }
  // return new Promise((resolve, reject) => {
  //   wx.login({
  //     success: (res) => {
  //       wx.setStorageSync('wxLoginCode', res.code);
  //       getApp().globalData.wxLoginCode = res.code;
  //       const data = {
  //         regChannel: 11,
  //         code: res.code
  //       };
  //       wx.request({
  //         method: "POST",
  //         header: {
  //           "Content-Type": "application/x-www-form-urlencoded"
  //         },
  //         url: 'https://wifi.12306.cn/wifiapps/authApi/wxSign',
  //         data: data,
  //         success: (res) => {
  //           if (res.statusCode == 200) {
  //             if (res.data.status == 0 && res.data.data) {
  //               wx.setStorageSync('wx', res.data.data);
  //               getApp().globalData.wx = res.data.data;
  //               resolve();
  //             } else {
  //               reject();
  //             }
  //           } else {
  //             reject();
  //           }
  //         },
  //         error: (err) => {
  //           reject();
  //         }
  //       });
  //     }
  //   });
  // });
}

var handle401 = function () {
  wx.removeStorageSync('token');
  wx.removeStorageSync('expireTime');
  wx.removeStorageSync('user');
  getApp().globalData.token = null;
  getApp().globalData.user = {};
  getApp().globalData.expireTime = null;
}

var loginState = function () {
  return new Promise((resolve, reject) => {
    let userInfo = getApp().globalData.user;
    if (userInfo && userInfo.logType && userInfo.logType == 'R-W') {
      resolve(userInfo);
    } else {
      if (userInfo && userInfo.logType) {
        reject({ type: 'logType', value: userInfo });
      } else {
        reject({ type: 'none' });
      }
    }
  });
}

var getWxLoginCode = function () {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: res => {
        console.log("session未过期");
        if (getApp().globalData.code) {
          resolve(getApp().globalData.code);
        } else {
          console.log("session有效但code丢失");
          wx.login({
            success: res => {
              if (res.code) {
                wx.setStorageSync('wxLoginCode', res.code);
                getApp().globalData.code = res.code;
                resolve(res.code);
              } else {
                reject('无法获取有效code');
              }
            }
          });
        }
      },
      fail: err => {
        console.log("session过期,重新login");
        wx.login({
          success: res => {
            if (res.code) {
              wx.setStorageSync('wxLoginCode', res.code);
              getApp().globalData.code = res.code;
              resolve(res.code);
            } else {
              reject('无法获取有效code');
            }
          }
        });
      }
    })
  });
}

var grantUser = function (e) {
  console.log("WXAUTH grantUser", e.detail);
  return new Promise((resolve, reject) => {
    if (e.detail.errMsg != "getUserInfo:ok") {
      reject({ type: 'message', value: '请授权小程序获取用户信息' });
    } else {
      console.log("得到微信 getUserInfo", e);
      loginState().then(res => {
        console.log("已经是登录状态,继续流程", res);
        resolve({ user: res });
      }).catch(err => {

        getWxLoginCode().then(code => {
          let iv = e.detail.iv;
          let encryptedData = e.detail.encryptedData;
          console.log("准备认证", code, iv, encryptedData);
          let params = {
            loginName: code,
            password: encryptedData,
            verifyCode: iv,
            type: "W",
            logType: 'TL-WC',
            regChannel: 11,
            returnUser: true,
          };
          let url = getApp().globalData.url+'portal/sso'
          let header = getApp().globalData.headerInfo;
          header['Content-Type'] = 'application/x-www-form-urlencoded';
          header.accessToken = getApp().globalData.token;
          getSign().then(res => {
            header.wx = getApp().globalData.wx;
            wx.request({
              url: url,
              header: header,
              data: params,
              method: 'POST',
              success: function (res) {
                console.log("GRANTUSER login", res);
                if (res.statusCode == 200) {
                  if (res.data.status == 0) {
                    // success(result.data.data);
                    console.log("WXAUTH grantUser 返回用户数据", res.data.data);
                    if (res.data.data && res.data.data.user && res.data.data.user.logType) {
                      if ('R-W' != res.data.data.user.logType) {
                        wx.setStorageSync('user', res.data.data.user);
                        wx.setStorageSync('token', res.data.data.token);
                        wx.setStorageSync('expireTime', res.data.data.expireAt);
                        getApp().globalData.user = res.data.data.user;
                        getApp().globalData.token = res.data.data.token;
                        getApp().globalData.expireTime = parseInt(res.data.data.expireAt + '');
                        reject({ type: 'logType', value: res.data.data.user });
                      } else {
                        wx.setStorageSync('user', res.data.data.user);
                        wx.setStorageSync('token', res.data.data.token);
                        wx.setStorageSync('expireTime', res.data.data.expireAt);
                        getApp().globalData.user = res.data.data.user;
                        getApp().globalData.token = res.data.data.token;
                        getApp().globalData.expireTime = parseInt(res.data.data.expireAt + '');
                        resolve(res.data.data);
                      }
                    } else {
                      reject({ type: 'message', value: '暂无有效用户信息' });
                    }
                  } else {
                    reject({ type: 'message', value: res.data.message });
                  }
                } else if (res.statusCode == 401) {
                  wx.removeStorageSync('token');
                  wx.removeStorageSync('expireTime');
                  wx.removeStorageSync('user');
                  getApp().globalData.token = null;
                  getApp().globalData.expireTime = null;
                  getApp().globalData.user = null;
                  reject({ type: 'message', value: '无访问权限' });
                } else if (res.statusCode == 404) {
                  reject({ type: 'message', value: '资源未找到' });
                } else if (res.statusCode == 500) {
                  reject({ type: 'message', value: '服务器异常,请重试' });
                } else {
                  reject({ type: 'message', value: 'Http 异常. [code]: ' + res.statusCode });
                }
              },
              fail: function (err) {
                console.log('HTTP POST FAIL', err);
                reject({ type: 'message', value: '网络请求异常' });
              }
            });
          }).catch(err => {
            reject({ type: 'message', value: '签名失败' });
          });
        }).catch(err => { 
          reject({ type: 'message', value: '微信认证失败' });
        });


        // ZgtlMpaasUtil.httpRequest({
        //   url: 'https://wifi.12306.cn/wifiapps/authApi/login',
        //   method: 'POST',
        //   param: params,
        //   callback: result => {
        //     if (result.error) {
        //       reject({ type: 'message', value: result.errorMessage });
        //     } else {
        //       if (result.data.status == 0) {
        //         // success(result.data.data);
        //         console.log("WXAUTH grantUser 返回用户数据", result.data.data);
        //         if (result.data.data && result.data.data.user && result.data.data.user.logType) {
        //           if ('R-W' != result.data.data.user.logType) {
        //             wx.setStorageSync('user', result.data.data.user);
        //             wx.setStorageSync('token', result.data.data.token);
        //             wx.setStorageSync('expireTime', result.data.data.expireAt);
        //             getApp().globalData.user = result.data.data.user;
        //             getApp().globalData.token = result.data.data.token;
        //             getApp().globalData.expireTime = parseInt(result.data.data.expireAt + '');
        //             reject({ type: 'logType', value: result.data.data.user });
        //           } else {
        //             wx.setStorageSync('user', result.data.data.user);
        //             wx.setStorageSync('token', result.data.data.token);
        //             wx.setStorageSync('expireTime', result.data.data.expireAt);
        //             getApp().globalData.user = result.data.data.user;
        //             getApp().globalData.token = result.data.data.token;
        //             getApp().globalData.expireTime = parseInt(result.data.data.expireAt + '');
        //             resolve(result.data.data);
        //           }
        //         } else {
        //           reject({ type: 'message', value: '暂无有效用户信息' });
        //         }
        //       } else {
        //         reject({ type: 'message', value: result.data.message });
        //       }
        //     }
        //   }
        // });
      })
    }
  });
}

module.exports = {
  checkToken,
  refreshToken,
  getSign,
  handle401,
  grantUser,
  loginState,
  getWxLoginCode
}