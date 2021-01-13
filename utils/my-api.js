import {
	MyUtil
} from "./common.js";

var MyApi = (function () {
	var host = 'https://hllyy.top';
	var modules = {
		frontEnd: host + '/portal'
	};
	var myUrl = {
		// 提交code
		regCode: modules.frontEnd + '/sso/auth',
		// 提交用户信息
		userInfo: modules.frontEnd + '/sso/userinfo',
		// 报修
		repairReport: modules.frontEnd + '/touble/put',
		// 获取租借列表
		getRentList: modules.frontEnd + '/order/listOrder',
		// 订单支付前置，需调用收银台
		orderPayData: modules.frontEnd + '/order/orderPayData',
		// 查询订单支付详情
		orderPayInvoice: modules.frontEnd + '/order/orderPayInvoice',
		// 查询订单支付结果
		orderPayResult: modules.frontEnd + '/order/orderPayResult',


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
		regCode: function({ 
			code = '', 
			success = () => {}, 
			error = () => {} }) {
			MyUtil.httpRequest({
				url: '' + myUrl.regCode+'?code='+code+"&from=wx",
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
		
		repairReport: function ({ 
			deviceId,
			status,
			comments,
			success = () => { }, 
			error = () => { } 
		}) {
			MyUtil.httpRequest({
				url: '' + myUrl.repairReport,
				method: 'POST',
				param: {
					deviceId: deviceId,
					status: status,
					comments: comments
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
		getRentList: function ({ 
			id,
			success = () => { }, 
			error = () => { } 
		}) {
			MyUtil.httpRequest({
				url: '' + myUrl.getRentList,
				method: 'GET',
				param: {
					id: id
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
		orderPayData: function ({ 
			id,
			payChannel,
			code,
			success = () => { }, 
			error = () => { } 
		}) {
			MyUtil.httpRequest({
				url: '' + myUrl.orderPayData,
				method: 'POST',
				param: {
					id: id,
					payChannel: payChannel,
				  code:code
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
		orderPayResult: function ({ 
			id,
			success = () => { }, 
			error = () => { } 
		}) {
			ZgtlMpaasUtil.httpRequest({
				url: '' + myUrl.orderPayResult,
				method: 'POST',
				param: {
					id: id
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
