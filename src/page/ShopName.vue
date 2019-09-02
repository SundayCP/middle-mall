<template>
	<div id="shopName">
		<div class="mask" ref='mask'></div>
		<div class="header">
			<x-header :left-options="{showBack: true}">商品详情</x-header>
		</div>
		<div>
	        <swiper loop auto  :min-moving-distance="100" :show-dots="true" dots-position="center"  :duration="500" :aspect-ratio="400/750">
              <swiper-item class="swiper-demo-img" v-for="(item, index) in swiperList" :key="index">
                <!--<img width="80%" :src="item.imageUrl">-->
                <div  :style="'background: #fff url('+item.imageUrl+') center center / 100% auto no-repeat;height: 25rem;width:100%;margin: 0 auto;background-size: contain;'"></div>
              </swiper-item>
            </swiper>
		</div>
		<div class="shop_intro">
			<p ><span style="font-weight: 700;">{{shopinfo.title}}</span><br><span style="color: darkgray;font-size: 0.8rem;">{{shopinfo.subTitle}}</span></p>
			<div style="margin-top: 10px;">
				<span style="color: #e8732c;font-weight: 700;font-size: 1.3rem;">￥ {{shopinfo.salePrice}} &nbsp;&nbsp;</span>
				<!--<div class="fan_logo"> 返 </div> &nbsp;&nbsp;<span style="font-size: 0.8rem;color: lightgray;">现金支付部分返利，最高{{tbRebate}}通宝</span>-->
			</div>
		</div>
		<div class="notice_section">
			<div>
				<div class="notice" style="margin-right: 5px;">正品授权</div>
				<!--<div class="notice">免运费</div>-->
				<span style="color: lightgray;font-size: 0.75rem;">本商品经过国家权威认证，假一赔三</span>	
			</div>
			<div style="margin-top: 5px;">
				<div class="notice" style="margin-right: 5px;">担保交易</div>
				<!--<div class="notice">免运费</div>-->
				<span style="color: lightgray;font-size: 0.75rem;">本商品支持7天无理由退货</span>	
			</div>
			
		</div>
		
		<!--新增的 部分-->
		<div @click="routerInto" class="notice_section" style="display: flex;flex-direction: row;justify-content: space-between;color: #000;padding: 0.5rem 1rem; ;align-items: center;margin: 8px 0; ">
			<div style="display: flex;flex-direction: row;align-items: center;">
				<!--<div style="background: #fff url(http://c1.51jujibao.com/images/default_user.png) center center / 100% auto no-repeat;height: 40px;width:40px;margin: 0 auto;background-size: cover;"> </div>-->
				<div  :style="'background: #fff url('+userLogo+') center center / 100% auto no-repeat;height: 40px;width:40px;margin: 0 auto;background-size: cover;'"></div>
				<div style="line-height: 25px;margin-left: 10px;font-size: 0.938rem;">{{userName}}</div>
			</div>
			<div style="line-height: 25px;font-size: 0.938rem;color: #999999;" >进入店铺 ></div>
		</div>
		<!--<div class="good_intro" >
			<div style="padding-bottom: 20px;"><div class="shopSwitch" v-for="(item,index) in items" :class="{'red':index == num}" @click="tab(index)">{{item}}</div></div>
			<div v-for="(itemCon,index) in tabContents" v-show="index == num">
				<div v-for="(itemIn,index) in itemCon">
              		<img :src=itemIn.imageUrl width="100%"/>	
              	</div>
			</div>
		</div>-->
		<div class="good_intro" >
			<div style="padding-bottom: 10px;"><div class="shopSwitch" v-for="(item,index) in items">{{item}}</div></div>
			<div v-for="(itemIn,index) in itemCon">
          		<img :src=itemIn.imageUrl width="100%"/>	
          	</div>
		</div>

		<!-- 底部 -->
		<div class="product-buy-bar" v-show="isApp != '1' && merchantId > 0">
			<div class="product-buy">
				<a href="javascript:void(0);" class="J-btn-kf btn-kf" @click="lookDenglu(1)"></a>  <!--  个人中心 -->
				<a href="javascript:void(0);" class="J-btn-kf btn-kefu" @click="lookDenglu(5)"></a>  <!-- 客服 -->
				<a href="javascript:void(0);" class="btn-cart" @click="lookDenglu(2)">
					<span v-if="cartNum>0" class="cart_num">{{cartNum}}</span></a>				<!-- 购物车 -->
				<a href="javascript:void(0);" data-issoldout="false" data-sku="" class="btn-add-cart" @click="lookDenglu(3)">加入购物车</a>
				<a href="javascript:void(0)" class="btn-buy" @click="lookDenglu(4)">立即购买</a>
			</div>
		</div>
		
		<!--弹窗登陆-->
		<div class="alert" ref='alert'>
			<div class="alertCon">
				<div class="closeBtn" style="font-size: 2rem;color: #999999;position: absolute;top: 0;right: 6%;" @click="closeBtn('none')">×</div>
				<div style="text-align: center;padding: 0 0 25px;font-size: 1.125rem;">确认手机号</div>
				<input type="text" name="" value="" class="input_phone" v-model="phoneNum"  @focusin="promt()" ref="input" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" />
				<div style="width: 100%;display: flex; border: 1px solid lightgray;margin-bottom: 2px; border-radius: 3px;">
					<div style="width: 60%;">
						<input type="" name="" value="" class="input_lock" v-model="yanText" @focusin="promt()"/>	
					</div>
					<input type="button" name="" :value="getYanText"  class="get_yanCode" @click="getYanCode" ref="getCode"/>
				</div>
				<div class="" style="color: red;font-size: 0.8rem;">
						{{noticeMessage}}
					</div>
				<div style="text-align: center;background-color: #ff8820;color: #FFF;margin-top: 10px;line-height: 2.1rem;border-radius: 3px;" @click="submitLogin">确认</div>
			</div>			
		</div>
		
		
		<toast v-model="showPositionValue" type="text" :time="800" width="10em" is-show-mask text="加入购物车成功！" :position="position"></toast>
		<toast v-model="showPositionValueError" type="text" :time="800" width="10em" is-show-mask text="加入购物车失败！" :position="position"></toast>
	</div>
</template>

<script>
	
	import { XHeader, Swiper, SwiperItem, TransferDom ,Cell,AlertModule, Alert,Toast} from 'vux'
	import * as core from '@/core/api'
	import store from '../store'
	import Vue from 'vue'
	import VueResouse from 'vue-resource'
	Vue.use(VueResouse)

	export default {
	directives: {
	    TransferDom
	  },
	components: {
	    XHeader,
	    Swiper,
	    SwiperItem,
	    TransferDom,
	    Cell,
	    AlertModule, 
	    Alert,
	    Toast
	  },
	  data() {
	  	return {
	  		merchantId: 0,
	  		swiperList:[],
	  		shopinfo:{},
			items:['商品介绍'],
//	  		tabContents:[],
			itemCon: [],
	  		num: 0,
	  		changeNum: 0,
	  		phoneNum: '',
	  		yanText: '',
	  		shopSku: '',
	  		getYanText: '获取验证码',
	  	    isApp : window.CONFIG.isApp,
	  	    orderSku : '',
	  	    hasItem : false,
	  	    cartNum : 0,
	  	    isLogin : false,
            tbRebate: '',
            noticeMessage: '',
            f: '',
            position: 'default',
            showPositionValue: false,
            showPositionValueError: false,
            
            // 后面的code
            code: '',
            
            // 用户信息
            userLogo: 'http://c1.51jujibao.com/static/mkt/2018/05/jule/img/defaultUser.png',
            userName: '店铺名称'
	  	}
	  },
	  created() {
	  	
	  	window.scrollTo(0, 0);
	  	
	  	let _sku = this.$route.params.sku
	  	let _mechantId = this.$route.params.mechantId
	  	this.orderSku = _sku
	  	
	  	this.code = this.$route.query.code;
	  	
	  	this.merchantId = Number(_mechantId)
	  	if (window.localStorage) {
			localStorage.setItem("merchantId",JSON.stringify(this.merchantId))
		}
	  	this.fetchServeData(_sku);
	  	this.fetchUserInfo();
	  	
		this.doShareFreind();
//	  	var t = setInterval(function(){
//	  		this.doShareFreind();
//	  	},1000)
//	  	
//	  	setTimeout(function(){
//	  		clearInterval(t)
//	  	},5000)
	  	
	  },
	  
	  mounted(){
//	  	this.doShareFreind();

	  },
	  
	  methods: {
	  	showPosition (position) {
	      this.position = position
	      this.showPositionValue = true
	    },
	    showPositionError (position) {
	      this.position = position
	      this.showPositionValueError = true
	    },
	    
	    // 增加的 进入店铺
	    routerInto:function(){
	    	//this.$router.push('/index?merchantId=' + this.merchantId);
	    	window.location.href = '/plas/index?merchantId=' + this.merchantId;
	    },
	  	
	  	 tab(index){
	  	 	this.num = index;
	  	 	this.changeNum = index;
	  	 },         
	  	 
	  	 // 新增的店铺名称和头像
	  	 fetchUserInfo: function(){
	  	 	core.getUserName({
	  	 		'merchantId': this.merchantId,
	  	 	}).then(data =>{
	  	 		this.userLogo = data.result.logo ? data.result.logo : 'http://c1.51jujibao.com/static/mkt/2018/05/jule/img/defaultUser.png';
	  	 		this.userName = data.result.name ? data.result.name : '普艾';
	  	 		window.sessionStorage.setItem("shopName",this.userName)
	  	 	})
	  	 },
	  	 
	  	 fetchServeData(_id){
	  	 	var _this = this;
	  	 	core.shopInfo({
	  	 		'activeId': _id,
	  	 		'merchantId': _this.merchantId,
	  	 		'code': this.code
	  	 	}).then(data =>{
	  	 		// alert(data)
	  	 		if(data.code == '00'){
	  	 			this.swiperList = data.result.item.infoImages;
	  	 			this.hasItem = data.result.hasItem;
	  	 			this.tbRebate = data.result.item.tbRebate;
//	  	 			this.cartNum = Number(data.result.cartItemNum);
	  	 			this.shopinfo = data.result.item;
//	  	 			this.tabContents[0] = data.result.item.detail1Images;
//	  	 			this.tabContents[1] = data.result.item.detail2Images;	
					this.itemCon = data.result.item.detailImages;
					
					this.isLogin = data.result.isLogin;
					
					this.getNum();
					
//					this.$nextTick(()=>{
					setTimeout(()=>{
						this.doShareFreind();	
					},500)
					
//					})
					
	  	 		}else{
	  	 			this.showModuleAuto(data.message);
	  	 		
	  	 		}
	  	 		
//	  	 		else if(data.code == 'redirect'){
//	  	 			// alert(data.result)
//	  	 			window.location.href = data.result;
//	  	 		}
	  	 		
//	  	 		alert(this.isLogin + 'new + isLogin')
	  	 	})
	  	 },
	  	 
	  	 getNum: function(){
			if(this.isLogin){
	  	 		core.getCartNum({
	  	 		
		  	 	}).then(data =>{
		  	 		if(data.code == "00"){
		  	 			this.cartNum = Number(data.result);
		  	 		}
		  	 	})
	  	 	}
	  	 },
	  	 
	  	 promt: function(){
	  	 	this.noticeMessage = '';
	  	 },
	  	 lookDenglu: function(num){
	  	 	
	  	 	//alert(this.isLogin + '123456')
	  	 	if(this.isLogin){
	  	 		if(num == 1){
//					window.location.href = '/plas/center/'+this.merchantId	 
					this.$router.push('/center/'+this.merchantId);
	  	 		}else if(num == 2){
//	  	 			window.location.href = '/plas/cart/'+this.merchantId
	  	 			this.$router.push('/cart/'+this.merchantId);
	  	 		}else if(num == 3){
	  	 			
	  	 			core.addGoodsCart({
	  	 				'itemSku': this.orderSku
	  	 			}).then(data =>{
	  	 				if(data.code == '00'){
	  	 					this.fetchServeData(this.orderSku)
	  	 					this.showPosition('middle')
	  	 				}else if(data.code == '01'){
							this.closeBtn("block")
	  	 				}else{
	  	 					this.showPositionError('middle')
	  	 				}
	  	 			})
	  	 		}else if(num == 4){
	  	 			window.location.href = '/plas/confirm?orderSku='+this.orderSku +'&merchantId='+this.merchantId;
	  	 		//	this.$router.push('/confirm?orderSku='+this.orderSku +'&merchantId='+this.merchantId);
	  	 		}else if(num == 5){
//	  	 			window.location.href = '/plas/RulePage'
	  	 			this.$router.push('/services');
	  	 		}
	  	 	}else{
	  	 		
	  	 		if(num == 1){
					this.f = num 			
	  	 		}else if(num == 2){
	  	 			this.f = num 
	  	 		}else if(num == 3){
	  	 			this.f = num
	  	 		}else if(num == 4){
	  	 			this.f = num
	  	 		}else if(num == 5){
	  	 			this.f = num
	  	 		}
	  	 		
	  	 		this.closeBtn("block")
	  	 	}
	  	 	return false;
	  	 },
	  	 
	  	 closeBtn: function(h){
	  	 	
	  	 	let b = document.getElementsByTagName("body")[0]
	  	 	console.log(b)
	  	 	if(h == 'block'){
	  	 		b.style.position = "fixed"
	  	 	}else if(h == 'none'){
	  	 		b.style.position = "relative"
	  	 	}
	  	 	this.$refs.mask.style.display = h;
	  	 	this.$refs.alert.style.display = h;	
	  	 },
	  	   	 
	  	 getYanCode: function(){
	  	 	
	  	 	if(!this.phoneNum){
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
				}else if(data.code == "ERROR_USER_003"){
//					this.showModuleAuto(data.message)
					this.noticeMessage = data.message;
				}else if(data.code == "error_style_mobile"){
//					this.showModuleAuto(data.message)
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
//	  	 			this.isLogin = 'true';
	  	 			this.closeBtn('none')
	  	 			console.log(this.f)
//	  	 			this.showModuleKind('登陆成功!',this.f)
	  	 			
	  	 			
	  	 			if(this.f == 1){
//		        		window.location.href = '/plas/center/'+this.merchantId
		        		this.$router.push('/center/'+this.merchantId);
		        	}else if(this.f == 2){
//		        		window.location.href = '/plas/cart/'+this.merchantId
		        		this.$router.push('/cart/'+this.merchantId);
		        	}else if(this.f == 3){ 
		        		core.addGoodsCart({
		  	 				'itemSku': this.orderSku
		  	 			}).then(data =>{
		  	 				if(data.code == '00'){
		  	 					this.fetchServeData(this.orderSku)
		  	 					this.showPosition('middle')
		  	 				}else{
		  	 					console.log(data.message)
		  	 					AlertModule.show({
							        title: '',
							        content: data.message,
							        onShow () {
							          console.log('Module: I\'m showing')
							        },
							        onHide () {
							          console.log('Module: I\'m hiding now')
							        }
							      })
	//	  	 					alert(data.message)
		  	 				}
		  	 			})
		        	}else if(this.f == 4){
		        		//window.location.href = '/plas/confirm/'+this.orderSku +'/'+this.merchantId;
		        		window.location.href = '/plas/confirm?orderSku='+this.orderSku +'&merchantId='+this.merchantId;
		        	//	this.$router.push('/confirm?orderSku='+this.orderSku +'&merchantId='+this.merchantId);
		        	}else if(this.f == 5){
//	  	 			    window.location.href = '/plas/RulePage'
						this.$router.push('/services');
	  	 		}
	  	 			
	  	 			
	  	 		}else if(data.code == 'ERROR_USER_005'){
//	  	 			this.showModuleAuto(data.message)
					this.noticeMessage = data.message;
	  	 		}
	  	 	})
	  	 },
	  	onHide () {
	      console.log('on hide')
	    },
	    onShow () {
	      console.log('on show')
	    },
    	showModuleKind (e,f) {
	      AlertModule.show({
	        title: '',
	        content: e,
	        onShow () {
	          console.log('Module: I\'m showing')
	        },
	        onHide () {
	        	console.log(f)
	        	if(f == 1){
	        		window.location.href = '/plas/center/'+this.merchantId
	        	}else if(f == 2){
	        		window.location.href = '/plas/cart/'+this.merchantId
	        	}else if(f == 3){ 
	        		core.addGoodsCart({
	  	 				'itemSku': this.orderSku
	  	 			}).then(data =>{
	  	 				if(data.code == '00'){
	  	 					this.fetchServeData(this.orderSku)
	  	 					this.showPosition('middle')
	  	 				}else{
	  	 					console.log(data.message)
	  	 					AlertModule.show({
						        title: '',
						        content: data.message,
						        onShow () {
						          console.log('Module: I\'m showing')
						        },
						        onHide () {
						          console.log('Module: I\'m hiding now')
						        }
						      })
//	  	 					alert(data.message)
	  	 				}
	  	 			})
	        	}else if(f == 4){
	        		window.location.href = '/plas/confirm/'+this.orderSku +'/'+this.merchantId;
	        	}
	          console.log('Module: I\'m hiding now')
	          // this.showModuleAuto('data.message')
	        }
	      })
	    },
	    showModuleAuto (e) {
	      this.showModule(e)
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
	    IsJingXuan (){
	    	if(!this.hasItem){

		  	 	this.$http.jsonp("//prev.plas-m.51jujibao.com/shop/item/select",{
			        params: {
			          merchantId:this.merchantId,
			          itemSku:this.orderSku,
			          d : (new Date().getTime() + Math.floor(Math.random() * 100))
			        },
		        }).then(function(res){
		        	if (res.data.code && res.data.code == "00") {
		        		this.fetchServeData(this.orderSku);
			        	this.showModuleAuto("精选成功~")
		        	}else{
			        	this.showModuleAuto(res.data.message)
		        	}
		        	
		        },function(res){
			        this.showModuleAuto("精选失败~")
			    });

		    }else{
		    	this.$http.jsonp("//prev.plas-m.51jujibao.com/shop/item/select/del",{
			        params: {
			          merchantId:this.merchantId,
			          itemSku:this.orderSku,
			          d : (new Date().getTime() + Math.floor(Math.random() * 100))
			        },
		        }).then(function(res){
		        	if (true) {
		        		this.fetchServeData(this.orderSku);
		        		this.showModuleAuto("取消精选成功~")
		        	}else{
                        this.showModuleAuto(res.data.message)
		        	}
			        
		        },function(res){
			        this.showModuleAuto("取消精选失败~")
			    });
		    }
	    },
	    doShareFreind() {
	      let _this = this;
	      let _shareConfig = {
	        title: _this.shopinfo.title,
	        intro: _this.shopinfo.subTitle,
	        image: _this.shopinfo.thumbImageUrl,
		    link : 'http://m.upreci-en.com/plas/shop/detail/'+_this.orderSku+'/'+_this.merchantId,
 //       link : 'http://prev01.m.upreci-en.com/plas/shop/detail/'+_this.orderSku+'/'+_this.merchantId,
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
	body{background-color: #dddddd;max-width: 750px;margin: 0 auto;}
	img { display: block; max-width: 100%; margin: auto; border: 0; }
	.mask{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 1001;max-width: 750px;margin: 0 auto;display: none;}
	#shopName{
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}
		.vux-header-back{display: none;}
		.vux-slider { overflow: hidden; position: relative; background-color: #fff;}
		.vux-slider > .vux-swiper { overflow: hidden; position: relative; width: unset!important; height: 25rem!important; margin: 0 auto;}
		.vux-slider > .vux-swiper > .vux-swiper-item { position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
	
		.shop_intro{margin-top:1px;padding:1rem ;text-align: left;background-color: #FFF;font-size: 1rem;}
		.fan_logo{width:17px;height:17px;line-height: 17px;font-size: 0.8rem; text-align: center;display:inline-block;background-color: #f19292;color: #FFF;border-radius: 1px;}
		.notice_section{margin-top: 1px;padding: 0.8rem 1rem;background-color: #fff;font-size: 0.5rem;color: #f19292;}
		.notice{display: inline;padding: 0 5px;border: 1px solid #f19292;border-radius: 3px;margin-right: 5px;}
		.good_intro{background-color: #fff;padding: 10px  0 3.571rem;}
		.shopSwitch{display: inline-block;width:100px;text-align: center;font-size: 1rem;font-weight: 700;margin-right: 10px;padding-bottom: 8px;}
		.red{border-bottom: 5px solid red;}
		
		
		
		.product-buy-bar{position:fixed;bottom:0;left:0;width:100%;height:3.3rem;color:#fff;line-height:3.3rem;z-index: 1000;overflow: hidden;}
		.product-buy{position:relative;margin:0 auto;height:3.571rem;max-width:750px;background:#fff;border-top: 1px solid #dedede;}
		.product-buy-bar a{display:block}
		.product-buy-bar a.btn-kf{width:15%;height:3.571rem;
			background: url('../assets/img/pictures/newPerson.png') no-repeat center center;background-size:2.5rem 2.5rem;text-indent:-999em;overflow:hidden;border-right:1px solid #dedede;position:absolute;top:0;left:0}
		.product-buy-bar a.btn-kefu{width:15%;height:3.571rem;
			background: url('../assets/img/pictures/newKefu02.png') no-repeat center center;background-size:2.5rem 2.5rem;text-indent:-999em;overflow:hidden;border-right:1px solid #dedede;position:absolute;top:0;left:15%}
		.product-buy-bar a.btn-cart {width:15%;height:3.571rem;background:url('../assets/img/pictures/newShopCar.png') no-repeat center center;background-size:2.5rem 2.5rem;overflow:hidden;position:absolute;top:0;left:30%}
		.product-buy-bar a.btn-add-cart{position:absolute;top:-1px;right:27.5%;width:27.5%;height:3.571rem;color:#fff;text-align:center;font-size:1rem;    background: linear-gradient(to right, #fdbe00 ,#fc9b00);}
		.product-buy-bar a.btn-buy{position:absolute;top:-1px;right:0;width:27.5%;height:3.571rem;color:#fff;text-align:center;font-size:1rem;   background: linear-gradient(to right, #ff861f ,#fe5701);}
		.product-buy-bar span.btn-soldout{position:absolute;top:0;right:0;display:block;width:68%;height:3.571rem;background:#999;color:#fff;text-align:center;font-size:1rem}
		.product-buy-bar a.btn-purchase{position:absolute;top:0;right:0;display:block;width:68%;height:3.571rem;background:#eb2f2b;color:#fff;text-align:center;font-size:1rem}
		
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
	
		.bot-item{width: 50%;float: left; color: #fff;text-align: center;font-size: 1rem}
		.bot-left{background-color: #54adff}
		.bot-right{background-color: #0084ff}
		.cart_num{
			    position: absolute;
			    top: 0.4rem;
			    left: 55%;
			    width: 1rem;
			    height: 1rem;
			    background-color: #ff5331;
			    color: #fff;
			    border-radius: 50%;
			    font-size: .625rem;
			    line-height: 1rem;
			    text-align: center;
		}
	}
	.vux-alert .weui-dialog__btn_primary{color: #ff8820;}
	
</style>