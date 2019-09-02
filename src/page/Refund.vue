<template>
    <div class="vux-refund-view">
        <div class="header">
        	<x-header :left-options="{backText: ''}">申请退款</x-header>
        </div>
        <div class="refund-status" v-show="orderStatus == 'only'">
           <selector ref="defaultValueRef" title="货物状态" :options="list" v-model="defaultValue"></selector>
        </div>
        <div class="refund-intro">
	        <span class="title">退款说明：</span>
	        <div class="text-info">

	       		<x-textarea class="text-main"  placeholder="请写明退款的原因" v-model="refundReason"></x-textarea>
	     		<!-- @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" -->

	        </div>
        </div>
        <div class="refund-count">
            <span class="title">退款金额：</span>
            <span class="refund-num">¥&nbsp;{{refundNum}}</span>
        </div>
        <div class="refund-up" v-show="defaultValue == 'Y'">
            <span class="upload-zm">上传凭证</span>
            <!-- 手写上传图片 -->
            <div class="up-pic" id="form_show_imgs">
                <ul class="imgs clearfix">
                  <!--  <li v-show="Imgloading" class="btn1" style="position:relative;">
                   		<spinner size="26px" type="lines" style="transform:translate(-50%,-50%);position:absolute;top:50%;left:50%"></spinner>
                   </li> -->
                  
                   <!-- <li class="btn btn1" v-for="(item , index) in ImgUrlArr" :key="index" :style="'background:url('+item+') center center / 100% auto no-repeat'"><input type="file" ref="uploaderFront" accept="image/*" @change="uploadIdFront" name="images"></li> -->
                   
                   <!-- <li v-show="canLoading" class="btn"><input type="file" ref="uploaderFront" accept="image/*" @change="uploadIdFront" name="images"></li> -->

                   <li class="btn btn1" :style="'background:url('+ImgNew+') center center / 100% auto no-repeat'">
                   	<input type="file" ref="uploaderFront" accept="image/*" @change="uploadIdFront" name="images">
                   	<spinner v-show="Imgloading" size="26px" type="lines" style="transform:translate(-50%,-50%);position:absolute;top:50%;left:50%"></spinner>
                   </li>
                   
                </ul>
            </div>

        </div>

        <div class="refund-submit">
            <div class="submit-btn" @click="refundSubmit('defaultValueRef')">提交</div>
        </div>

        <toast type="text" width="20em" v-model="isNull">要告诉我您的退款原因哦~</toast>

    </div>

</template>

<script>
import { Spinner , XHeader , XTextarea ,Selector , Toast } from 'vux'
import * as core from '@/core/api'

export default {
  components: {
  	Spinner,
    XHeader,
    XTextarea,
    Selector,
    Toast ,
  },
  data () {
    return {
      isNull:false,
      refundNum: '',
      orderId: '',
      orderStatus : '',	
      list: [{key: 'N', value: '未收到货'}, {key: 'Y', value: '已收到货'}],
      defaultValue: 'N',
      refundReason: '',

      Imgloading:false,
      ImgUrlArr:[],
      ImgNum:1,
      canLoading:true,
      ImgUrl: '',
      ImgNew: require('../assets/up-pic.png'),
      refundOnly: ''
    }
  },
  created() {
  	let id = this.$route.params.id
  	let amount = this.$route.params.amount
  	let status = this.$route.params.status
  	this.orderStatus = status;
  	this.refundNum = amount;
  	this.orderId = id;

  	if (status == 'all') {
      this.defaultValue = 'Y';
      this.refundOnly = "false"
  	}else if(status == 'only'){
  	   this.refundOnly = "true"
  	}
  },
  methods:{
  	refundSubmit (ref) { 
  		var _val = this.$refs[ref].getFullValue()[0].value;
  		var _msg = this.refundReason;
  		console.log(_val,_msg)
  		this.orderCancle();

    },
    uploadIdFront() {
      var _this = this;
      _this.ImgNew = ''
      _this.Imgloading = true;
      let formData = new window.FormData()
      formData.append('file', _this.$refs.uploaderFront.files[0])
      // if (_this.ImgUrlArr.length<3) {
	     //  core.uploadFile(formData).then(data => {
	     //  	_this.ImgUrl = data;
	     //    _this.ImgNum++;
	     //    // setTimeout(function () {
	     //    	_this.Imgloading = false
	     //    	_this.ImgUrlArr.unshift(data);
	     //    	if (_this.ImgUrlArr.length == 1) {
		    // 		_this.canLoading = false
		    // 	}
	     //    // },1000)
	     //  })
      // }
      core.uploadFile(formData).then(data => {
	      	_this.ImgUrl = data;
	      	setTimeout(function () {
                _this.Imgloading = false
        		_this.ImgNew = data
	      	},1000)  	
	      })

    },
    orderCancle: function(){//退款
  		let _this = this;
  		if (_this.refundReason.length == 0) {
            _this.isNull = true
  		}else{
	  		core.getOrderCancle({
	  			"orderId": _this.orderId,
	  			"itemStatus": _this.defaultValue,
	  			"reason": _this.refundReason,
	  			"imageUrl": _this.ImgUrl,
	  			"logisticsCompany": '',
	  			"expressId": '',
	  			"refundOnly": this.refundOnly
	  		}).then(data =>{  
	           if (data.code == '00') {
	              _this.$router.push('/submitSuccess/'+_this.orderId+'/'+_this.orderStatus) 
	           }
	  		})
  		}
  	},
   
  }
}
</script>

<style lang="less">
.vux-refund-view {
	.vux-header {
	  background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;

	}
	.refund-status{
		background-color: #fff;
		font-size: .875rem;
		border-bottom: 1px solid #e5e5e5;
		color: #6a6a6a;
	}
	.weui-select{
		color: #6a6a6a;
	}
	.refund-intro{
		position: relative;
		background-color: #fff;
		font-size: .875rem;
		padding-top: 1rem;
		padding-bottom: .5rem;
		border-bottom: 1px solid #e5e5e5;
	}
	.title{
		position: absolute;
		display: block;
		width: 5.375rem;
		text-align: right;
		top: 1rem;
		left: 0;
		color: #6a6a6a;
	}
	.text-info{
		padding-left: 5.375rem;
		padding-right: .625rem;
	}
	.weui-cell {
       padding: 0
	}
	input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
	 /* WebKit browsers */   
		color: #b2b2b2;   
		line-height: 1.125rem
	}   
	input:-moz-placeholder, textarea:-moz-placeholder {   
	/* Mozilla Firefox 4 to 18 */   
		color: #b2b2b2; 
		line-height: 1.125rem  
	}   
	input::-moz-placeholder, textarea::-moz-placeholder {   
	 /* Mozilla Firefox 19+ */   
		color: #b2b2b2;  
		line-height: 1.125rem 
	}   
	input:-ms-input-placeholder, textarea:-ms-input-placeholder {   
	 /* Internet Explorer 10+ */   
		color: #b2b2b2; 
		line-height: 1.125rem  
	}
	.weui-textarea {
	    padding-top: .125rem;
	}
	.refund-count{
		background-color: #fff;
		margin-top: .75rem;
		padding:.9375rem 0 .9375rem 1rem;
		font-size: .875rem;
		color: #6a6a6a;
		position: relative;
		border-bottom: 1px solid #e5e5e5;
	}
	.refund-num{
		color: #f54a00;
		padding-left: 4.375rem;
	}
	.refund-count .title{
		top: .9375rem;
	}
	.refund-up{
		background-color: #fff;
		margin-top: .75rem;
		border-bottom: 1px solid #e5e5e5;
		padding: 1rem 0 1rem 1.0625rem;
		font-size: .875rem;
		color: #6a6a6a;
	}
	.refund-up .upload-zm{
		margin-bottom: .625rem;
    	display: block;
	}
	// -----手写上传图片----
	.imgs .btn {
	    position: relative;
	    cursor: pointer;
	    // line-height: 4.8125rem;
	    color: #cacaca;
	    // border: 1px dashed #cccccc;
	    background: url(../assets/up-pic.png) no-repeat center;
	    background-size: 100%;
	}

	.imgs > li {
	    float: left;
	    width: 4.8125rem;
	    height: 4.8125rem;
	    overflow: hidden;
	    text-align: center;
	    margin-right: .75rem;
	}
	.imgs input[type="file"] {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 4.8125rem;
	    height: 4.8125rem;
	    opacity: 0;
	}
	.clearfix {
	    margin-top: 1.5rem;
	    display: block;
	    zoom: 1;
	    overflow: hidden;
	}
	.refund-submit{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding-bottom:  0.4375rem;
	}
	.submit-btn{
       background-color: #ff8820;
       color: #fff;
       text-align: center;
       line-height: 40px;
       width: 96%;
       margin: 0 auto;
       border-radius: 3px;
	}
    // ----Element UI 插件---------
	.el-upload-list--picture-card .el-upload-list__item {
	    width: 4.8125rem;
	    height: 4.8125rem;

	}
	 .el-upload--picture-card {
	    width: 4.8125rem;
	    height: 4.8125rem;
	    background: url(../assets/up-pic.png) no-repeat center;
	    background-size: 100%;
	    border: none;
	    border-radius: 0; 
	    line-height: 146px;
	    vertical-align: top;
	}
	.el-icon-plus:before {
	    // content: "\E62B";
	    content: none;
	}
	.el-upload--picture-card:hover, .el-upload:focus {
	    border-color: transparent; 
	}
		
}

</style>
