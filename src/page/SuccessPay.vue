<template>
	<div id="content">
		<div class="header">
			<x-header :left-options="{showBack: false}">支付成功</x-header>
		</div>
		<div style="background-color: #fff;padding: 1rem 0 0 0;">
			<div class="top_pic">
				<img src="//c1.51jujibao.com/static/mkt/2018/01/moneyRedBag/S_bookPic.png" alt="" width="38%"style="vertical-align: middle;display:inline-block"/>
				<div class="top_title">
					亲，您的订单提交成功！<br>请耐心等待后台确认！
				</div>
			</div>
			<div class="btnAll">
				<router-link to="/orderList/0">
					<div class="btn">查看订单</div>
				</router-link>
				<router-link :to="'/index?merchantId='+merchantId">
				<div class="btn">返回首页</div>
				</router-link>
			</div>
			<!-- img3 //c1.51jujibao.com/static/mkt/2018/01/moneyRedBag/S_shopPic.png-->
			<!-- <img :src="img3" width="100%" style="display: block;"/> -->
			<!--<div style="background:url('//c1.51jujibao.com/static/mkt/2018/01/moneyRedBag/tb_tips.png')  center/ 100% 100% no-repeat;padding:1.0625rem 0 0.9375rem 7%;color:#fff;">
				<p style="font-size:.9375rem;padding-bottom:.5rem">商城购物通宝返利</p>
				<p style="font-size:.75rem">恭喜您获得{{tbReturn}}通宝的商城购物返利</p>
			</div>   -->

			<div style="background-color: #f2f2f2;padding: 10px 0;" v-show="choicenessList.length>0">
				<div class="lineAll">
					<div class="line"></div>
					<div>猜你喜欢</div>
					<div class="line"></div>
				</div>	
			</div>
			<div>
				<ul class="goodsAll">
					<li v-for="(item , index) in choicenessList" :key="index">
						<router-link :to="'/shop/detail/'+item.itemSku+'/'+merchantId" tag="div">
							<div style="width:90%;margin: 10px auto;position: relative;text-align: center;">
								<!-- <img :src="item.thumbImageUrl" alt="" width="70%" /> -->
								<div :style="'background:url('+item.thumbImageUrl+')  center/ 100% auto no-repeat;width:7.5rem;height:7.5rem;margin:0 auto;'"></div>	
								<!-- <div class="text_select">2色可选</div> -->
								<div style="text-align: center;font-size: 1rem;margin-top: 5px;">
									<p class="product">{{item.title}}</p>
									<p class="productName">{{item.subTitle}}</p>
								</div>
							</div>
						</router-link>
					</li>
				</ul>	
			</div>	
		</div>
	</div>
</template>

<script>
	import { Cell, CellBox, CellFormPreview, Group, XHeader, XImg, Sticky, Divider } from 'vux'
	import * as core from '@/core/api'
	export default {
	  components: {
	    Cell,
	    CellBox,
	    CellFormPreview,
	    Group,
	    XHeader,
	    XImg,
	    Sticky,
	    Divider
	  },
	  data() {
	  	return {
            merchantId : "",
	  		choicenessList: [],
	  		img1       : require('../assets/S_bookPic.png'),
	  		img2       : require('../assets/S_shopPic.png'),
	  		img3       : '../assets/tb_tips.png',
	  		returnOrderId   : 0,
	  		tbReturn: '',
	  	}	
	  },
	  created() {
	  	let _this = this
        let _merchantId = window.localStorage.getItem("merchantId")
        _this.merchantId = _merchantId
        
        let id = _this.$route.query.orderId
    	_this.returnOrderId = id;
        _this.getMoreGoodsDetail();
//      _this.getTbReturn();
	  },
	  methods: {
	  	getMoreGoodsDetail(){
	  	  	var _this = this;
	  	 	core.getGuessYouLike().then(data =>{
	  	 		_this.choicenessList = data;
	  	 	})
	  	},
	  	getTbReturn: function(){
	  		core.getTbReturn({
	  			"orderId": this.returnOrderId
	  		}).then(data =>{
	  			this.tbReturn = data.result;
	  		})
	  	}
	  }
	}		
</script>
 <style lang="less">
	body{background-color: #f2f2f2;}
	#content{
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}

		.top_pic{width: 92%;margin: 0 auto;}
		.top_title{ width: 60%; display: inline-block; font-size: 1rem; vertical-align: middle; line-height: 1.8rem; }
		.btnAll{width: 80%;margin:30px auto;display: flex;color: #fd965d;justify-content: space-between;}
		.btn{padding: 5px 30px;border: 1px solid #fd965d;border-radius: 3px;color: #fd965d;}
		.lineAll{width: 90%;margin: 0 auto;display: flex;justify-content: space-between;    align-items: center;}
		.line{width: 35%;height: 1px;background-color: #dfdfdf;justify-content:center; align-content: center;}
		.goodsAll{overflow: hidden;display: flex;justify-content: space-between; flex-wrap: wrap;    background-color: #f2f2f2;}
		
		.goodsAll li{width: 49.73555555555555555%;float: left;list-style: none;background-color: #fff; margin-bottom: 2px;}
		.goodsAll .text_select{    position: absolute; padding: 5px 1px; border: 1px solid #bbaf9c; border-radius: 3px; width: 0.9375rem; line-height: 0.976rem; text-align: center; top: 5%; left: 5%; font-size: 0.8rem; color: #bbaf9c;}
		.goodsAll .product{font-weight: 700;    overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;}
		.goodsAll .productName{text-align: center;font-size: 0.9rem;color: gray;}
	}
</style>