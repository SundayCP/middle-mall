<template>
	<div id="entryOrder">
		<div class="header">
			<x-header :left-options="{showBack: true}">填写单号</x-header>
		</div>
		<div class="info">
			<div class="info_company">填写物流公司</div>
			<div style=""><input type="text" name="" v-model="company"  value="" class="info_input" /></div>	
		</div>	
		<div class="info">
			<div class="info_company">填写订单号</div>
			<div><input type="text" name=""  v-model="orderNum" value="" class="info_input" /></div>
		</div>		
		<div class="footer">
			<div class="footerIn" @click="submitOrder">提交</div>	
		</div>
		
	</div>
</template>

<script>
	import {  XHeader } from 'vux'
	import * as core from '@/core/api'
	export default {
	components: {
	    XHeader
	  },
	  data() {
	  	return {
	  		company: '',
	  		orderNum: '',
	  		orderId : '',
	  		orderStatus:'hasSend'	
	  	}
	  },
	  created() {
	  	let id = this.$route.params.id
	  	this.orderId = id;
	  },
	  methods: {
	  	submitOrder: function(){
			let _this = this;
	  		core.getOrderCancle({
	  			"orderId": _this.orderId,
	  			"itemStatus": '',
	  			"reason": '',
	  			"imageUrl": '',
	  			"logisticsCompany": _this.company,
	  			"expressId": _this.orderNum
	  		}).then(data =>{  
               if (data.code == '00') {
                  this.$router.push('/submitSuccess/'+_this.orderId+'/'+_this.orderStatus) 
               }
	  		})
	  	}	
	  }
	}
	
</script>

<style lang="less">
	#entryOrder{
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}
		.vux-header-back{display: none;}
	    
	    img { display: block; max-width: 100%; margin: auto; border: 0; }
		input, select, button, textarea, table { margin: 0; font-family: inherit; font-size: 100%; }
		a{display: block;}
		.info{margin: 15px 0 0;}
		.info_company{margin: 0 20px 10px;color: #6a6a6a;font-size: 0.9rem;}
		.info_input{width: 100%;border: none;height: 3rem;color: #f54a00;font-size: 1rem;    text-indent: 20px;}
		.footer{max-width: 750px;margin: 0 auto;position: fixed;bottom: 0;left: 0;right: 0;}
		.footerIn{margin: 5px;text-align: center;letter-spacing: 2px;line-height:2.2rem;color:#FFF;background-color: #ff8820;border-radius: 5px;}
	}
</style>