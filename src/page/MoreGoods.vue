
<template>
	<div id="moreGoods">
		<div id="" class="head">
			更多好货
			<router-link to="/cart" tag="div" class="shopCar"><img src="../assets/img/pictures/M_shopCar.png" width="60%" style="vertical-align: middle;"/>
            <span v-if="cartNum>0" class="cart_num">{{cartNum}}</span>
			</router-link>
		</div>

		<div class="banner">
			<swiper loop  :list="bannerList" ></swiper>
		</div>

		<div v-show="newList.length > 0">
			<div class="title_one">
				<span>新品速递</span>
				<span class="more_text">
					<router-link to="/new">更多</router-link>
				</span>
			</div>

			<div style="background-color: #fff">
	            <scroller lock-y :scrollbar-x = 'false' >
			      <div class="box1">
			        <div class="box1-item" v-for="(item , index) in newList" :key="index">
                        <router-link :to="'/shop/detail/'+item.itemSku+'/'+merchantId+'/'+isUser" tag="div">  
		            		<img :src="item.thumbImageUrl" width="80%" />	
		            		<p>{{item.title}}</p>
		            		<span style="color: #e8732c;font-weight: 700;">￥{{item.salePrice}}</span>
		            	</router-link>
			        </div>
			      </div>
			    </scroller>
			</div>
		</div>

		<div v-show="recommendList.length > 0" style="background-color: #fff">
			<div class="title_two" style="padding-bottom:.625rem"><span>为你推荐</span></div>
			<div style="padding-bottom:.625rem">	
				<router-link :to="'/shop/detail/'+item.itemSku+'/'+merchantId+'/'+isUser" tag="div" v-for="(item , index) in recommendList" :key="index">  
				<div class="tuijian">
					<div style="width: 40%;padding: 1rem 0;"><img :src="item.thumbImageUrl" width="80%"/></div>
					<div class="discrible">
						<p class="discrName">{{item.title}}</p>
						<p style="color: darkgray;font-size: 0.9rem;">{{item.subTitle}}</p>
						<p style="color: #e8732c;font-weight: 700;font-size: 1.125rem;">￥ <span> {{item.salePrice}}</span></p>
						<div class="goQiang">
							马上抢
						</div>
					</div>
				</div>
				</router-link>
			</div>
		</div>

		<div class="load-more" v-show="choicenessList.length > 0">
			<div class="title_two"><span>精选好货</span></div>
			<div >
				<ul class="goodsAll">
					<li v-for="(item , index) in choicenessList" :key="index">
						<router-link :to="'/shop/detail/'+item.itemSku+'/'+merchantId+'/'+isUser" tag="div"> 
						<div style="width:90%;margin: 10px auto;position: relative;text-align: center;">
							<!-- <img :src="item.thumbImageUrl" alt="" width="70%" />	 -->
							<div class="item-pic" :style="'background:url('+item.thumbImageUrl+')  center/ 200px auto no-repeat;height:193px'"></div>
							<!-- <div class="text_select">2色可选</div> -->
							<div style="text-align: center;font-size: 1rem;margin-top: 5px;">
								<p class="product">{{item.title}}</p>
								<p style="color: #e8732c;font-weight: 700;">￥ <span>{{item.salePrice}}</span></p>
								<div class="goQiang-two">马上抢</div>
							</div>
						</div>
						</router-link>
					</li>
				</ul>
			</div>			
		</div>

		<BottomBar :message="parentMsg"></BottomBar>
	</div>
</template>

<script>
import {XHeader,Swiper,SwiperItem,Scroller } from "vux"
import * as core from '@/core/api' 
import BottomBar from '../components/BottomBar.vue'

export default {
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    BottomBar,
    Scroller
  },
  data() {
  	return {
  		parentMsg     : 'more',  //在data中定义需要传入的值
  		bannerList    : [],
  		newList       : [],
  		recommendList : [],
  		choicenessList: [],
  		merchantId    : 0,
  		cartNum :  0,
  		isUser     : 'N' 
  	}
  	
  },
  created() {
    let _merchantId = window.localStorage.getItem("merchantId")
    let _isUser = window.localStorage.getItem("isUser")
    //console.log(_isUser)
    this.merchantId = _merchantId
    this.isUser = _isUser
  	this.fetchServeData();
  },
  methods: {
	  fetchServeData(){
	    this.getMoreGoodsBanner();    
	    this.getMoreGoodsDetail('0');    
	    this.getMoreGoodsDetail('1');    
	    this.getMoreGoodsDetail('2'); 
	    this.getCartNum()   
	  },
  	  getMoreGoodsBanner(){
  	  	var _this = this;
  	 	core.getMoreGoodsBanner({
  	 		ownType: 'ITEM_SOURCE'
  	 	}).then(data =>{
  	 		_this.bannerList = data.map(item=> ({
			  url: item.url,
			  img: item.img,
			  // fallbackImg: item.fallbackImg,
			  // title: `(可点击)`
			}));
  	 	})
  	  },
  	  getMoreGoodsDetail(e){
  	  	var _this = this;
  	 	core.getMoreGoodsDetail({
  	 		type : e
  	 	}).then(data =>{
  	 		if (data &&  e == "0") {
  	 		  if (data.length > 6) {
  	 		  	_this.newList = data.slice(0,6); 
  	 		  }else{
                _this.newList = data;
  	 		  }	 			
  	 		}else if(e == "1"){
              _this.recommendList = data;
  	 		}else if (e == "2") {
 			  _this.choicenessList = data;
  	 		}
  	 	})
  	  },
  	  getCartNum(){
  	  	var _this = this;
  	 	core.moreCarNum({
  	 	}).then(data =>{
  	 		if (data.result) {
  	 			_this.cartNum = Number(data.result)
  	 		}
  	 	})
  	  }
  }
}
</script>

<style lang="less">

#moreGoods{
	max-width: 750px;margin: 0 auto;background-color: #f4f4f4;
	.vux-swiper-item,.swiper-demo-img{background-color: #FFF;}
	img { display: block; max-width: 100%; margin: auto; border: 0; }
	.head{text-align: center;overflow: hidden;padding: 10px; background-color: #fff;font-size: 1.1rem;position: relative;}
	.shopCar{position: absolute; top: 50%; right: 3%; transform: translateY(-50%);}
	.title_one{width: 100%;text-align: center;position: relative;font-size: 1.2rem;font-weight: 700;letter-spacing: 12px;    padding: 25px 0; background-color: #fff; margin-top: 10px;}
	.title_two{width: 100%;text-align: center;position: relative;font-size: 1.2rem;font-weight: 700;letter-spacing: 12px;padding: 20px 0; background-color: #fff; margin-top: 10px;}
	.more_text{position: absolute;top: 50%;right: 3%;transform: translateY(-50%);font-size: 0.8rem;border-bottom: 1px solid darkgray;letter-spacing: 3px;}
	.more_text a{color: darkgray;text-align: center;}
	.tuijian{width: 90%;margin:10px auto;border: 1px solid lightgray;display: flex;justify-content: space-around;    align-items: center;}
	.discrible{font-size: 0.95rem;width: 48%;padding: 10px 0}
	.discrName{font-weight: 700;  overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;}
	.goodsAll{margin-top: 1px;overflow: hidden;display: flex;justify-content: space-between; flex-wrap: wrap;background-color: #fff}
	.goodsAll li{width: 49.73555555555555555%;float: left;list-style: none;background-color: #fff; margin-bottom: 2px;border-right: 1px solid #f4f4f4;box-sizing: border-box;border-bottom:1px solid #f4f4f4}
	.goodsAll .text_select{    position: absolute; padding: 5px 1px; border: 1px solid #bbaf9c; border-radius: 3px; width: 0.9375rem; line-height: 0.976rem; text-align: center; top: 5%; left: 5%; font-size: 0.8rem; color: #bbaf9c;}
	.goodsAll .product{font-weight: 700;    overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;}
	.goQiang{padding: 3px 1.5rem;background-color: #ff8820;display: inline-block;color: #fff;border-radius: 3px;margin-top: 5px;}
	.goQiang-two{padding: 3px 40px;background-color: #ff8820;display: inline-block;color: #fff;border-radius: 5px;margin: 5px 0 10px;}
	.load-more{margin-bottom: 54px;}
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {color: #ff2c22;}

	.box1 {
	  height: 100px;
	  position: relative;
	  width: 1100px;
	  padding: 0 15px;
	}
	.box1-item {
	  width: 170px;
	  background-color: #fff;
	  display:inline-block;
	  margin-left: 15px;
	  float: left;
	  text-align: center;
	  // line-height: 100px;
	}
	.box1-item:first-child {
	  margin-left: 0;
	}
	.box1-item p{
		 text-align: center;
		 line-height: 22px;
		 padding: 5px 0;
		 font-size: 13px;
		 color: #3a3a3a
	}
	.box1-item span{
		 text-align: center;
		 line-height: 22px;
		 display: inline-block;
		 padding-bottom: 20px 
	}
	.cart_num{
		position: absolute;
		top: -7px;
		right: 0;
		width: 1.125rem;
		height: 1.125rem;
		background-color: #ff5331;
		color: #fff;
		border-radius: 50%;
		font-size: .625rem;
		line-height: 1rem;
		text-align: center;
	}
	.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
	    display: none;
	}
	
}
</style>