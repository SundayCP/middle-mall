<template>
	<div id="applyRefund">
		<div class="header">
			<x-header :left-options="{showBack: true}">发票</x-header>
		</div>
		<div class="ticket_info">发票信息</div>
		<div class="ticket_detail">
				<span style="width:25%;display:inline-block;">抬头类型：</span>
				<span style="position:relative" @click="choose('company')">
				    <i class="check" :class="{checked : companyChecked}"></i>
					<span  style="display:inline-block;margin-left:1.6rem" > 企业抬头</span>
				</span>
				<span  style="position:relative;display:inline-block;margin-left:.5rem" @click="choose('person')">
					<i class="check" :class="{checked : !companyChecked}"></i>
					<span  style="display:inline-block;margin-left:1.6rem" > 个人/非企业单位</span>	
				</span>
			 <!-- <checklist title="抬头类型：" :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist> -->
			<div style="margin: 15px 0 0;" v-show="isCompany">
				<span style="vertical-align: middle;display: inline-block;width: 25%;" >企业税号：</span>
				<x-input type="text" class="input_ticket" novalidate :icon-type="iconType" :show-clear="false" @on-blur="onBlur1"></x-input>
			</div>
			<div style="margin: 15px 0 0;">
				<span style="vertical-align: middle;display: inline-block;width: 25%;" >发票抬头：</span>
				<x-input type="text" class="input_ticket" novalidate :icon-type="iconType" :show-clear="false" @on-blur="onBlur2"></x-input>
			</div>
			<div style="margin: 15px 0 0;">
				<span style="width:25%;display:inline-block;">发票金额：</span>
				<span style="color: #f54a00;">
					<span>{{orderSumMoney}}</span>元	
				</span>
			</div>
		</div>
		<div class="goods">
			<div style="padding:0 15px 15px;border-bottom: 1px solid lightgray;">收货地址</div>
			<div class="goodsinfo">
				<div class="icon">
					<img src="../assets/img/pictures/add-icon.png" width="50%"/>
				</div>
				<div class="information">
					<div class="information_name">
						<p>收货人: {{people}}</p>
						<p>{{phoneNum}}</p>	
					</div>
					<div style="line-height: 1.1rem;margin-top: 5px;">
						收货地址: {{address}}
					</div>
				</div>
			</div>
		</div>
		
		<div class="footer" v-on:click="SubmitInfo()"><div class="footerIn">提交</div></div>
		<cell @click.native="showModuleAuto"></cell>
	</div>
</template>

<script>
	import {  XHeader,Checklist,XInput,Cell,AlertModule, Alert } from 'vux'
	import * as core from '@/core/api'
	export default {
	components: {	   
	    XHeader,
	    Checklist,
	    XInput,
	    Cell, 
	    Alert	  
	  },
	  data() {
	  	return {
	  		orderIds:"",
	  		iconType :'',
	  		kind: "",
	  		invoice: "",
	  		companyNumber: '',
	  		ticketMoney:'985646.135',
	  		people:"",
	  		phoneNum:"",
	  		address:"",
	  		companyChecked:true,
	  		commonList: [ '企业抬头', '个人/非企业单位' ],
	  		radioValue: ['企业抬头'],
	  		orderSumMoney: 0,
	  		isCompany: true,
	  		userId: '',
	  	}
	  },
	  created() {
	  	let _idStr = this.$route.params.idStr; 
	  	let _amount = this.$route.params.amount; 
	  	this.orderIds = _idStr;
	  	this.orderSumMoney = _amount;
	  	this.fetchSeverData()	  	
	  },
	methods: {
	  	fetchSeverData(){
	  		let _this = this
	  		core.getSubmitDetail({	
	  		}).then(data =>{
	  			if (data.code && data.code == '00') {
                    let _result = data.result
                    _this.people = _result.name
                    _this.phoneNum = _result.phone
                    _this.address = _result.province + _result.city + _result.district + _result.street + _result.address
                    _this.userId = _result.userId
	  			}else{
	  				_this.showModuleAuto(data.message)
	  				
	  			}
	  		})
	  	},
	  	change (val) {
	      console.log('change:'+val)
	    },
	    choose(m){
		  	let _this = this
		  	_this.companyChecked = !_this.companyChecked
		  	_this.isCompany = !_this.isCompany
//		  	if(m == 'company'){
//		  		_this.invoiceKind = 'ENTERPRISE'
//		  	}else if(m == 'person'){
//		  		_this.invoiceKind = 'PERSONAL'
//		  	}
	  	},
	  	SubmitInfo(){
	  		let _this = this
	  		let _headType; 
	  		
	  		if (_this.companyChecked) {
                _headType = 'ENTERPRISE'
	  		}else{
	  			_headType = 'INVIDUAL'
	  		}
	  		
	  		if(_headType == 'ENTERPRISE'){
	  			if(!_this.companyNumber){
	  				_this.showModuleAuto('请输入企业税号！')
	  				return;
	  			}
	  			if(!_this.invoice){
	  				_this.showModuleAuto('请输入发票抬头！')
	  				return;
	  			}
	  			
	  		}
	  		if(_headType == 'INVIDUAL'){
	  			if(!_this.invoice){
	  				_this.showModuleAuto('请输入发票抬头！')
	  				return;
	  			}
	  		}
	  		core.getSubmitBtn({	
	  			userId : _this.userId,
                orderIds : _this.orderIds,
                headerType : _headType,
                taxId : _this.companyNumber,
                invoice: _this.invoice,
                realName : _this.people,
                mobile : _this.phoneNum,
                address : _this.address,
                orderSumMoney : _this.orderSumMoney,
	  		}).then(data =>{
	  			if (data.code && data.code == '00') {
//                 _this.showModuleAuto('提交成功！')
                   
                 	AlertModule.show({
			        	title: '',
			        	content: "提交成功",
			        	onShow () {
			          		console.log('Module: I\'m showing')
			        	},
			        	onHide () {
//			          		console.log('Module: I\'m hiding now')
							_this.$router.push('/invoice')
			        	}
			      })
	  			}else{
                   _this.showModuleAuto(data.message)
	  			}		
	  		})	
	  	},
	  	onBlur1 (val) {
      		console.log('on blur', val)
      		let _this = this;
      		_this.companyNumber = val;
      		
    	},
    	onBlur2 (val) {
      		console.log('on blur', val)
      		let _this = this;
      		_this.invoice = val;
      		
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
	}
}
		
</script>
<style lang="less">
	body{background-color: #f5f5f5;max-width: 750px;margin: 0 auto;}

	#applyRefund{
		img { display: block; max-width: 100%; margin: auto; border: 0; }
		input, select, button, textarea, table { margin: 0; font-family: inherit; font-size: 100%; }
		a{display: block;}
	
		.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;}
		.vux-header-title,.vux-header-back{color: #000;}
		.vux-header-back{display: none;}
		.ticket_info{padding: 15px;background-color: #FFF;border-bottom: 1px solid lightgray;font-weight: normal;font-size: 1rem;}
		.ticket_detail{padding: 15px;background-color: #FFF;color: #6a6a6a;font-size: 0.8rem;box-shadow: 0 1px 1px darkgray;}
		.input_ticket{vertical-align: middle;width: 73%; line-height: 2rem; border: none; background-color: #f3f3f3; border-radius: 3px;}
		
		.goods{padding: 15px 0 0;background-color: #FFF;margin-top: 10px;box-shadow: 0 1px 1px darkgray;}
		.goods .goodsinfo{background-color: #FFF;padding: 10px;color: #333333;display:table;box-sizing: border-box;width: 100%;}
		.icon{display: table-cell;vertical-align: middle;width: 10%;}
		.information{display: table-cell;vertical-align: middle;font-size: 0.8rem;color: gray;}
		.information_name{display: flex;justify-content: space-between;}
		
		.footer{max-width: 750px;margin: 0 auto;position: fixed;bottom: 0;left: 0;right: 0;}
		.footerIn{margin: 5px;text-align: center;letter-spacing: 2px;line-height:2.2rem;color:#FFF;background-color: #ff8820;border-radius: 5px;}
		.check {
		    width: 1.25rem;
		    height: 1.25rem;
		    background: url(//c1.51jujibao.com/static/mod/tbmall/1.0.0/img/ico_check.png) no-repeat center center;
		    background-size: 100% auto;
		    display: block;
		    position: absolute;
		    top: 50%;
		    left: 0;
		    margin-top: -0.625rem;
		}
		.checked{
			background: url(../assets/icon_checked.png) no-repeat center center;
	    	background-size: 100% auto;
		}
		.weui-cell {
	      padding: 0;
	      display: inline-block;
	    }
	    
   }
   .vux-alert .weui-dialog__btn_primary{
	    color: #ff8820; 
	}
</style>