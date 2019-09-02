<template>
	<div id="submit">
		<div class="header">
			<x-header :left-options="{showBack: true}">提交成功</x-header>
		</div>
		<div class="success-icon">
			<img src="../assets/img/pictures/succBtn.png" width="13%"/>
		</div>

		<div style="text-align: center;line-height: 1.8rem;font-size: 1.1rem;" v-if="orderStatus == 'hasSend'">
			<p style="letter-spacing: 1px;">请等待后台对寄回商品审核</p>
			<p style="color: darkgray;font-size: 0.9rem;">若审核通过，退款将原路返回给您</p>
		</div>

		<div style="text-align: center;line-height: 1.8rem;font-size: 1.1rem;" v-else>
			<p style="letter-spacing: 1px;">请等待后台审核</p>
			<p v-show="orderStatus == 'only'" style="color: darkgray;font-size: 0.9rem;">若审核通过，退款将原路返回给您</p>
			<p v-show="orderStatus == 'all'" style="color: darkgray;font-size: 0.9rem;">若审核通过，客服会联系您，请将货物寄回</p>
		</div>

		<div class="footer">
			<router-link :to="'/orderDetail/'+orderId">
				<div class="footerIn">查看订单</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import {  XHeader } from 'vux'
export default {
components: {
    XHeader
  },
  data() {
  	return {
  		orderStatus:'',
  		orderId:'',
  	}
  },
  created() {
  	let id = this.$route.params.id
  	let status = this.$route.params.status
	this.orderId = id;
	this.orderStatus = status;
  }
}
	
</script>

<style lang="less">
	#submit{
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}
		.vux-header-back{display: none;}
		img { display: block; max-width: 100%; margin: auto; border: 0; }
		a{display: block;}
		.success-icon{padding: 50px 0 10px;}
		.footer{max-width: 750px;margin: 0 auto;position: fixed;bottom: 0;left: 0;right: 0;}
		.footerIn{margin: 5px;text-align: center;letter-spacing: 2px;line-height:2.2rem;color:#FFF;background-color: #ff8820;border-radius: 5px;}
	}
</style>