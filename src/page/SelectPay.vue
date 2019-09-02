<template>
	<div id="selectPay">
		<div class="header">
			<x-header :left-options="{showBack: true}">选择类型</x-header>
		</div>
		<div class="tuikuan">
			<router-link :to="'/refund/'+orderId+'/'+totalAmount+'/'+statusOnly">
				<div class="left"><img src="../assets/img/pictures/tuikuan.png" alt="" width="50%"/></div>
				<div class="middle">
					<p style="margin-bottom: 5px;font-size: 0.85rem;color:#242424;">仅退款</p>
					<p style="color: darkgray;">未收到货（包含未签收），或客服协商同意前提下</p>
				</div>
				<div class="right">
					<img src="../assets/img/pictures/go-icon.png" width="30%"/>
				</div>
			</router-link>			
		</div>
		<div class="tuihuo">
			
			<router-link :to="'/refund/'+orderId+'/'+totalAmount+'/'+status">
				<div class="left"><img src="../assets/img/pictures/tuihuo.png" width="50%"/></div>
				<div class="middle">
					<p style="margin-bottom: 5px;font-size: 0.85rem;color:#242424;">退货退款</p>
					<p style="color: darkgray;">已收到货，需要退还已收到的货物</p>
				</div>
				<div class="right">
					<img src="../assets/img/pictures/go-icon.png" width="30%"/>
				</div>
			</router-link>
			
		</div>	
	</div>
</template>

<script>
		
import { XHeader } from 'vux'
export default {
	components: {
	    XHeader
    },
	data() {
	  	return {
	  		statusOnly:'only',
	  		status:'all',
	  		orderId: '',
	  		totalAmount: ''
	  	}
	},
	created() {
	  	let id = this.$route.params.id
	  	let amount = this.$route.params.amount
	  	this.orderId = id;
	  	this.totalAmount = amount;
	},
}	
</script>

<style lang="less">
	#selectPay{
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}
		.vux-header-back{display: none;}

		img { display: block; max-width: 100%; margin: auto; border: 0; }
		a{display: block;}
		.tuikuan,.tuihuo{background-color:#fff;width: 100%;padding: 20px 0;border-bottom: 1px solid #dddcdc; font-size: 0.75rem;}
		.tuikuan>a,.tuihuo>a{display: table; width: 100%;}
		.left{display: table-cell;vertical-align: middle;width: 15%;}
		.middle{display: table-cell;vertical-align: middle;width:76%;}
		.right{display: table-cell;vertical-align: middle;width: 9%;}
	}
</style>