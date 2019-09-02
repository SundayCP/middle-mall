<template>
	<div class="refund-new-page">
		<div class="header">
        	<x-header :left-options="{backText: ''}">申请退款</x-header>
        </div>
		<div class="">
			<p style="width: 90%;margin: 20px auto;color: #7c7c7c;">请选择退款理由：</p>
			<div id="" style="width: 95%;background-color: #FFF;margin: 0 auto;">
				
				<div class="reason"  @click="selectKind('1')">
					<p>未按约定时间发货</p>
					<div class="rightImg" :class="{on : selected_one}"></div>
				</div>
				<div id="" class="reason"  @click="selectKind('2')">
					<p>操作失误（商品/地址选错）</p>
					<div class="rightImg" :class="{on : selected_two}"></div>
				</div>
				<div id="" class="reason"  @click="selectKind('3')">
					<p>重复下单</p>
					<div class="rightImg" :class="{on : selected_three}"></div>
				</div>
				<div id="" class="reason" @click="selectKind('4')">
					<p>其它</p>
					<div class="rightImg" :class="{on : selected_four}"></div>
				</div>
			</div>
		</div>
		<div id="" style="width: 100%;padding-top: 55%;">
			<div id="" class="btn">
				<a href="javascript:void(0)" class="btn-in" @click="backBtn" >
					<!--<router-link  class="btn-in" :to="'/orderDetail/'+orderId" tag="div">-->
						<div   style="background: #ff8820;padding: 8px 0;border-radius: 3px;">
							再想想
						</div>	
					<!--</router-link>-->
				</a>
				
				<div class="btn-in" style="background: #c4c4c4;padding: 8px 0;" @click="submit">
					提交
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
import { Spinner , XHeader , XTextarea ,Selector , Toast, AlertModule, Alert } from 'vux'
import * as core from '@/core/api'

export default {
  components: {
  	Spinner,
    XHeader,
    XTextarea,
    Selector,
    Toast ,
    AlertModule, 
    Alert
  },
  data () {
    return {
      selected_one: false,
      selected_two: false,
      selected_three: false,
      selected_four: false,
      
      select_cont : '',
      orderId : '',
      isApp: window.CONFIG.isApp,
      backLink: '',
    }
  },
  created() {
  	
  	let _id = this.$route.params.id;
  	this.orderId = _id;
  
  },
  methods:{
  	selectKind: function(num){
  		if(num == 1){
  			this.selected_one = true;
  			this.selected_two = false;
  			this.selected_three = false;
  			this.selected_four = false;
  			this.select_cont = "未按约定时间发货"
  			
  		}else if(num ==2){
  			this.selected_one = false;
  			this.selected_two = true;
  			this.selected_three = false;
  			this.selected_four = false;
  			this.select_cont = "操作失误（商品/地址选错）"
  		}else if(num == 3){
  			this.selected_one = false;
  			this.selected_two = false;
  			this.selected_three = true;
  			this.selected_four = false;
  			this.select_cont = "重复下单"
  		}else if(num == 4){
  			this.selected_one = false;
  			this.selected_two = false;
  			this.selected_three = false;
  			this.selected_four = true;
  			this.select_cont = "其它"
  		}
  		
  	},
  	backPageBtn: function(){
//		this.backLink = 'http://prev01.m.upreci-en.com/plas/orderDetail/'+ this.orderId;		
		this.backLink = 'http://m.upreci-en.com/plas/orderDetail/'+ this.orderId;
  		let btnCouponJson = {
			"txt" : "", //显示文本
			"icon" : "", //显示图标
			"callbackLink" : this.backLink, //跳转地址
			"callbackFun": '' //执行方法
		};
		let btnCoupon = JSON.stringify(btnCouponJson);
		jujibao.nativeGoBack(btnCoupon);
  		
  	},
  	backBtn: function(){
  		if(this.isApp == '1'){
  			this.backPageBtn()
  		}else{
  			this.$router.push('/orderDetail/'+this.orderId)	
  		}
  		
  	},
  	
  	submit: function(){
  		console.log(this.select_cont)
  		
  		if(!this.select_cont){
//			sweetAlert("","请选择退款理由！","error")
			this.showModule("请选择退款理由！")			
  			return;
  		}else{
			core.applyRefundNew({
	  	 		'orderId': this.orderId,
	  	 		'reason': this.select_cont
	  	 	}).then(data =>{
	  	 		if(data.code == "00"){
	  	 			
	  	 			location.href = '/plas/submitSuccess/'+ this.orderId + '/only'
	  	 		}else{
	  	 			this.showModule(data.message)	
	  	 		}
	  	 	})
  		}
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
  }
}
</script>

<style lang="less">
.refund-new-page{
	.vux-header {
	  background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;

	}
	
	.reason{padding: 15px;border-bottom: 2px solid #f5f5f5;color: #474747;font-weight: normal;width: 100%;display: inline-flex;flex-direction: row;justify-content: space-between;box-sizing: border-box;}
	.rightImg.on{background: url(../assets/img/pictures/rightImg.png) no-repeat center/contain;width: 20px;}
	
	.btn{width: 100%;display: inline-flex;flex-direction: row;justify-content: space-around;}
	.btn-in{width: 40%;text-align: center;color: #FFF;border-radius: 3px;}
}
	
	


</style>