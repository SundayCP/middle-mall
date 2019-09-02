
<template>
<div id="backDetail">
	<div class="header">
		<x-header :left-options="{showBack: true}">退款详情</x-header>
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
				<router-link class="btn" :to="'/selectPay/'+orderId+'/'+orderAmount	" tag="div">重新申请</router-link>
				<router-link class="btn" style="background-color: #FFF;color: #fe8d03;" to="/services" tag="div">联系客服</router-link>
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


		<div class="item-content" v-for="(item , index) in orderList" :key="index">
            <div class="item-pic" :style="'background:url('+item.itemImageUrl+')  center/ 100% 100% no-repeat;'"></div>
            <div class="item-main">
                <div class="item-title">{{item.itemTitle}}</div>
                <div class="item-subtitle"></div>
                <div class="item-price">¥&nbsp;{{item.itemPrice}}</div>
                <div class="item-num">X{{item.itemNum}}</div>
            </div>
        </div>

		<div class="tuikuan_text">
			<div class="text">
				<div>退款金额：</div>
				<div style="font-size: 1rem;color: #f54a00;font-weight: 700;">￥{{orderAmount}}</div>
			</div>
			<div class="text" style="margin: 10px 0;">
				<div>申请时间</div>
				<div>{{refundCreatTime}}</div>
			</div>
			<div class="text" >
				<div>退款原因：</div>
				<div style="width: 76%;">{{reason}}</div>
			</div>
		</div>

</div>
</template>

<script>
	import {XHeader , dateFormat} from 'vux'
	import * as core from '@/core/api' 
	export default {
	components: {
	    XHeader
	  },
	  data() {
	  	return {
	  		orderStatus : 'AUDIT_FAIL',
	  		orderList :[],
	  		orderAmount:0,
	  		creatTime:'',
	  		refundCreatTime : '',
	  		orderId : 0	,
	  		reason : ''  		
	  	}
	  },
	  created() {
	 	let id = this.$route.params.id
	 	this.orderId = id
	  	this.fetchServeData(id);  	
	  },
	  methods: {
	  	fetchServeData(_id){
	  		let _this = this;
	  		_this.orderList = [];
	  		core.getOrderDetail({
	  			"orderId": _id
	  		}).then(data =>{		
                if (data.result) {
                	let itemResultArr = data.result.orderList;
                    let refundRecord  = data.result.refundRecord;

                    let _userAddress  = data.result.userAddress ? data.result.userAddress : {};
                	let _province     = _userAddress.province ? _userAddress.province : '';
                	let _city         = _userAddress.city ? _userAddress.city : '';
                	let _district 	  = _userAddress.district ? _userAddress.district : '';
                	let _street 	  = _userAddress.street ? _userAddress.street : '';
                	let _address 	  = _userAddress.address ? _userAddress.address : '';
                	
                	_this.receivePerson = data.result.deliveryPerson ? data.result.deliveryPerson : '';
                	_this.mobileNum 	= data.result.mobile ? data.result.mobile : '';
                	_this.receiveAddr   = _province + _city + _district + _street + _address;
                    _this.creatTime 	= dateFormat(new Date(data.result.createTime), 'YYYY-MM-DD  HH: mm')
                    _this.orderNum 		= data.result.id; 
                    
                    _this.buyerMessage  = data.result.message ? data.result.message : '';
                    _this.rmbPay 		= data.result.rmbPay;
                    _this.addrId 		= _userAddress.id;
                    _this.itemSku 		= data.result.itemSku;
                    _this.orderStatus   = data.result.status;
                    // _this.orderStatus   = 'AUDIT_OK';
                    _this.orderAmount = data.result.orderAmount;
                    _this.reason = refundRecord.reason;
                    _this.refundCreatTime 	= dateFormat(new Date(refundRecord.createTime), 'YYYY-MM-DD  HH: mm')

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
	  	
	  	
	  }
	}
	
</script>
<style lang="less">
	#backDetail{
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}
		.vux-header-back{display: none;}
	    
	    img { display: block; max-width: 100%; margin: auto; border: 0; }
		a{display: block;}
		.banner{background: linear-gradient(to right, #fe8d03 ,#ff5601);color: #FFFFFF;font-size: 0.8rem;padding: 25px 0;}
		.ding_text{font-size: 1.1rem;display: inline-block;width: 55%;text-align: center;letter-spacing: 2px;}
		.btn{border: 1px solid #FFFFFF;border-radius: 4px;padding: 0 5px;}
		.goods{border-top: 10px solid #FFF;border-bottom: 10px solid #FFF;padding: 10px 15px;display: table; width: 100%; box-sizing: border-box;}
		.goodsCon{width: 85%;}
		.goodsPic{display: table-cell;vertical-align: middle;width: 20%;}
		.goodsIntro{display: table-cell;vertical-align: middle;font-size: 0.8rem;width: 55%;padding-left: 15px;}
		.goodsIntroText{line-height: 1.5rem;    width: 80%;}
		.goodsIntroName{font-size: 14px;height: 1.6rem;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;}
		.tuikuan_text{padding: 10px 15px 15px 15px;background-color: #FFF;}
		.text{display: flex;justify-content: space-between;font-size: 0.8rem;line-height: 1.2rem;}
		.item-content{
				position: relative;
				border-top: 10px solid #fff;
				// margin-top: 10px
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
	}
</style>