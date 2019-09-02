<template>
	<div id="orderDetail">
		<!-- @on-click-back="backToList"  ,preventGoBack:true-->
		<div class="header">
			<x-header  :left-options="{showBack: true}">订单详情</x-header>
		</div>
		<div class="banner"  v-if="orderStatus == 'AUDIT_REFUND_PROCESS'">
			<div class="ding_text" >订单申请退款中</div>
			<div style="width: 40%;display: inline-block;">
				<div style="display: flex;justify-content: space-around;">
					<div class="btn" @click="CancelRequest">取消申请</div>
					<router-link class="btn" style="background-color: #FFF;color: #fe8d03;" to="/services" tag="div">联系客服</router-link>
				</div>
			</div>
		</div>

		<div class="banner" v-if="orderStatus == 'AUDIT_FAIL'">
			<div class="ding_text">订单申请退款失败</div>
			<div style="width: 40%;display: inline-block;">
				<div style="display: flex;justify-content: space-around;">
					<router-link class="btn" :to="'/selectPay/'+orderId+'/'+orderAmount" tag="div">重新申请</router-link>
					<router-link class="btn" style="background-color: #FFF;color: #fe8d03;" to="/services" tag="div">联系客服</router-link>
				</div>
			</div>
		</div>

		<div class="banner" v-if="orderStatus == 'PAY_NO'">
			<div class="ding_text" >待付款订单</div>
			<div style="width: 40%;display: inline-block;">
			  <div style="display: flex;justify-content: space-around;">
				<div class="btn" @click="orderCancle">取消订单</div>
				<div v-if="isCart" class="btn" style="background-color: #FFF;color: #fe8d03;" @click="GoToNewBuy">付款</div>
				<div v-else class="btn" style="background-color: #FFF;color: #fe8d03;" @click="GoToNewBuy">付款</div>
			  </div>
			</div>
		</div>

		<div class="banner" v-if="orderStatus == 'AUDIT_OK'">
			<div class="ding_text">退款申请审核通过</div>
			<div style="display: inline-block;float:right;margin-right:.75rem;">
				<router-link class="btn" style="background-color: #FFF;color: #fe8d03;" :to="'/entryOrder/'+orderId" tag="div">寄回商品</router-link>
			</div>
		</div>

		<div class="banner" v-if="orderStatus == 'AUDIT_OK_REFUND_NO'">
			<div class="ding_text">订单申请退货退款中</div>
			<div style="display: inline-block;float:right;margin-right:.75rem;">
				<router-link class="btn" style="background-color: #FFF;color: #fe8d03;" to="/services" tag="div">联系客服</router-link>
			</div>
		</div>

		<div class="banner" v-if="orderStatus == 'AUDIT_OK_REFUND_OK'">
			<div class="ding_text" >订单取消，已退款</div>
		</div>

		<div class="banner" v-if="orderStatus == 'CANCEL_REFUND_PROCESS'">
			<div class="ding_text" >订单取消，退款中</div>
		</div>

		<!--<div class="banner" v-if="orderStatus == 'WAIT_RECEIVE0'">
			<div class="ding_text">待收货订单</div>
			<div style="width: 40%;display: inline-block;">
				<div style="display: flex;justify-content: space-around;">
					<div class="btn" @click="MakeSureReceive">确认收货</div>
					<router-link style="background-color: #FFF;color: #fe8d03;" class="btn" :to="'/selectPay/'+orderId+'/'+orderAmount" tag="div">退款</router-link>
				</div>
			</div>
		</div>-->
		<div class="banner" v-if="orderStatus == 'WAIT_RECEIVE'">
			<div class="ding_text" >待收货订单</div>
			<div style="display: inline-block;float:right;margin-right:.75rem;">
				<div class="btn" style="background-color: #FFF;color: #fe8d03;" @click="MakeSureReceive">确认收货</div>
			</div>
		</div>
		<div class="banner" v-if="orderStatus == 'TO_DELEIVE'">
			<div class="ding_text" >待发货订单</div> 
			<div style="display: inline-block;float:right;margin-right:.75rem;">
				<router-link :to="'/refundNew/'+orderId" ><div class="btn" style="background-color: #FFF;color: #fe8d03;">取消订单</div></router-link>
			</div>
		</div>

		<div class="banner" v-if="orderStatus == 'CANCEL'">
			<div class="ding_text" >订单已取消</div>
		</div>

		<div class="banner" v-if="orderStatus == 'COMPLETED'">
			<div class="ding_text">交易成功</div>
			<!--<div style="display: inline-block;float:right;margin-right:.75rem;">
				<router-link class="btn" style="background-color: #FFF;color: #fe8d03;" :to="'/selectPay/'+orderId+'/'+orderAmount" tag="div">退款</router-link>
			</div>-->
		</div>
        
        <div class="banner" v-if="orderStatus == 'CANCEL_REFUND_SUCESS'">
			<div class="ding_text" >订单取消,退款成功</div>
		</div>

		<div class="goodsinfo">
			<div class="icon">
				<img src="../assets/img/pictures/add-icon.png" width="50%"/>
			</div>
			<div class="information">
				<div class="information_name">
					<p>收货人: {{receivePerson}}</p>
					<p>{{mobileNum}}</p>	
				</div>
				<div style="line-height: 1.1rem;margin-top: 5px;">收货地址: {{receiveAddr}}</div>
			</div>
		</div>

		<div class="goodsinfo" v-if="buyerMessage != ''">
            <div class="icon">
				<img src="../assets/buyer-say.png" width="50%"/>
			</div>
            <div class="information">
				<div class="information_name">
					<p>买家留言</p>	
				</div>
				<div style="line-height: 1.1rem;margin-top: 5px;">{{buyerMessage}}</div>
			</div>

		</div>

	    <div class="item-content" v-for="(item , index) in orderList" :key="index">
            <div class="item-pic" :style="'background:url('+item.itemImageUrl+')  center/ 100% 100% no-repeat;'"></div>
            <div class="item-main">
                <div class="item-title">{{item.itemTitle}}</div>
                <div class="item-subtitle"></div>
                <div class="item-price">
                	<span>¥&nbsp;{{item.itemPrice}}</span>
                	<div class="refund-detail" v-show="(orderStatus == 'AUDIT_REFUND_PROCESS' || orderStatus == 'AUDIT_FAIL' || orderStatus == 'AUDIT_OK' || orderStatus == 'AUDIT_OK_REFUND_NO' )&& index === 0"><router-link :to="'/refundDetail/'+orderId" tag="div">退款信息</router-link></div>
                </div>
                <div class="item-num">X{{item.itemNum}}</div>
            </div>
        </div>


		<div style="background-color: #FFF;padding: 10px 15px 15px;">
			 <!--<div class="goods_Calculation" style="margin-bottom: 5px;">
				<p>优惠券：</p>
				<p>-￥10.00</p>			  
			</div> -->
			 <div class="goods_Calculation" style="margin-bottom: 5px;">
				<p>运费：</p>
				<p>￥{{postFree}}</p>			  
			</div>
			<div class="goods_Calculation">
				<p>总计：</p>
				<p style="color: #f54a00;font-weight: 700;">￥{{orderAmount}}</p>
			</div>
		</div>
		<div class="retuenMoney"  v-show="orderStatus == 'WAIT_RECEIVE'"><router-link :to="'/selectPay/'+orderId+'/'+orderAmount" tag="div" class="refund-detail">退款</router-link></div>
		
		<div class="goods_info" style="margin-bottom: 0;">
			<div>订单时间： {{creatTime}}</div>
			<div style="display: flex;justify-content: space-between;">
				<div>订单编号： {{orderNum}}</div>
				<div  class="copy" v-clipboard:copy="orderNum" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
			</div>
		</div>	
		<div v-show="orderStatus == 'WAIT_RECEIVE' || orderStatus == 'COMPLETED'" class="goods_info" style="margin-top: 2px;">
			<div>物流信息： {{logistics}}</div>
			<div style="display: flex;justify-content: space-between;">
				<div>快递编号： {{logisticsNum}}</div>
				<div  class="copy" v-clipboard:copy="logisticsNum" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
			</div>
		</div>

			
	</div>
</template>

<script>
	import {  XHeader , dateFormat} from 'vux'
	import * as core from "@/core/api"
	export default {
	components: {
	    XHeader
	  },
	  data() {
	  	return {
	  		orderList: [],
	  		orderAmount: 0,
	  		receivePerson: '',
	  		receiveAddr: '',
	  		mobileNum: '',
	  		creatTime: '',
	  		orderNum: '',
	  		orderStatus: '',
            // --物流信息--
	  		logistics: '',
	  		logisticsNum:'',
            
            //--订单取消--
	  		orderId: '',
	  		reason: '',
	  		imageUrl: '',
	  		logisticsCompany: '',
	  		expressId: '',
	  		itemStatus: 'N',
            
            //--支付提交--
	  		itemSku:'',
	  		rmbPay: 0,
	  		addrId: 0,
	  		buyerMessage: '',
	  		isCart: false,
	  		type  : 0,
	  		
	  		// 免邮费
	  		postFree: ''
	  	}
	  },
	  watch: {
	    '$route' (to, from) {
	      let id = this.$route.params.id
	  	  this.fetchServeData(id);
	    }
	  },
	  created() {
	  	let id = this.$route.params.id
	  	let type = this.$route.params.type
	  	this.orderId = id;
	  	this.type = type;
	  	this.fetchServeData(id);
	  },
	  methods: {
	  	onCopy: function(e){
	  		this.$message({ message: '复制成功！', type: 'success',center: true})
	  	},
	  	onError: function(e){
	  		this.$error('复制失败！')	  		
	  	},
	  	fetchServeData:function(_id){
	  		let _this = this;
	  		_this.orderList = [];
	  		core.getOrderDetail({
	  			"orderId": _id
	  		}).then(data =>{		
                if (data.result) {
                	let itemResultArr = data.result.orderList;
                    
                    let _userAddress  = data.result;
                	let _province     = _userAddress.province ? _userAddress.province : '';
                	let _city         = _userAddress.city ? _userAddress.city : '';
                	let _district 	  = _userAddress.district ? _userAddress.district : '';
                	let _street 	  = _userAddress.street ? _userAddress.street : '';
                	let _address 	  = _userAddress.address ? _userAddress.address : '';
                	
                	_this.receivePerson = data.result.realname ? data.result.realname : '';
                	_this.mobileNum 	= data.result.mobile ? data.result.mobile : '';
                	_this.receiveAddr   = _province + _city + _district + _street + _address;
                    _this.creatTime 	= dateFormat(new Date(data.result.createTime), 'YYYY-MM-DD  HH: mm')
//                  _this.orderNum 		= data.result.fakeOrderId;
                    _this.orderNum 		= data.result.id;
                    // --物流--
                    _this.logistics 	= data.result.express; 
                    _this.logisticsNum 	= data.result.expressId; 
                    
                    _this.buyerMessage  = data.result.message ? data.result.message : '';
                    _this.rmbPay 		= data.result.rmbPay;
                    _this.addrId 		= _userAddress.id;
                    _this.itemSku 		= data.result.itemSku;
					_this.orderStatus   = data.result.status;
					
					_this.postFree = data.result.fee;

                    // test
                    //_this.orderStatus   = 'WAIT_RECEIVE';
               
                    _this.orderAmount = data.result.orderAmount;

                    if (itemResultArr) {
                    	_this.isCart     = true;
                  //   	let _totalAmount = 0;
                  //   	for (var y = 0; y < itemResultArr.length; y++) {
		                //   _totalAmount += itemResultArr[y].itemNum * itemResultArr[y].itemPrice
		                // }
		                // _this.orderAmount = _totalAmount;
                        for (var i = 0; i < itemResultArr.length; i++) {
                        	let orderListObj = {};
                        	orderListObj['itemTitle'] 	 = itemResultArr[i].itemTitle;
                        	orderListObj['itemImageUrl'] = itemResultArr[i].itemImageUrl;
                        	orderListObj['itemNum'] 	 = itemResultArr[i].itemNum;
                        	orderListObj['itemPrice'] 	 = itemResultArr[i].itemPrice;
                        	_this.orderList.push(orderListObj)
                        }

                    }else{
                        // _this.orderAmount = data.result.orderAmount;
                        let orderListObj  = {};
                    	orderListObj['itemTitle'] 	 = data.result.itemTitle;
                    	orderListObj['itemImageUrl'] = data.result.itemImageUrl;
                    	orderListObj['itemNum'] 	 = data.result.itemNum;
                    	orderListObj['itemPrice'] 	 = data.result.itemPrice;
                    	_this.orderList.push(orderListObj) 
                         
                    }
                }
	  			
	  		})
	  		
	  	},

	  	orderCancle: function(){//取消订单
	  		let _this = this;
	  		core.getOrderCancle({
	  			"orderId": _this.orderId,
	  			"itemStatus": _this.itemStatus,
	  			"reason": _this.reason,
	  			"imageUrl": _this.imageUrl,
	  			"logisticsCompany": _this.logisticsCompany,
	  			"expressId": _this.expressId
	  		}).then(data =>{  
               if (data.code == '00') {
                  _this.fetchServeData(_this.orderId); 
               }
	  		})
	  	},

	  	CancelRequest: function(){//取消申请
            let _this = this;
            core.cancelRequest({
	  			"orderId": _this.orderId
	  		}).then(data =>{  
               if (data.code == '00') {
                  _this.fetchServeData(_this.orderId); 
               }
	  		})
	  	},
	  	MakeSureReceive: function(){//确认收货
            let _this = this;
            core.getSureReceive({
	  			"orderId": _this.orderId
	  		}).then(data =>{  
               if (data.code == '00') {
                  _this.fetchServeData(_this.orderId); 
               }
	  		})
	  	},
//	  	GoToBuy: function(){//去付款
//          let _this = this;
//          core.getGoToReBuy({
//	  			"orderId": this.orderId
//	  		}).then(data =>{  
//             if (data.code == '00') {
//                location.href = data.result;  
//             }
//	  		})
//	  	},
//	  	GoCartBuy: function(){//去付款 (购物车)
//          let _this = this;
//          core.getGoToReCartBuy({
//          	
//	  			"orderId" : this.addrId
//	  		}).then(data =>{  
//             if (data.code == '00') {
//                location.href = data.result;  
//                
//             }
//	  		})
//	  	},
		GoToNewBuy: function(){
			if(window.CONFIG.isWeixin == '1'){
				//alert( '$!{err_msg}' + 'weixin')
          		//window.location.href = '/shop/weixin/repay.html?orderId=' + this.orderId;
          			core.payWeiXinRepay({
              			"orderId"  : this.orderId
              		}).then(data=>{
						if(data.code && data.code == '00'){
							if (typeof WeixinJSBridge == "undefined"){
								if( document.addEventListener ){
									document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data.result), false);
								}else if (document.attachEvent){
									document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data.result)); 
									document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data.result));
							    }
							}else{
								this.onBridgeReady(data.result);
							} 
						}
						
              		})
          		
          		
          		
          	}else{
          		//alert( '$!{err_msg}' + 'alipay')
//        		window.location.href = '/shop/order/noPay/submit?orderId=' + this.orderId;
          		
          		window.location.href = '/shop/order/repay.html?orderId=' + this.orderId;
          	}
			//window.location.href = '/shop/order/repay.html?orderId=' + this.orderId ;
		},
		
		onBridgeReady: function(dataPay){
  		
	  		if("failure" != dataPay.failure){
		        WeixinJSBridge.invoke(
		            'getBrandWCPayRequest', {
		               "appId":dataPay.appId,     //公众号名称，由商户传入     
		               "timeStamp":dataPay.timeStamp,         //时间戳，自1970年以来的秒数     
		               "nonceStr" : dataPay.nonceStr, //随机串     
		               "package": dataPay.package,     
		               "signType": dataPay.signType,         //微信签名方式：     
		               "paySign": dataPay.paySign //微信签名 
		            },
					
		            function(res){ 
		            	//alert("res.err_msg:"+res.err_msg+",href=$!{mapAttr.callback_url}");
						// alert(JSON.stringify(res))
		               if(res.err_msg == "get_brand_wcpay_request:ok" ) {
		                    location.href = dataPay.callback_url;
							/*$.ajax({
			                    	type:"get",
									data:{
										'rmbPay': $!{mapAttr.rmbPay},
										'orderId': $!{mapAttr.orderId}
									},
			                    	url:"/shop/orderPay/notify",
			                    	async:true,
									success: function(data){
										console.log('成功！')
									}，
									error: function(){
									
									}
									
			                    });  */
							
		               }else{
		            	   location.href="/plas/orderDetail/"+ dataPay.orderId;
		//                          history.go(-1);
		               } 
		            }
		       );
		    }else{
		            alert("微信支付失败");
		            return false;
		    }
	  	},


	  	backToList (){
	  		this.$router.push('/orderList/'+this.type)
	  	}
	  }
	}
	
	
</script>

<style lang="less">
	#orderDetail{
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}
		.vux-header-back{display: none;}
		img { display: block; max-width: 100%; margin: auto; border: 0; }
		input, select, button, textarea, table { margin: 0; font-family: inherit; font-size: 100%; }
		a{display: block;}
		.banner{background: linear-gradient(to right, #fe8d03 ,#ff5601);color: #FFFFFF;font-size: 0.8rem;padding: 25px 0;overflow: hidden;}
		.ding_text{font-size: 1.1rem;display: inline-block;width: 57%;text-align: left;letter-spacing: 2px; text-indent: 20px;}
		.btn{
			border: 1px solid #FFFFFF;
			border-radius: 5px;
			font-size: 0.75rem;
			width:3.875rem;
			height:1.5rem;
			text-align: center;
			line-height: 1.5rem;
		}
		.btn + .btn{
			margin-left: .625rem;
		}
		.btn_other{width: 55px;border: 1px solid #FFFFFF;border-radius: 15px;padding: 0 5px;text-align: center;font-size: 0.4rem;}
		.goodsinfo{background-color: #FFF;padding: 10px;color: #333333;display:table;box-sizing: border-box;width: 100%;box-shadow: 0px 1px 2px lightgrey;}
		.icon{display: table-cell;vertical-align: middle;width: 10%;}
		.information{display: table-cell;vertical-align: middle;font-size: 0.8rem;}
		.information_name{display: flex;justify-content: space-between;}
		
		.goods{border-top: 10px solid #FFF;border-bottom: 10px solid #FFF;padding: 10px 15px;margin-top: 10px;    display: table; width: 100%; box-sizing: border-box;}
		.goodsCon{width: 85%;}
		.goodsPic{display: table-cell;vertical-align: middle;width: 20%;}
		.goodsIntro{display: table-cell;vertical-align: middle;font-size: 0.8rem;width: 55%;padding-left: 15px;}
		.goodsIntroText{line-height: 1.5rem;    width: 80%;}
		.goodsIntroName{font-size: 14px;height: 1.6rem;overflow: hidden;    display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;}
		.goods_Calculation{display: flex;justify-content: space-between;}
		
		.goods_info{background-color: #FFF;margin-top: 15px;padding: 10px 15px 15px;color: gray;
			margin-bottom: 180px
		}
		.copy{width: 55px;
			border: 1px solid #c1c1c1;
			font-size: .75rem;
		    color: #686767;
		    line-height: 22px;
			border-radius: 6px;text-align: center;}
        .item-content{
				position: relative;
				border-top: 10px solid #fff;
				margin-top: 10px
			}
			.item-pic{
				width: 4.9375rem;
				height: 4.9375rem;
				position: absolute;
				top: 50%;
				transform:translateY(-50%);
				left: .75rem;
			}
			.item-main{
				padding: 1.3125rem .6825rem 1.1875rem 6.4375rem;
				color: #242424;
				position: relative;
			}
			.item-title{
				font-size: .8125rem;
				padding-right: 2.5rem;
				overflow: hidden; 
				text-overflow:ellipsis; 
				white-space: nowrap;
			}
			.item-subtitle{
				font-size: .75rem;
				color: #9a9a9a;
		    padding-top: .625rem
			}
			.item-price{
				font-size: 1rem;	
			}
			.item-num{
				position: absolute;
				top: 1.3125rem;
				right: .6825rem;
				font-size: .75rem;
				color: #9a9a9a;
			}
			.refund-detail{
				float: right;
			    padding: 2px 5px;
			    border: 1px solid #c1c1c1;
			    border-radius: 5px;
			    font-size:.8125rem;
			    color: #686767;
			}
			.retuenMoney{
			    overflow: hidden;
			    background-color: #fff;
			    padding-right: .9375rem;
			    padding-bottom: .625rem;
			    margin-top: -0.375rem;
			}
			

	}
</style>