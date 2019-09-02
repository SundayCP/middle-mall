import CONFIG from './config'
import utils from './utils'
import axios from 'axios'
import qs from 'qs'

/**
 * 上传图片
 * @param {func} callback 回调函数
 * @param {any}  otps 参数对象
 */

export function uploadFile(formData) {
  return axios
  .post(CONFIG.API.UPLOAD_FILE, formData)
  .then(res => {
  	if (res.data.code && res.data.code == "00") {	
	    return res.data.result ? res.data.result : ''
  	}
  })
}

/**
 * 获得订单列表
 * @param {func} callback 回调函数
 * @param {any}  otps 参数对象
 */

export function getOrderList(opts) {
 return axios.get(CONFIG.API.GET_ORDER_LIST,{
		params: {//pageIndex pageSize
			'type': opts.type,
			'pageIndex': opts.pageIndex,
			'pageSize': 20,

		}
	}).then(res =>{
		// console.log('getOrderList', res)
		if(res.data.code && res.data.code === '00'){
			return res.data;
		}else{
			return {};
		}
	})
}


/*
 * 商品的详情 (shopName)
 */
export function shopInfo(opts){
	return axios.get(CONFIG.API.GET_SHOP_INFO,{
		params: {
			'itemSku': opts.activeId,
			'merchantId': opts.merchantId,
			'code': opts.code
		}
	}).then(res =>{
		console.log('shopInfo', res)
		if(res.data.code && res.data.code === '00'){
			return res.data;
		}else{
			return res.data;
		}
	})
}

/*
 * 添加购物车  （shopName）
 */
export function addGoodsCart(opts){
	return axios.get(CONFIG.API.SHOP_CART_ADD,{
		params: {
			'itemSku': opts.itemSku
		}
	}).then(res =>{
		console.log('addGoodsCart',res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return res.data;
		}
	})
	
}


/*
 * 获取购物车列表 （cart）
 */
export function getCartList(opts){
	return axios.get(CONFIG.API.GET_CART_LIST,{
		params: {
			
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data.result;
		}else{
			return {};
		}
	})
	
}

/*
 * 删除购物车物品 （cart）
 */
export function deleteGoods(opts){
	return axios.get(CONFIG.API.DELETE_GOODS,{
		params:{
			'cartId': opts.cartId,
			'cartItemIds': opts.cartItemIds
		}
	}).then(res =>{
		console.log('deleteGoods',res)
		if(res.data.code && res.data.code == '00'){
			return res.data;			
		}else{
			return {};
		}
	})
	
}

/*
 * 购物车数量传输 （cart）
 */
export function sendDataNum(opts){
	return axios.get(CONFIG.API.SEND_DATA_NUM,{
		params:{
			'cartId': opts.cartId,
			'cartItemId': opts.cartItemId,
			'num': opts.num
		}
	}).then(res =>{
		console.log('sendDataNum',res);
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}

/*
 * 确认订单接口 （confirm购物车）
 */

export function confirmOrder(opts){
	if(opts.addrId){
		var sendData = {
			"idStr": opts.idStr,
			'addrId': opts.addrId
		}
	}else{
		var sendData = {
			"idStr": opts.idStr
		}
	}
	console.log(sendData)
	return axios.get(CONFIG.API.CONFIRM_ORDER,{
		params: sendData
	}).then(res =>{
		console.log('confirmOrder',res)
		if(res.data.code && res.data.code == '00'){
			return res.data.result;
		}else{
			return {};
		}
	})
}

/*
 * 确认订单接口 （confirm单品）
 */

export function confirmOrderSinge(opts){
	if(opts.addrId){
		var sendData = {
			"sku": opts.idStr,
			'addrId': opts.addrId
		}
	}else{
		var sendData = {
			"sku": opts.idStr
		}
	}
	console.log(sendData)
	return axios.get(CONFIG.API.CONFIRM_ORDER_SINGE,{
		params: sendData
	}).then(res =>{
		console.log('confirmOrderSinge',res)
		if(res.data.code && res.data.code == '00'){
			return res.data.result;
		}else{
			return {};
		}
	})
}

/*
 * 选择地址接口 （selectAddr）
 */
export function confirmAddr(opts){
	return axios.get(CONFIG.API.SELECT_ORDER,{
		params:{
			'idStr': opts.idStr,
			'addrId': opts.addrId
		}
	}).then(res =>{
		console.log('confirmAddr',res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}



/*
 * 添加地址保存（addAddr）
 */
export function addAddr(opts){
	if(opts.addrId){
		var data = {
			'realname': opts.realname,
	    	'mobile':	opts.mobile,
	    	'isDefaultAddress': opts.isDefaultAddress,
	    	"deliveryMethod": opts.deliveryMethod,
    		'provinceId': opts.provinceId ,
    	 	'cityId': opts.cityId,
    	 	'districtId': opts.districtId,
    	 	'street': opts.street,
    		'address': opts.address,
    		'addrId': opts.addrId
		}
	}else{
		var data = {
			'realname': opts.realname,
	    	'mobile':	opts.mobile,
	    	'isDefaultAddress': opts.isDefaultAddress,
	    	"deliveryMethod": opts.deliveryMethod,
    		'provinceId': opts.provinceId ,
    	 	'cityId': opts.cityId,
    	 	'districtId': opts.districtId,
    	 	'street': opts.street,
    		'address': opts.address
		}
	}
	return axios.post(CONFIG.API.ADD_ADDR,data,{
		headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
	}).then(res =>{
		console.log('addAddr',res);
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else if(res.data.code && res.data.code == 'ERR_001'){
			return res.data;
		}else{
			return res.data;
			
		}
	})
}

/*
 * 选择地址列表 （select）
 */
export function selectAddr(opts){
	return axios.get(CONFIG.API.SELECT_ADDR,{
		
	}).then(res =>{
		console.log("selectAddr",res)
		if(res.data.code && res.data.code == '00'){
			return res.data.result ? res.data.result : [];
		}else{
			return [];
		}
	})
}


/*
 * 管理地址 编辑 （addAddr）
 */
export function addEdit(opts){
	return axios.get(CONFIG.API.EDIT_ADDR,{
		params:{
			'addrId': opts.addrId
		}
	}).then(res =>{
		console.log("addEdit",res)
		if(res.data.code && res.data.code == '00'){
			return res.data.result;
		}else{
			return {};
		}
	})
}

/*
 * 删除地址项
 */
export function deleteAddr(opts){
	return axios.post(CONFIG.API.DELETE_ADDR,{
		'addrId': opts.addrId
	},{
		headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
	}).then(res =>{
		console.log('deleteAddr',res);
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}

/*
 * 退款详情（refundDetail）
 */
export function getRefundDetail(opts){
	return axios.get(CONFIG.API.GET_REFUND_DETAIL,{
		params: {
			'acitivityId': opts.activityId
		}
	}).then(res => {
		console.log("getRefundDetail",res)
		if(res.data.code && res.data.code == '00'){
			return res.data.result
		}else{
			return []
		}
	})
}
/*
 * 申请退款 （applyRefund）	
 */
export function getApplyRefund(opts){
	return axios.get(CONFIG.API.GET_APPLY_REFUND,{
		params:{
			"activityId": opts.activityId
		}
	}).then(res =>{
		console.log("getApplyRefund",res)
		if(res.data.code && res.data.code === '00'){
			return res.data.result;
		}else{
			return [];
		}
	})
}


/*
 * 提交单号信息 （entryOrder）
 */
export function submitInfo(opts){
	return axios.get(CONFIG.API.SUBMIT_INFO,{
		params:{
			'company': opts.company,
			'orderNum':	opts.orderNum
		}
	}).then(res =>{
		console.log("submitInfo",res)
		if(res.data.code && res.data.code == "00"){
			return res.data.result;
		}else{
			return [];
		}
		
	})
}

/*
 * 订单详情 （orderDetail）
 */
export function getOrderDetail(opts){
	return axios.get(CONFIG.API.GET_ORDER_DETAIL,{
		params:{
			'orderId': opts.orderId
		}
	}).then(res =>{
		console.log("getOrderDetail",res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}


/*
 * 我的通宝页图片 （mytb）
 */
export function getMyTB(opts){
	return axios.get(CONFIG.API.GET_MY_TB,{
		params:{
			
		}
	}).then(res =>{
		console.log("getMyTB",res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}


/*
 * 取消订单 
 */
export function getOrderCancle(opts){
	var data = {
		'orderId': opts.orderId,
		'itemStatus': opts.itemStatus,
		'reason': opts.reason,
		'imageUrl': opts.imageUrl,
		'logisticsCompany': opts.logisticsCompany,
		'expressId': opts.expressId,
		"refundOnly": opts.refundOnly
	};
	return axios
	.post(CONFIG.API.GET_ORDER_CANCLE, qs.stringify(data),{
//      headers: {
//          'Content-Type': 'application/json; charset=utf-8'
//      }
    }).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}


/*  
 * 	待发货申请退款（refundNew）  
 */
export function applyRefundNew(opts){
	
	let data = {
		'orderId': opts.orderId,
		'reason': opts.reason
	}
	return axios.post(CONFIG.API.APPLY_REFUND_NEW,qs.stringify(data),{
		
	}).then(res =>{
		console.log("applyRefundNew",res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return res.data;
		}
	})
}


/*
 * 确认收货 
 */
export function getSureReceive(opts){
	return axios.get(CONFIG.API.GET_MAKESURE_RECEIVE,{
		params:{
			'orderId': opts.orderId
		}
	}).then(res =>{
		console.log("getSureReceive",res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}


/*
 * 支付成功后的返通宝 (SuccessPay)  
 */
export function getTbReturn(opts){
	return axios.get(CONFIG.API.GET_TB_RETURN,{
		params:{
			'orderId': opts.orderId
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}

/*
 * 直接weixin去付款  （单个商品）
 */
export function payWeiXin(opts){
	return axios.get(CONFIG.API.GET_GOTO_BUY,{
		params:{
			'message'     : opts.message,
			'addrId'      : opts.addrId,
			'itemId'      : opts.itemId,
			'useRmbCounts': opts.useRmbCounts,
			'merchantId'  : opts.merchantId,
			'postfee'     : opts.postfee
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return res.data;
		}
	})
}


/*
 * 未付款去付款  
 */
export function getGoToReBuy(opts){
	return axios.get(CONFIG.API.GET_GOTO_REBUY,{
		params:{
			'orderId': opts.orderId
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}


/*
 * 未付款购物车去付款  
 */
export function getGoToReCartBuy(opts){
	return axios.get(CONFIG.API.GET_GOTO_REBUY,{
		params:{
			'orderId': opts.orderId
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}

/*
 * 去付款 (购物车) 
 */
export function payWeiXinCar(opts){
	return axios.get(CONFIG.API.GET_CART_BUY,{
		params:{
			'message'     : opts.message,
			'addrId'      : opts.addrId,
			'merchantId'  : opts.merchantId,
			'idStr' : opts.idStr,
			'postfee': opts.postfee
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}


/*
 * 未支付的付款 (repay) 
 */
export function payWeiXinRepay(opts){
	return axios.get(CONFIG.API.REPAY_WEIXIN,{
		params:{
			"orderId"  : opts.orderId
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}

/*
 * 取消申请（订单详情）
 */
export function cancelRequest(opts){
	return axios.get(CONFIG.API.GET_CANCLE_REQUEST,{
		params:{
			'orderId': opts.orderId
		}
	}).then(res =>{
		console.log("cancelRequest",res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})
}

/*
 * 手机号验证码 (shopName)
 */
export function getYanCode(opts){
	return axios.get(CONFIG.API.GET_YAN_CODE,{
		params:{
			'mobile': opts.phoneNum
		}
	}).then(res =>{
		console.log("getYanCode",res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return res.data;
		}
	})
}


/*
 * 得到购物车数量 (shopName)
 */
export function getCartNum(opts){
	return axios.get(CONFIG.API.GET_CART_NUM,{
		params:{
			
		}
	}).then(res =>{
		console.log("getCartNum",res)
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return res.data;
		}
	})
}

/*
 * 验证手机号和验证码登陆  (shopName)
 */

export function getLogin(opts){
	return axios.get(CONFIG.API.GET_LOGIN,{
		params: {
			'mobile': opts.phoneNum,
			'smsCode': opts.code,
			'merchantId' : opts.id
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else if(res.data.code && res.data.code == 'ERROR_USER_005'){
			return res.data;
		}else{
			utils.checkLogin(res)
		}
	})			
}

/*
 * 验证手机号和验证码登陆  (shopName)
 */

//export function getLogin(opts){
//	return axios.post(CONFIG.API.GET_LOGIN,{
//			'mobile': opts.phoneNum,
//			'smsCode': opts.code,
//			'merchantId' : opts.id
//	},{
//		headers: {
//          'Content-Type': 'application/json; charset=utf-8'
//      }
//	}).then(res =>{
//		if(res.data.code && res.data.code == '00'){
//			return res.data;
//		}else if(res.data.code && res.data.code == 'ERROR_USER_005'){
//			return res.data;
//		}else{
//			utils.checkLogin(res)
//		}
//	})			
//}


/*
 * 更多好货 banner
 */

export function getMoreGoodsBanner(opts){
	return axios.get(CONFIG.API.MORE_GOODS_BANNER,{
		params: {
			'ownType': opts.ownType	
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){			
			return res.data.result ? res.data.result : [];		
		}
	})			
}


/* 我的店铺（myStore）
 * 个人信息	
 */

export function getMyInfo(opts){
	return axios.get(CONFIG.API.GET_MY_INFO,{
		params: {
			'merchantId': opts.merchantId
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){			
			return res.data.result ? res.data.result : {};		
		}
	})			
}
/* 个人中心（center）
 * 个人信息	
 */

export function getPersonIfo(opts){
	return axios.get(CONFIG.API.GET_PERSON_INFO,{
		
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){			
			return res.data ? res.data : {};		
		}
	})			
}




/* 我的店铺（myStore）
 * 头部 + 新品速递 + 为你推荐	
 */

export function getMoreGoodsAll(opts){
	return axios.get(CONFIG.API.MORE_GOODS_ALL,{
		params: {
			'merchantId': opts.mechantId,
			'flag': opts.flag,
			'code': opts.code
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){			
			return res.data.result ? res.data.result : [];		
		}
	})			
}



/*
 * 更多好货 详情 改为  新品速递   （myStore）
 */

export function getMoreGoodsDetail(opts){
	return axios.get(CONFIG.API.MORE_GOODS_DETAIL,{
		params: {
			'type': opts.type	
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){			
			return res.data.result ? res.data.result : [];		
		}
	})			
}

/*
 * 店主精选 banner+个人信息
 */

export function getShoperDetail(opts){
	return axios.get(CONFIG.API.GET_BEST_SELECT,{
		params: {
			'mechantId': opts.mechantId	
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})			
}

/*
 * 店主精选 商品列表
 */

export function getShoperGoodsList(opts){
	return axios.get(CONFIG.API.SHOPER_GOODS_LIST,{
		params: {
			'mechantId': opts.mechantId	
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return {};
		}
	})			
}


/*
 * 按订单开发票 商品列表
 */

export function getInvoiceList(opts){
	return axios.get(CONFIG.API.INVOICE_GOODS_LIST,{
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data.result ? res.data.result : [];
		}else{
			return [];
		}
	})			
}

/*
 * 按订单开发票 提交页信息
 */

export function getSubmitDetail(opts){
	return axios.get(CONFIG.API.INVOICE_SUBMIT_DETAIL,{
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return res.data;
		}
	})			
}

/*
 * 按订单开发票 提交按钮
 */
export function getSubmitBtn(opts){
	var data = {
		'userId': opts.userId,
		'orderIds': opts.orderIds,	
		'headerType': opts.headerType,
		'taxId': opts.taxId,
		'invoice': opts.invoice,	
		'realName': opts.realName,	
		'mobile': opts.mobile,	
		'address': opts.address,	
		'money': opts.orderSumMoney	
	};
	return axios
	.post(CONFIG.API.INVOICE_SUBMIT_BTN,qs.stringify(data),{
//		headers: {
//          'Content-Type': 'application/json; charset=utf-8'
//      }
	}).then(res =>{
		
		return res.data;

	})			
}

/*
 * category
 */

export function categoryType(opts){
	return axios.get(CONFIG.API.CATEGORY_DETAIL_TYPE,{
		params: {//columnType= (find,raider)
			'columnType': opts.columnType	
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}
	})			
}

/*
 * category 数据
 */

export function categoryDetail(opts){
    if(opts.categoryId){
		var data = {
			'columnType': opts.columnType,	
			'categoryId': opts.categoryId
		}
	}else{
		var data = {
			'columnType': opts.columnType,	
		}
	}
	return axios.get(CONFIG.API.CATEGORY_DETAIL,{
		params: data
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}
	})			
}

/*
 * 更多好货购物车数量
 */
export function moreCarNum(opts){
	return axios.get(CONFIG.API.MORE_CART_NUM,{
	}).then(res =>{
		if(res.data.code && res.data.code === '00'){
			return res.data;
		}else{
			return {};
		}
	})
}

/*
 * 猜你喜欢  （支付成功）
 */

export function getGuessYouLike(opts){
	return axios.get(CONFIG.API.GUESS_YOU_LIKE,{
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){			
			return res.data.result ? res.data.result : [];		
		}
	})			
}


// 商品详情页  （新增获取用户信息）

export function getUserName(opts){
	return axios.get(CONFIG.API.GET_USER_NAME,{
		params: {
			'merchantId': opts.merchantId	
		}
	}).then(res =>{
		if(res.data.code && res.data.code == '00'){
			return res.data;
		}else{
			return res.data;
		}
	})			
}


























