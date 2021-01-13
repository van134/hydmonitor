import { httpGet, httpPost, uploadFile } from "./http.js";

var MyUtils = (function () {
  return {
    typeUtil: {
      typeOf: function (v) {
        return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
      },
      isString: function (v) {
        return typeof v === 'string';
      },

      isNumber: function (v) {
        return typeof v === 'number';
      },

      isBoolean: function (v) {
        return typeof v === 'boolean';
      },

      isFunction: function (v) {
        return typeof v === 'function';
      },

      isUndefined: function (v) {
        return typeof v === 'undefined';
      },

      isNull: function (v) {
        return v === null;
      },

      isArray: function (v) {
        return Array.isArray ? Array.isArray(v) : typeOf(v) === 'array';
      },

      isObject: function (v) {
        return MyUtils.typeUtil.typeOf(v) === 'object';
      },

      isRegExp: function (v) {
        return MyUtils.typeUtil.typeOf(v) === 'regexp';
      },

      isDate: function (v) {
        return MyUtils.typeUtil.typeOf(v) === 'date';
      },

      isValue: function (v) {
        let t = MyUtils.typeUtil.typeOf(v);

        switch (t) {
          case 'number':
            return MyUtils.typeUtil.isFinite(v);
          case 'null':
          case 'undefined':
            return false;
          default:
            return !!t;
        }
      },
      objectEach: function (obj, callback, ignoreUndefined) {
        if (!obj || !callback) {
          return;
        }
        let ret = false;

        for (let k in obj) {
          if (obj.hasOwnProperty(k) && !(ignoreUndefined && this.isUndefined(obj[k]))) {
            ret = callback(obj[k], k);
            if (ret) break;
          }
        }
      },
      tryParse: function (v, each) {
        if (each && MyUtils.typeUtil.isObject(v)) {
          let r = {};
          MyUtils.typeUtil.objectEach(v, function (ov, k) {
            r[k] = MyUtils.typeUtil.tryParse(ov);
          });
          return r;
        } else {
          let r = v;
          if (v && MyUtils.typeUtil.isString(v)) {
            if (/^[\{\[].*/.test(v) || v === 'null' || v === 'undefined' || v === 'true' || v === 'false') {
              try {
                r = v ? JSON.parse(v) : v;
              } catch (err) {
                r = v;
              }
            }
          }
          return r;
        }
      }
    }
  }
})();
var MyUtil = (function () {
  function log(...args) {
    console.log('[WX MyUtil LOG]', args);
  }
  function ready(callback) {
    callback();
  }
  function call(...args) {
    ready(function () {
      // log('[CALL]', args);
    });
  }

  function handleCallback({ data, callback }) {
    // log('[HANDLE]', data);
    if (data && MyUtils.typeUtil.isString(data)) {
      try {
        data = JSON.parse(data); AlipayJSBridge
      } catch (err) {
        // data = res;
        console.log('HANDLE PARSE JSON ERR', err);
      }
    }
    if (data && MyUtils.typeUtil.isObject(data)) {
      data = MyUtils.typeUtil.tryParse(data, true);
    }
    callback(data);
  }
  return {
    uploadFile: function ({
      url, formData = {}, fileName, filePath, callback = () => { }
    }) {
      uploadFile(url, formData, fileName, filePath, function (data) {
        callback({ data: data });
      }, function (err) {
        if (err) {
          callback({ error: '1000', errorMessage: err })
        } else {
          callback({ error: '1000', errorMessage: '请求失败' })
        }
      });
    },
		/**
		 * http请求
		 * @param url 请求地址
		 * @param method GET/POST
		 * @param param 参数
		 * @param callback 回调函数,返回结果
		 */
    httpRequest: function ({ url = '', method = '', param = {}, callback = () => { }, force = false }) {
      log('httpRequest', url, method, param, callback);
      method = method.toUpperCase();
      if ('GET' == method) {
        httpGet(url, {}, function (data) {
          callback({ data: data });
        }, function (err) {
          console.log("HTTPREQUEST GET FAIL", err);
          if (err) {
            callback({ error: '1000', errorMessage: err })
          } else {
            callback({ error: '1000', errorMessage: '网络请求异常' })
          }
        }, force);
      } else if ('POST' == method) {
        httpPost(url, param, (data) => {
          callback({ data: data });
        }, (err) => {
          if (err) {
            console.log("HTTPREQUEST POST FAIL", err);
            callback({ error: '1000', errorMessage: err })
          } else {
            callback({ error: '1000', errorMessage: '网络请求异常' })
          }
        },force);
      } else {
        callback({ error: '1000', errorMessage: '网络请求调用错误' });
      }
    }

  };
})();

(function () {
	/**
	 * 应用全局初始化的地方
	 */
  function init() { }
  init();
})();

// export default MyUtil;
module.exports = {
  MyUtil: MyUtil
}
