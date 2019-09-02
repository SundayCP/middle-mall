<template>
    <div class="vux-my-store-view">
	  <div class="mask" ref='mask'></div>
      <div class="header">
        <x-header :left-options="{showBack: false}">{{myStore}}</x-header>
      </div>
      <main>
      	<div v-if="merchantId > 0">
	        <div class="shopkeeper">
	             <div class="shopper-pic" :style="'background: #fff url('+logoText+') center center / cover no-repeat'"></div>
	             <div class="shopper-info">
	                 <p class="shopper-intro">{{summary}}</p>
	             </div>
	        </div>
	        <!-- 广告位 -->
	        <div class="ad-site">
	          <div class="ad-pic">
	              <swiper loop auto :list="bannerListText" ></swiper>
	          </div>
	        </div>
	        <!-- 三个模块 -->
	        <div class="channel">
                 <ul class="flex">
                    <li class="flex-item">
                    	<a href="javascript:void(0)" @click="companyIntro">
                    		<div class="health"> </div>
                    		<p>公司介绍</p>	
                    	</a>
                    </li>
                    <!--<li class="flex-item">
                    	<a href="/plas/mytb">
	                    	<div id="" class="myScore"> </div>
	                    	<p>我的积分</p>
                    	</a>
                    </li>-->
                    <li class="flex-item" >
                    	<a href="javascript:void(0)" @click="myOrderBtn">
	                    	<div id="" class="myOrder"> </div>
	                    	<p>我的订单</p>
                    	</a>
                    </li>
                 </ul>
	        </div>

	        <!--爆款热卖-->
	        <div style="background-color: #FFF;margin: 6px 0;">
	        	<h3 style="text-align: center;letter-spacing: 10px;padding: 15px 0;">爆款热卖</h3>
	        	<div>
					<div class="tab" ref="tab">
					  <ul class="tab_content" ref="tabWrapper">
					   <li class="tab_item" v-for="item in newList" ref="tabitem">
					   	 <router-link :to="'/shop/detail/'+item.itemSku+'/'+merchantId" tag="div">  
					     	<div :style="'background: url('+item.thumbImageUrl+') center center / 100% auto no-repeat;height: 150px;width: 150px;'">
					     	</div>
					     	<p style="text-align: center;">{{item.title}}</p>
					     	<p style="text-align: center;font-size:12px;color:#8a8a8a">{{item.subTitle}}</p>
							<p style="color: #e8732c;font-weight: 700;text-align: center;">￥{{item.salePrice}}</p>
						 </router-link>
					   </li>
					  </ul>
					</div>	
	        	</div>
	        </div>
	        
	        <!--为你推荐-->
	        <div style="background-color: #FFF;margin: 6px 0;">
	        	<h3 style="text-align: center;letter-spacing: 10px;padding: 15px 0;">为你推荐</h3>
	        	<div style="padding-bottom:.625rem">	
					<router-link :to="'/shop/detail/'+item.itemSku+'/'+merchantId" tag="div" v-for="(item , index) in recommendList" :key="index">  
					<!--<a v-for="(item , index) in recommendList" :key="index">-->
					<div class="tuijian">
						<div style="padding: 1rem 0;margin: 0px auto 0 0;;"><img :src="item.thumbImageUrl" style="width: 100px;"/></div>
						<div class="discrible">
							<p class="discrName">{{item.title}}</p>
							<p style="color: darkgray;font-size: 0.9rem;    line-height: 16px; margin: 2px 0 10px;">{{item.subTitle}}</p>
							<p style="color: #e8732c;font-weight: 700;font-size: 1.125rem;">￥ <span> {{item.salePrice}}</span></p>	
						</div>
					</div>
					<!--</a>-->
					</router-link>
				</div>
	        </div>
	    </div>
	    <div v-else style="text-align:center;padding-top:200px;border-top:1px solid #e5e5e5">你还没有开店哟~</div>
      </main>
      
      <!--弹窗登陆-->
		<div class="alert" ref='alert'>
			<div class="alertCon">
				<div class="closeBtn" style="font-size: 2rem;color: #999999;position: absolute;top: 0;right: 6%;" @click="closeBtn('none')">×</div>
				<div style="text-align: center;padding: 0 0 25px;font-size: 1.125rem;">登 &nbsp;录</div>
				<input type="text" name="" value="" class="input_phone" v-model="phoneNum" @focusin="promt()" ref="input" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" />
				<div style="width: 100%;display: flex; border: 1px solid lightgray; margin-bottom: 5px;border-radius: 3px;">
					<div style="width: 60%;">
						<input type="" name="" value="" class="input_lock" v-model="yanText" @focusin="promt()"/>	
					</div>
					<input type="button" name="" :value="getYanText"  class="get_yanCode" @click="getYanCode" ref="getCode"/>
				</div>
				<div class="" style="color: red;font-size: 0.8rem;">
					{{noticeMessage}}
				</div>
				<div style="text-align: center;margin-top: 15px; background-color: #ff8820;color: #FFF;line-height: 2.1rem;border-radius: 3px;" @click="submitLogin">登录</div>
			</div>			
		</div>
        
      <!-- <BottomBar v-show="isUser=='N'" :message="parentMsg"></BottomBar> -->
    </div>
</template>

<script>
import { XHeader,Tabbar, TabbarItem,Swiper,SwiperItem,AlertModule, Alert,Toast} from 'vux'
import * as core from '@/core/api' 
import BottomBar from '../components/BottomBar.vue'
import BScroll from 'better-scroll';
export default {
  components: {
    XHeader,
    Tabbar, 
    TabbarItem,
    BottomBar,
    Swiper,
    SwiperItem,
    AlertModule, 
    Alert,
    Toast
  },
  data () {
    return {
    	myStore: '',
       parentMsg  : 'xuan',  
       merchantId  : '',
       logoText   : window.CONFIG.userPic,
       bannerListText : [  ],
	   recommendList:[ ],
       newList    : [  ],
       phoneNum: '',
  	   yanText: '',
  	   getYanText: '获取验证码',
	   isLogin : window.CONFIG.isLogin,
	   summary : '',
	   noticeMessage: '',
	   
//	   后面的参数
	   code: ''
    }
  },
  created() {
    let _merchantId = this.$route.query.merchantId
    
    this.code = this.$route.query.code;
    
//  alert(_merchantId)
    this.merchantId = _merchantId;
  	if (window.localStorage) {
		localStorage.setItem("merchantId",JSON.stringify(_merchantId))
	}
    if (_merchantId > 0) {
      	 this.fetchServeData(); 
    }
    
	this.doShareFreind();
  },
  mounted(){
//	this.getMoreGoodsDetailLength();
//	this.InitTabScroll();
//	this.doShareFreind();
  },
  methods: {
    fetchServeData(){
	    this.getMoreGoodsAll();      
  	},
  	getMoreGoodsDetailLength(){   
	  	let _this = this;
	  	let len = _this.newList.length;
	  	console.log(len)
	  	if(len){
	  		let a = _this.$refs.slideBox;
	  		let b = len * 170 + 'px';
	  		_this.$refs.slideBox.style.width = b;
	  	}
	},
	InitTabScroll(){
     let width=0
     for (let i = 0; i <this.newList.length; i++) {
       width+=this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
     }
     this.$refs.tabWrapper.style.width=width+'px'
     this.$nextTick(()=>{
       if (!this.scroll) {
        this.scroll=new BScroll(this.$refs.tab, {
         startX:0,
         click:true,
         scrollX:true,
         scrollY:false,
         eventPassthrough:'vertical'
        });
       }else{
        this.scroll.refresh()
       }
     });
    },
   
	getMoreGoodsAll: function(){  //所有数据
		core.getMoreGoodsAll({
			'mechantId': this.merchantId,
			'flag': "N",
			'code': this.code
		}).then(data =>{
			if(data){
				this.bannerListText = data.homeBannerList.map(obj=>{
					return {
                    	'androidUrl': obj.androidUrl,
						'createTime': obj.createTime,
						'id': obj.id,
						'img': obj.img,
						'iosUrl': obj.iosUrl,
						'isShow': obj.isShow,
						'listOrder':obj.listOrder,
						'type': obj.type,
						'url': obj.url + '/' + this.merchantId,
                    }
					
				});			//头部轮播
				
				this.newList = data.activateItemList; 				//新品速递
				this.recommendList = data.commonItemList;			//为你推荐
			}
//			this.getMoreGoodsDetailLength();
//			this.InitTabScroll();
		 this.$nextTick(() => {
		     this.InitTabScroll();
		 });
			
		})
		core.getMyInfo({
			'merchantId': this.merchantId
		}).then(data =>{
			if(data){
				this.myStore = data.name ? data.name : "普艾";//店铺名字
				this.logoText = data.logo ? data.logo : window.CONFIG.userPic;//商户头像
				this.summary = data.summary ? data.summary : '该店主什么都没填~';//简介
				
				window.sessionStorage.setItem("shopName",this.myStore)
				
				setTimeout(()=>{
					this.doShareFreind();	
				},500)
			}
		})
	},
	
	myOrderBtn: function(){
	 	if(this.isLogin == 'true'){
//	 		window.location.href = '/plas/center/'+this.merchantId;
	 		this.$router.push('/center/'+this.merchantId);
	 	}else{
	 		this.closeBtn("block")
	 	}
	 	return false;
	},	
	companyIntro: function(){
		this.$router.push('/companyIntro');	
	},
	closeBtn: function(hh){
  	 	this.$refs.mask.style.display = hh;
  	 	this.$refs.alert.style.display = hh;	
  	},
  	 getYanCode: function(){
  	 	
  	 	if(!this.phoneNum){
//	 		sweetAlert("","请输入正确的手机号!","error")	
			this.noticeMessage = '请输入手机号！';
  	 		return;
  	 	}
	  	 	core.getYanCode({
	  	 		'phoneNum': this.phoneNum
	  	 	}).then(data =>{       
				if(data.code == '00'){
					let time_num = 60;
		  	 		let t = setInterval(()=>{
		  	 			if(time_num == 0){
		  	 				this.$refs.getCode.removeAttribute("disabled")
		  	 				this.$refs.getCode.value = '获取验证码';
		  	 				time_num = 60;
		  	 				clearInterval(t)
		  	 			}else{
							time_num--;
							this.$refs.getCode.setAttribute("disabled","true");
		  	 				this.$refs.getCode.value = time_num + 's重新发送';
		  	 			}
		  	 		},1000)	
				}else{
					this.noticeMessage = data.message;
					
				}
	  	 	})
	  	 },
	  	 
	  	 submitLogin: function(){
	  	 	
	  	 	if(!this.phoneNum){
	  	 		this.noticeMessage = '请输入手机号！';
	  	 		return;
	  	 	}
	  	 	if(!this.yanText){
	  	 		this.noticeMessage = '请输入验证码！';
	  	 		return;
	  	 	}
	  	 	
	  	 	core.getLogin({
	  	 		'phoneNum': this.phoneNum,
	  	 		'code': this.yanText,
	  	 		'id': this.merchantId
	  	 	}).then(data =>{
	  	 		if(data.code == "00"){
	  	 			this.isLogin = 'true';
	  	 			this.closeBtn('none')
	  	 			window.location.href = '/plas/center/'+this.merchantId;
	  	 		}else if(data.code == 'ERROR_USER_005'){
//	  	 			sweetAlert("",data.message,"error")
					this.noticeMessage = data.message;
	  	 		}
	  	 	})
	  	 },
	  	 promt: function(){
	  	 	this.noticeMessage = '';
	  	 },
	  	showModuleAuto (e) {
	      this.showModule(e)
	    },
	    
	    doShareFreind() {
	      let _this = this;
	      let _shareConfig = {
	        title: _this.myStore,
	        intro: _this.summary,
	        image: _this.logoText,
	        link : location.href + '',
//	        link : 'http://prev01.m.upreci-en.com/plas/shop/detail/'+_this.orderSku+'/'+_this.merchantId,
	        //price: _this.shopinfo.salePrice,
	        successCallFun: function (res) {
//              window.closeMc();
	        },
	        cancelCallFun: function (res) { 
//              window.closeMc();
	        },
	        failCallFun: function (res) { 
//              window.closeMc();
	        }
	      }
	      window.setShare(_shareConfig)
	      window.popupShare && window.popupShare(_shareConfig)
	    }
	}
}
</script>

<style lang="less">
.vux-my-store-view{
	
	.mask{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 1001;max-width: 750px;margin: 0 auto;display: none;}
	.vux-header {
	  background-color: #000;
      border-bottom: none;
	}
	main{
		margin-bottom: 1.6875rem;
	}
	.vux-header .vux-header-title {
	    color: #fff;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.shopkeeper{
		position: relative;
		// min-height: 4.375rem;
		background-color: #37363c;
	}
	.shopper-pic{
		width: 1.4375rem;
		height: 1.4375rem;
		border-radius: 50%;
		background-color: pink;
		// border: 2px solid #b9b9b9;
		position: absolute;
		top: 50%;
		transform:translateY(-50%);
		left: 1.625rem;
	}
	.shopper-info{
		// padding-left: 5.9375rem;
		padding: .8125rem 0 .8125rem 4.125rem
	}
	.shopper-title{
		font-size: .9375rem;
		color: #323232;
		padding-top: 0.3rem;
	}
	.shopper-intro{
		font-size: .8125rem;
		color: #e1e1e1;
	}
    .ad-site{
    	/*padding: 0.8125rem 0;*/
    	background-color: #f3f3f3;
    }
    .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img {
	    display: block;
	    width: 100%;
	    height: 100%;
	    background: center center no-repeat;
	    background-size: 100% 100%;
	}
	.vux-slider > .vux-swiper {
	    overflow: hidden;
	    position: relative;
	    padding-top: 40%!important;
	    height: 0!important;
	}
    .channel{padding: 10px 0;background-color: #FFF;}
    .flex{display: inline-flex;flex-direction: row;width: 100%;}
    .flex li{width: 50%;list-style: none;text-align: center;font-size: 0.875rem;}
    .flex li p{margin-top: 10px;color: #959595;}
    .health{background: url(../assets/img/pictures/health_new.png) no-repeat center center;background-size: contain;width: 30px;height: 25px;margin: 0 auto;}
    .myScore{background: url(../assets/img/pictures/myScore.png) no-repeat center center;background-size: contain;width: 30px;height: 25px;margin: 0 auto;}
    .myOrder{background: url(../assets/img/pictures/myOrder.png) no-repeat center center;background-size: contain;width: 30px;height: 25px;margin: 0 auto;}
    
    .tuijian{width: 90%;margin:15px auto;border: 0px solid lightgray;display: flex;justify-content: space-around;    align-items: center;}
	.discrible{font-size: 0.95rem;width: 65%;padding: 10px 0}
	.discrName{font-weight: 700;  overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;}
    .goQiang{padding: 3px 1.5rem;background-color: #ff8820;display: inline-block;color: #fff;border-radius: 3px;margin-top: 5px;}
    
    ._v-container[data-v-ecaca2b0]{
    	height: unset!important;
    }
   .tab{
	  	width: 100vw;
	  	overflow: hidden;
		padding:5px;
		max-width: 750px;
    	box-sizing: border-box;
		.tab_content{
		 	// line-height: 2rem;
		 	display: flex;
		.tab_item{
		  	flex: 0 0 60px;
	    	list-style: none;
	    	padding: 10px;
	    	box-sizing: border-box;
	   	} 
	  	}
	 }	
    
    
    img{width:100%;display: block;}
    .goods-item{position: relative;border-bottom: 1.25rem solid #f3f3f3;padding:.625rem 0 1.25rem 0}
    .item-title{padding-left: .6875rem;font-size: 1.0625rem;color: #1d1d1d}
    .item-subtitle{padding-left: .6875rem;font-size: .8125rem;color: #8f8f8f;}
    .item-price{padding-left: .6875rem;font-size: 1.1875rem;color: #e8732b;}
    .item-btn{font-size: .9375rem;color: #fff;width: 6.625rem;height: 2.0625rem;background-color: #ff8820;text-align: center ;line-height: 2.0625rem;border-radius: 3px;position: absolute;right: .6875rem;bottom: 1.25rem}
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
        color: #ff2c22;
    }
    .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
	    display: none;
	}
	
	
	.alert{position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 100%;z-index: 1002;max-width: 750px;margin: 0 auto; overflow: hidden; display: none;}
	.alert .alertCon{width: 60%;margin: 0 auto;background-color: #fff;border-radius: 5px;padding: 1rem 1.5625rem 1rem;position: relative;}
	.alert .input_phone{width: 100%;line-height:2rem;margin-bottom: 20px;border: 1px solid lightgray;    border-radius: 3px;background: url(../assets/img/pictures/pic_num.png) no-repeat;background-position: 5px;text-indent: 30px;background-size: contain;}
	.alert .input_lock{width: 100%;line-height:2rem;border: none;background: url(../assets/img/pictures/pic_lock.png) no-repeat;background-position: 5px;text-indent: 30px;background-size: contain;}
	/*.alert .get_yanCode{line-height: 2rem; background-color: #FFF; width: 40%; border: none; vertical-align: bottom;    border-left: 1px solid lightgray;}*/
	input[type="button"], input[type="password"], input[type="text"],input[type='number'] {
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	input[type="button"].get_yanCode{line-height: 2rem; background-color: #FFF; width: 40%; border: none; vertical-align: bottom;    border-left: 1px solid lightgray;}
}

</style>
