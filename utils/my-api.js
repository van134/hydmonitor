// const app = getApp()
import {
	MyUtil
} from "./common.js";
var MyApi = (function () {
	// var host = getApp()?getApp().globalData.host:'https://hllyy.top';

	console.log("getApp()==>"+getApp());
	var host = 'http://210.13.81.69:6702';
	var modules = {
		frontEnd: '/zgjyz/json'
	};
	var myUrl = {
		// 提交code
		regCode: modules.frontEnd + '/sso/auth',
		// 提交用户信息
		userInfo: modules.frontEnd + '/sso/userinfo',


		// 井下实时数据
		realTimeData: modules.frontEnd + '/test',
		// 井下历史数据
		historyData: modules.frontEnd + '/sjtest',
		// 分站数据
		stationsData: modules.frontEnd + '/sjstationtest',
		// 传感器数据
		sensorData: modules.frontEnd + '/sjsensortest',
	

		// 用户订单取消，请求后，后端需修改订单状态为已取消，并记录到状态日志，
		cancelOrder: modules.frontEnd + '/order/cancelOrder',

		// 服务完成
		orderUpdateStatus: modules.frontEnd + '/order/orderUpdateStatus',
		// 增开发票
		orderInvoice: modules.frontEnd + '/order/orderInvoice',
		// ****************发票接口******************************
		// 列表查询
		getAllBills: modules.frontEnd + '/order/getAllBills',
		// 根据ID查询
		getOrderBill: modules.frontEnd + '/order/getOrderBill',
		// 增加发票
		orderBill: modules.frontEnd + '/order/orderBill',
		// 修改发票
		updateOrderBill: modules.frontEnd + '/order/updateOrderBill',
		// 删除发票
		deleteOrderBill: modules.frontEnd + '/order/deleteOrderBill'
	};
	return {
		getHost:function(path){
			return (getApp()?getApp().globalData.host:'http://210.13.81.69:6702')+path;
		},
		regCode: function({ 
			code = '', 
			success = () => {}, 
			error = () => {} }) {
			MyUtil.httpRequest({
				url: '' + this.getHost(myUrl.regCode)+'?code='+code+"&from=wx",
				// url: '' + myUrl.regCode+'?code='+code+"&from=wx",
				method: 'GET',
				param: {
					// code: code
				},
				callback: function callback(result) {
					if (result.error) {
						error(result.errorMessage);
					} else {
						if (result.data.code == 200) {
							success(result.data.data);
						} else {
							error(result.data.message);
						}
					}
				}
			});
		},
		userInfo: function ({ 
			encryptedData,
			iv,
			success = () => { }, 
			error = () => { } 
		}) {
			MyUtil.httpRequest({
				url: '' + myUrl.userInfo,
				method: 'POST',
				param: {
					encryptedData: encryptedData,
					iv:iv
				},
				callback: function callback(result) {
					if (result.error) {
						error(result.errorMessage);
					} else {
						if (result.data.code == 200) {
							success(result.data);
						} else {
							error(result.data.message);
						}
					}
				}
			});
		},
		
		realTimeData: function ({ 
			success = () => { }, 
			error = () => { } 
		}) {
			MyUtil.httpRequest({
				url: '' +  this.getHost(myUrl.realTimeData) ,
				method: 'POST',
				param: {
				},
				callback: function callback(result) {
					if (result.error) {
						error(result.errorMessage);
					} else {
						// if (result.data.code == 200) {
							success(result.data);
						// } else {
						// 	error(result.data.message);
						// }
					}
				}
			});
		},
		historyData: function ({ 
			stationId,
			startdate,
			enddate,
			type,
			success = () => { }, 
			error = () => { } 
		}) {
			MyUtil.httpRequest({
				url: '' + this.getHost(myUrl.historyData) ,
				method: 'POST',
				param: {
					stationId: stationId,
					startdate: startdate,
					enddate: enddate,
					type: type
				},
				callback: function callback(result) {
					if (result.error) {
						error(result.errorMessage);
					} else {
						// if (result.data.code == 200) {
							success(result.data);
						// } else {
						// 	error(result.data.message);
						// }
					}
				}
			});
		},
		stationsData: function ({ 
			success = () => { }, 
			error = () => { } 
		}) {
			MyUtil.httpRequest({
				url: '' + this.getHost(myUrl.stationsData),
				method: 'POST',
				param: {
				},
				callback: function callback(result) {
					if (result.error) {
						error(result.errorMessage);
					} else {
						// if (result.data.code == 0) {
							success(result.data);
						// } else {
						// 	error(result.data.message);
						// }
					}
				}
			});
		},
		sensorData: function ({ 
			success = () => { }, 
			error = () => { } 
		}) {
			ZgtlMpaasUtil.httpRequest({
				url: '' + this.getHost(myUrl.sensorData),
				method: 'POST',
				param: {
				},
				callback: function callback(result) {
					if (result.error) {
						error(result.errorMessage);
					} else {
						if (result.data.code == 0) {
							success(result.data.data);
						} else {
							error(result.data.message);
						}
					}
				}
			});
		},
	}
})();

module.exports = {
	MyApi: MyApi
}
