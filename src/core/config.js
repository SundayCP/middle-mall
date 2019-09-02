const isdevelop     = process.env.NODE_ENV !== 'production'
const domain        = isdevelop ? "" : ""
const isDebug       = isdevelop ? '' : "" 

const CONFIG = {
  API:{
    'UPLOAD_FILE'          : domain + '/certificate/upload/file' + isDebug,                      //上传图片 
    'GET_ORDER_LIST'       : domain + '/shop/order' + isDebug,                 		 			//商品订单列表
 	"GET_ORDER_DETAIL"	   : domain + "/shop/order/detail" + isDebug,	                        //订单详情（orderDetail）
 	"GET_ORDER_CANCLE"	   : domain + "/shop/order/cancel" + isDebug,	                        //取消订单
 	"GET_CANCLE_REQUEST"   : domain + "/shop/refund/cancelRefundApplication" + isDebug,	        //取消申请 
 	"GET_MAKESURE_RECEIVE" : domain + "/shop/order/confirmReceive" + isDebug,	                //确认收货 
 	"GET_GOTO_BUY"         : domain + "/shop/item/order/submit" + isDebug,	                        //直接付款 （单个商品）
 	
 	"GET_GOTO_REBUY"         : domain + "/shop/order/noPay/submit" + isDebug,	                        //未付款去付款
 	"GET_TB_RETURN"          : domain + "/shop/order/tbReturn" + isDebug,	                        //支付成功后的返通宝 (SuccessPay)  
 	
 	"GET_CART_BUY"         : domain + "/shop/cart/order/submit" + isDebug,	                    //去付款 (购物车)
 	
 	"REPAY_WEIXIN"         : domain + "/shop/order/weixinRepay" + isDebug,	                    //未支付支付 (repay)
 	
	"GET_SHOP_INFO"        : domain + "/shop/item/detail" + isDebug,  						    //对应商品详情  (shopName)
 	"GET_YAN_CODE"		   : domain + "/login/sms" + isDebug,                         	        //手机号验证码（shopName）
 	"GET_LOGIN"			   : domain + "/login/sms/submit" + isDebug,                            //验证手机号验和验证码登陆 （shopName）
	"SHOP_CART_ADD"        : domain + "/shop/cart/add" + isDebug,					     	    //把商品添加购物车  （shopName）
	"GET_CART_NUM"        : domain + "/shop/user/cart/num" + isDebug,					     	    //把商品添加购物车  （shopName）   
	
 	"GET_CART_LIST"        : domain + "/shop/cart/my" + isDebug,					     	    //购物车列表  （cart）
 	"DELETE_GOODS"		   : domain + "/shop/cart/deletes" + isDebug,						    //删除购物车订单 (cart)
 	"SEND_DATA_NUM"		   : domain + "/shop/cart/update" + isDebug,						    //购物车数据传输给后台 (cart)
 	"CONFIRM_ORDER"		   : domain + "/shop/cart/order/confirm" + isDebug,						//订单确认 (confirm 购物车)
 	"CONFIRM_ORDER_SINGE"  : domain + "/shop/order/confirm" + isDebug,						    //订单确认 (confirm 单品)
 	"SELECT_ORDER"		   : domain + "/shop/cart/order/confirm" + isDebug,						//选择地址 (selectAddr)
	"ADD_ADDR"			   : domain + "/user/addr/add" + isDebug,								//添加地址 （addAddr）
	"SELECT_ADDR"		   : domain + "/user/addr/list" + isDebug,					    		//选择地址 （selectAddr）
	"EDIT_ADDR"			   : domain + "/user/addr/update" + isDebug,					    	//管理地址 （manageAddr）
	"DELETE_ADDR"		   : domain + "/user/addr/del/post" + isDebug,					   		//删除地址 （manageAddr）
	"MORE_GOODS_BANNER"	   : domain + "/shop/item/source/banner" + isDebug,					    //更多商品banner 
	"MORE_GOODS_DETAIL"	   : domain + "/shop/share/item/more" + isDebug,					    //更多商品模块信息

	"MORE_GOODS_ALL"	   : domain + "/shop/share/merchant/store" + isDebug,					//我的店铺（myStore）头部图 + 新品速递 + 为你推荐
	"APPLY_REFUND_NEW"   : domain + "/shop/order/cancel" + isDebug,					//代付款页面 申请退款（refundNew）
	"GET_MY_TB"          : domain + "/user/tbService" + isDebug,					//我的通宝页图片数据  （mytb）
	"GET_MY_INFO"        : domain + "/shop/merchant/config" + isDebug,					//我的店铺（myStore）个人信息 
	
	"GET_BEST_SELECT"	   : domain + "/shop/share/merchant/store" + isDebug,					//店主精选banner+个人信息
	"SHOPER_GOODS_LIST"	   : domain + "/shop/item" + isDebug,					                //店主精选商品列表 
	"INVOICE_GOODS_LIST"   : domain + "/shop/invoice/order" + isDebug,					        //按订单开发票 商品列表 
	"INVOICE_SUBMIT_DETAIL": domain + "/user/default/address" + isDebug,					    //按订单开发票提交页信息 
	"INVOICE_SUBMIT_BTN"   : domain + "/shop/order/invoice/post" + isDebug,					    //按订单开发票提交按钮 
	"CATEGORY_DETAIL_TYPE" : domain + "/shop/getCategory" + isDebug,					        //CATEGORY
	"CATEGORY_DETAIL"      : domain + "/shop/getCategoryModuleData" + isDebug,					//CATEGORY 数据
	"MORE_CART_NUM"        : domain + "/shop/cart/item/num" + isDebug,					        //更多好货购物车数量
	"GUESS_YOU_LIKE"       : domain + "/shop/user/like/item" + isDebug,					        //猜你喜欢

	"GET_PERSON_INFO"			 : domain + "/user/weixinAuth" + isDebug,					        //个人中心
	
	"GET_USER_NAME"			 : domain + "/shop/merchant/config" + isDebug,					        //商品详情   个人信息 

  },
  mechantId : 0
}

export default CONFIG
