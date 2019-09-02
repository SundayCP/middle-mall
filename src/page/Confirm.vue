<template>
    <div class="vux-confirm-view">
      	<div class="header">
	        <x-header :left-options="{backText: ''}">订单确认</x-header>
        </div>    
	 	<main class="g-body" style="padding-bottom: 50px;">
			<div class="m-detail-address" v-if="addr">
				<a href="javascript:void(0);" id="js-select-address-list" @click="goAddr">
				<div class="checkout-pay-fl" style="font-size:12px;border-left:1px solid #f9f7f7;padding:0 10px;width: 90%;">
					<div style="overflow: hidden;">
						<p class="consignee" style="float: left;">收货人：{{getAddr.name}}</p>
						<p class="consignee" style="float: right;">{{getAddr.tel}}</p>	
					</div>
					<p class="addr-site">{{addrAll}}</p>
				</div>
				<span style="position:absolute;top:46%;right:10px;transform: translateY(-50%);"><i class="ico-next" ></i></span></a>
			</div>
			<div class="m-address" v-else>
				<a href="javascript:void(0);" @click="addAdrr" style="padding: 20px 10px 20px 60px;color: #FFF;display: block;">
					请添加收货地址
				</a>		
				<span style="position:absolute;top:46%;right:10px;transform: translateY(-50%);"><i class="ico-next-one"></i></span></a>
			</div>
			
			<div class="checkout-pay-goods-info" v-for="(item,index) in orderArr">
				<div class="goods-info-pic"><img width="80" height="80" :src=item.imgSrc alt=""></div>
				<div class="goods-info-main">
					<div class="goods-title">{{item.title}}</div>
					<div class="goods-price">
						<span class="checkout-pay-fl checkout-pay-txt"><span>￥<em class="num" id="js-sale-price">{{item.marketPrice}}</em></span></span><span class="checkout-pay-fr">x {{item.num}}</span>
					</div>
				</div>
			</div>

			<div class="g-wrap-bd m-detail-more">
				<div class="w-bar w-textarea" style="border-top:none;border-width: 10px 0;margin-top: 10px;">
					<span class="checkout-pay-fl">备注：</span>
					<!-- <input id="js-user-message" type="text" placeholder="买家留言" maxlength="30" style="border: 0; padding: 0 5px;height: 24px;width: 240px;"> -->
					<x-textarea :max="200" name="detail" placeholder="买家留言" :show-counter="false" v-model='noticeText'></x-textarea>
				</div>
				<!--<div class="w-bar">
					<span class="checkout-pay-fl">优惠券：</span>
					<div class="ui-select">
						<select name="cardNumber" id="js-select-coupon">
							<option value="0" data-value="0" selected>无</option>
						</select>
					</div>
				</div>-->
				<div class="w-bar"><span class="checkout-pay-fl">运费：</span><span class="checkout-pay-fr">{{postFree}} 元</span></div>
			</div>


			<div class="g-wrap-bd m-detail-more" style="margin: 0 auto;">
				<span class="w-bar" style="border-bottom: 10px solid #eee;"><span class="checkout-pay-fl">合计：</span><span class="checkout-pay-fr checkout-pay-total"><span>￥<em class="num" id="js-order-amount">{{totalMoney}}</em></span></span></span>
			</div>
		</main>

			<div class="shop-bottom-btns">
			<div class="shop-sum-price">需支付：<span style="color: #ff8820;">￥<em class="num" id="js-cash-amount">{{totalMoney}}</em></span></div>

			<a id="js-pay-submit" href="javascript:void(0)" class="shop-btn-quick-pay" title="立即购买" @click="GoToBuy">立即购买</a>
		</div>
	
		<!--address-->
		<div class="m-user-addrList" id="js-popup-address-list" style="display:none;"></div>
		<div class="m-user-addrList-bg" id="js-popup-address-bg" style="display:none;"></div>
		<!--/address-->
		<!-- <cell @click.native="showModuleAuto"></cell> -->
    </div>

</template>

<script>
import { XHeader , XTextarea,Cell,AlertModule, Alert} from 'vux'
import * as core from '@/core/api'
export default {
  components: {
    XHeader,
    XTextarea,
    Cell,
    AlertModule,
    Alert
  },
  data () {
    return {
    	addr: false,
     	textContent: '',
     	getAddr:{},
     	addrAll: '',
     	orderArr:[],
     	noticeText: '',
     	totalMoney: 0,
     	orderSku: '',
     	addrId: '',
     	merchantId: '',
     	postFree: '',
    }
  },
  created(){
//	this.orderSku = this.$route.params.sku;

	this.orderSku = this.$route.query.orderSku;
  	let _msg = window.localStorage.getItem("orderdetailmsg")
  	this.noticeText = _msg ? _msg : ''
	this.getValue();
	
	//let _mechantId = this.$route.params.mechantId
	let _mechantId = this.$route.query.merchantId
  	this.merchantId = Number(_mechantId)
  },
  methods:{
  	fetchServeData: function(){
  		core.confirmOrderSinge({
			'idStr': this.orderSku,
			'addrId': this.addrId
			
  		}).then(data =>{
  			if (data && data.addressResult.id) {
  				this.addr = true;
  				this.addrId = data.addressResult.id;
  				this.getAddr = {
					name: data.addressResult.name ? data.addressResult.name : '',
		     		tel: data.addressResult.phone ? data.addressResult.phone : '',
		     		province: data.addressResult.province ? data.addressResult.province : '',
		     		city: data.addressResult.city ? data.addressResult.city : '',
		     		district: data.addressResult.district ? data.addressResult.district : '',
		     		street: data.addressResult.street ? data.addressResult.street : '',
		     		address: data.addressResult.address ? data.addressResult.address : ''
				}
  				this.postFree = data.postfee;

  			}else{
                this.addr = false;
  			}		

			this.addrAll = this.getAddr.province + this.getAddr.city + this.getAddr.district + this.getAddr.street + this.getAddr.address;		
			// this.orderArr = data.item;
			// this.orderArr = this.orderArr.map(obj =>{
			// 	let reObj={
			// 		'imgSrc': obj.shopItem.thumbImageUrl,
			// 		'title': obj.shopItem.title,
			// 		'marketPrice': obj.shopItem.marketPrice,
			// 		'num': obj.num,
			// 		'id': obj.id
			// 	}
			// 	return reObj;
			// })
            
            if (data && data.item) {
	            let reObj={
					'imgSrc': data.item.thumbImageUrl,
					'title': data.item.title,
					'marketPrice':data.item.salePrice,
					'num': data.item.num ? data.item.num : 1,
					'id': data.item.id
				}
				this.orderArr.push(reObj)
			}

			// this.calTotalMoney();
			this.totalMoney =  data && data.totalPrice ? data.totalPrice : 0;
  		})
  	},
  	
  	getValue: function(){
		let getQueryString = function(name) {
			let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			let r = window.location.search.substr(1).match(reg); 
			if (r != null) return r[2];
			return false;
		}
		this.addrId = getQueryString("addrId") ? getQueryString("addrId") : "";
		this.fetchServeData()
    },
 	
  	goBuy: function(){
  		console.log(this.noticeText);
  	},
  	GoToBuy: function(){//去付款
        let _this = this;
//      let _merchantId = window.localStorage.getItem("merchantId")
        if (this.merchantId > 0) {
        	if (_this.addr) {//是否有收货地址
		      
//		              location.href = data.result;  
	                    //alert(window.CONFIG.isWeixin)
	                    if(window.CONFIG.isWeixin == '1'){
//		              		window.location.href = '/shop/weixin/item/pay.html?addrId='+this.addrId+'&itemId='+this.orderSku+'&message='+this.noticeText+'&useRmbCounts='+this.totalMoney+'&merchantId='+this.merchantId+'&postfee='+this.postFree;
							//window.location.href = '/shop/item/pay.html?addrId='+this.addrId+'&itemId='+this.orderSku+'&message='+this.noticeText+'&useRmbCounts='+this.totalMoney+'&merchantId='+this.merchantId+'&postfee='+this.postFree;
		              		// alert('/shop/weixin/item/pay.html?addrId='+this.addrId+'&itemId='+this.orderSku+'&message='+this.noticeText+'&useRmbCounts='+this.totalMoney+'&merchantId='+this.merchantId+'&postfee='+this.postFree)
		              		core.payWeiXin({
		              			"itemId" : _this.orderSku,
					  			"addrId" : _this.addrId,
					  			"message": _this.noticeText,
					  			"useRmbCounts": _this.totalMoney,
					  			"merchantId" : this.merchantId,
					  			'postfee': this.postFree
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
//							core.getGoToBuy({
//					  			"itemId" : _this.orderSku,
//					  			"addrId" : _this.addrId,
//					  			"message": _this.noticeText,
//					  			"useRmbCounts": _this.totalMoney,
//					  			"merchantId" : this.merchantId,
//					  			'postfee': this.postFree
//					   		}).then(data =>{  
//					           if (data.code == '00') {		              		
//				              		const div = document.createElement('div');
//				                    div.innerHTML = data.result;
//				                    document.body.appendChild(div);
//				                    document.forms.alipaysubmit.submit(); 
//				               	}else{
//					           	    _this.showModuleAuto(data.message)
//					            }
//					           
//					       })
							window.location.href = '/shop/item/pay.html?addrId='+this.addrId+'&itemId='+this.orderSku+'&message='+this.noticeText+'&useRmbCounts='+this.totalMoney+'&merchantId='+this.merchantId+'&postfee='+this.postFree;

		              	}
		          
//		  		})
	  		}else{
	  			 _this.showModuleAuto("您还没填收货地址~")
	  		}
  		}else{
  			_this.showModuleAuto("您还没有店铺哟~")
  		}
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
					//alert(JSON.stringify(res))
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
  	
  	

  	goAddr:function(){
  		let _this = this
    	if (window.localStorage && _this.noticeText) {
			localStorage.setItem("orderdetailmsg",_this.noticeText)
		}
       _this.$router.push('/select/'+ _this.orderSku +'/'+this.merchantId + "/N")
  		// location.href = '/plas/select/' + this.orderSku + "/N";
  	},
  	calTotalMoney: function(){
  		let len = this.orderArr.length;
  		for(var i=0; i<len;i++){
  			let price = this.orderArr[i].marketPrice;
  			let num = this.orderArr[i].num;
  			this.totalMoney += parseFloat(price) * parseFloat(num);
  		}
  	},
  	onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
	showModule (e) {
      AlertModule.show({
        title: '',
        content: e,
        onShow () {
          console.log('Module: I\'m showing')
        },
        onHide () {
          console.log('Module: I\'m hiding now')
        }
      })
    },
	showModuleAuto (e) {
      this.showModule(e)
      // setTimeout(() => {
      //   AlertModule.hide()
      // }, 3000) 
    },
    addAdrr(){
    	let _this = this
    	if (window.localStorage && _this.noticeText) {
			localStorage.setItem("orderdetailmsg",_this.noticeText)
		}
       _this.$router.push('/add/'+ _this.orderSku +'/'+this.merchantId + "/N")
    }
  }
}
</script>
	
<style lang="less">
.vux-confirm-view {
    background-color: #fff;
	height: 100%;
    position: fixed;
    width: 100%;
    overflow: scroll;
    max-width: 750px;
	.vux-header {
	  background-color: #fff;
	  border-bottom: 1px solid #e5e5e5;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.m-detail-address{overflow:hidden;*zoom:1;color:#333333;background: #fff url(../assets/icon_site.png) no-repeat 10px center;background-size:28px 28px;position: relative;}
	.m-detail-address a{color:#333333;display:block;overflow:hidden;*zoom:1;padding:10px 10px 10px 40px;}
	.m-address{overflow:hidden;*zoom:1;color:#333333;background: #fff url(../assets/img/pictures/add-icon-white.png) no-repeat 10px center;background-size:20px 26px;position: relative;background-color: #ff8820;margin-bottom: 10px}
	.message{display: inline-block;}
	.ico-next {
	    display: inline-block;
	    width: 8px;
	    height: 8px;
	    border: 2px solid #939292;
	    background: none;
	    border-width: 0 2px 2px 0;
	    transform: rotate(-45deg);
	    -webkit-transform: rotate(-45deg);
	}
	.ico-next-one{ display: inline-block; width: 8px; height: 8px; border: 2px solid #FFF; background: none; border-width: 0 2px 2px 0; transform: rotate(-45deg); -webkit-transform: rotate(-45deg); }
	.checkout-pay-title{height:30px;line-height:30px;background:#fff;padding:2px 1em;}
	.checkout-pay-fl{float:left;}
	.consignee{display: inline-block;}
	.addr-site{padding-right:2.5rem}
	.checkout-pay-fr{float:right;}
	.checkout-pay-total{color:#ff8820;font-size:16px;}
	.checkout-pay-txt{color:#ff8820;padding-right:4px;}
	.pro-radioGroup li{padding:0 14px;}
	.pro-radioGroup li:last-child{border-bottom:none;}
	.pro-radioGroup img{display:inline-block;width:2em;height:2em;margin:0 0.5em;vertical-align:middle;}
	.w-checkbox{display:inline-block;vertical-align:middle;}

	.checkout-pay-goods-info{font-size:12px;overflow:hidden;*zoom:1;position: relative;height:90px;background-color: rgba(231, 231, 231, 0.8);margin-bottom: 2px}
	.checkout-pay-goods-info .goods-info-pic{position:absolute;top:50%;transform:translateY(-50%);left:10px;width:80px;height:80px;}
	.checkout-pay-goods-info .goods-info-main{padding-top:5px;padding-left:96px;padding-right: 6px;color:#333;}

	.checkout-pay-goods-info .goods-title{overflow: hidden;padding-bottom: 2.3125rem}
	// .checkout-pay-goods-info .goods-price{font-size:12px;padding-top:3px;}

	.ui-select {position: relative;margin-right: 6px; float: right;}
	.ui-select select {height:22px;line-height:22px;-webkit-appearance: none;border: 0;background: 0 0;width: 100%;padding-right: 14px}
	.ui-select option { color: #333; }
	.ui-select:after {position: absolute;top: 50%;right: 0;margin-top: -4px;width: 0;height: 0;border-top: 6px solid;border-right: 5px solid transparent;border-left: 5px solid transparent;color: #a6a6a6;content: "";pointer-events: none}

	.m-user-addrList{position: fixed;top:0px;left:0;z-index:121;width:100%;height:100%;padding:10px;overflow-y:scroll;background-color: #fff;box-sizing:border-box;-webkit-box-sizing:border-box;}
	.m-user-addrList .item {margin-bottom: 0.2em;padding: 0.8em;background-color: #fff; border-bottom: 1px dashed #ccc;}
	.m-user-addrList .item .name,
	.m-user-addrList .item .mobile {display:inline;font-size:1em;color:#333;font-weight:normal;}
	.m-user-addrList .item .mobile {margin-left: 1em; }
	.m-user-addrList .item .mark {float: right;color: #ff0700; }
	.m-user-addrList .item address {padding: 0.2em 0;margin-bottom: 0.5em;color: #999; }
	.m-user-addrList .item .btn-default {float: left;width: 60%;border: none;background-color: #fff;text-align: left;}
	.m-user-addrList .item .btn-default .i-default {display: inline-block;width: 1.2em;height: 1.2em;margin-right: 0.5em;border: 2px solid #ccc;border-radius: 50%;vertical-align: middle;}
	.m-user-addrList .item .btn-default .i-default-checked {border-color: #ff0700;background: #ff0700;background-size: 1.2em auto; }
	.m-user-addrList .btns{width:100%;text-align: center; }
	.m-user-addrList .btns .w-button-normal {text-align:center;border: 1px solid #ef4842;border-radius: 3px;color: #fff;background-color: #ef4842;width:100%;display:block;margin:0 auto;padding:5px 0;}
	.m-user-addrList-bg{position: fixed;top:0;left:0;width:100%;height:100%;background-color:#000;opacity: 0.6;z-index:120;}
	.notShow{display: none;}


	input:-ms-input-placeholder{
	    color: #d4d4d4;
	    font-size: 13px;
	}

	input::-webkit-input-placeholder{
	    font-size: 13px;
	    color: #d4d4d4;
	}
	.w-bar {
	    display: block;
	    overflow: hidden;
	    position: relative;
	    padding: 0 14px;
	    line-height: 45px;
	    color: #333;
	    margin-bottom: -1px;
	    border: solid #eee;;
	    border-width: 1px 0;
	    background: #fff;
	    font-size: 13px;
	}
	.shop-bottom-btns {
	    position: fixed;
	    bottom: 0;
	    right: 0;
	    left: 0;
	    z-index: 100;
	    padding: 0.5em 0;
	    text-align: center;
	    color: #656565;
	    background-color: rgba(231, 231, 231, 0.8);
	    max-width: 750px;
    	margin: 0 auto;
	}
	.shop-sum-price {
	    float: left;
	    margin-left: 14px;
	    font-size: 16px;
	    line-height: 35px;
	}
	.shop-btn-quick-pay {
	    float: right;
	    height: auto;
	    font-size: 14px;
	    text-align: center;
	    text-decoration: none !important;
	    vertical-align: middle;
	    color: #fff;
	    background: #ff8820;
	    border-width: 0;
	    border-style: solid;
	    cursor: pointer;
	    outline: none;
	    display: inline-block;
	    white-space: nowrap;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    right: 0;
	    margin: 0;
	    line-height: 50px;
	    border-radius: 0;
	    width: 30%;
	    padding: 0;
	}
	.shop-sum-price .num {
	    font-size: 1.333334em;
	    color: #ff8820;
	}
	em {
    	font: inherit;
	}
	.weui-cell {
	  padding: 1px 0 10px;
	   
	}
	.weui-cell:before { 
	  border-top: none;    
	}
	.w-textarea{
		line-height: inherit;
	}

}
.vux-alert .weui-dialog__btn_primary{
    color: #ff8820; 
}
</style>
