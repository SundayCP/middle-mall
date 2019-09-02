<template>
    <div class="vux-add-demo">
    	 <div class="header" v-if="addrId">
	        <x-header :left-options="{backText: ''}">编辑地址</x-header>
        </div>
      	<div class="header" v-else>
	        <x-header :left-options="{backText: ''}">新增地址</x-header>
        </div>
        
        <div class="m-user-bar">
          <div id="matter">
            <div class="w-inputBar w-bar">
              <label for="i_realname" class="w-bar-label">收货人</label>
              <div class="w-bar-control dark">
                <input class="w-bar-input" style="text-align: right" type="text" placeholder="姓名" name="realname" id="i_realname" value="" v-model="editAddr.name">
              </div>
            </div>

            <div class="w-inputBar w-bar">
              <label for="i_mobile" class="w-bar-label">手机号</label>
              <div class="w-bar-control">
                <input class="w-bar-input" type="text" name="mobile" id="i_mobile" value=""  v-model="editAddr.tel" placeholder="手机号" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" style="text-align: right"/>
              </div>
            </div>


            <div class="w-inputBar w-bar">
              <label for="provinceId" class="w-bar-label">所在地区</label>
              <div class="w-bar-control">
                <group>
			      <x-address @on-hide="logHide" @on-show="logShow"  :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址"  :show.sync="showAddress"></x-address>
			    </group>
              </div>
            </div>

            <!--<div class="w-inputBar w-bar">
              <label for="cityId" class="w-bar-label">街道</label>
              <div class="w-bar-control" style="color: darkgray;">
              		<input type="" name="" id="cityId" value="" v-model="editAddr.street" style="border: none;text-align: right;width: 100%;line-height: 45px;outline: none;" placeholder="填写街道"/>
              </div>
            </div>-->

            <div class="w-inputBar w-bar">
              <label class="w-bar-label">详细地址</label>
              <div class="w-bar-control">
                <textarea name="address" class="w-bar-input addrDetail" v-model="editAddr.address" placeholder="请输入详细地址"></textarea>
              </div>
            </div>
          </div>
         

          <group>
            <x-switch class="default"  style="font-size: 1rem;padding: 10px;" title="设为默认地址" prevent-default v-model="value2" @on-click="onClick"></x-switch>
          </group>

          <div class="alert-warning" id="dom_error_warp"></div>
      </div>

      <div class="bottom-btns">
        <input class="btn btn-block" type="button" value="保存" id="btn_save_addr" @click="saveAdd">
      </div>
      
      
    </div>

</template>

<script>
import {XHeader , Group , XSwitch ,Loading,  XAddress ,XButton, Cell, Value2nameFilter as value2name ,AlertModule, Alert} from 'vux'
import addressData from '@/assets/js/address'
import * as core from '@/core/api'
export default {
  components: {
    XHeader,
    Group,
    XSwitch,
    Loading,
    XAddress,
    XButton,
    Cell,
    AlertModule, 
    Alert
  },
  data(){
  	return {
  		addrId: '',
  		value2: false,
  		title: '',
     	value: [],
		  addressData: addressData,
    	showAddress: false,
    	ids: [],
    	editAddr:{
      		isDefault: 'N', 
      		name: '',
      		tel: '',
//    		street: '',
      		address: '',
      		provinceId: '',
      		cityId: '',
      		districtId: '',
      		merchantId: ''
      	},
    	car  :  "",
     	idStr: '',
  	}
  },
  created(){
//	this.fetchSeverData();
	this.getValue()
	
	this.idStr = this.$route.params.idStr;
  	this.car = this.$route.params.car;
  	console.log(this.car)
  	
	let _mechantId = this.$route.params.mechantId
  	this.merchantId = Number(_mechantId)
	
  },
  methods: {
    onClick (newVal, oldVal) {
      this.$vux.loading.show({
        text: '设置中...'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.value2 = newVal;
        
        if(this.value2){
  	      	this.isDefault = 'Y';
  	    }else{
  	      	this.isDefault = 'N';
  	    }   
      }, 500)
    },
    onShadowChange (ids, names) {
      this.ids = ids;
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    },
    fetchSeverData:function(){
  		core.addEdit({
  			'addrId': this.addrId
  		}).then(data =>{
  			this.editAddr = data;
  			this.editAddr = {
  				'isDefault': this.editAddr.isDefaultAddress, 
  	      		'name': this.editAddr.name,
  	      		'tel': this.editAddr.phone,
//	      		'street': this.editAddr.street,
  	      		'address': this.editAddr.address,
  	      		'provinceId': this.editAddr.provinceId,
  	      		'cityId': this.editAddr.cityId,
  	      		'districtId': this.editAddr.districtId
  			}
  			
  			if(this.editAddr.isDefault == "Y"){
  				this.value2 = true;
  				this.isDefault = this.editAddr.isDefault;
  			}else if(this.editAddr.isDefault == "N"){
  				this.value2 = false;
  				this.isDefault = this.editAddr.isDefault;
  			}
  			this.ids[0] = this.editAddr.provinceId + '';
  			this.ids[1] = this.editAddr.cityId + '';
  			this.ids[2] = this.editAddr.districtId + '';
  			
  			let valueOne = this.editAddr.provinceId + '';
  			let valueTwo = this.editAddr.cityId + '';
  			let valueThree = this.editAddr.districtId + '';
  			this.value.push(valueOne,valueTwo,valueThree);
  			this.changeData(this.value);
  		})
    },
    changeData:function(m){
    	this.value = m;
    },
    saveAdd: function(){
    	this.editAddr.provinceId = this.ids[0]
    	this.editAddr.cityId = this.ids[1]
    	this.editAddr.districtId = this.ids[2];
//  	if(this.editAddr.name == '' || this.editAddr.tel == '' || this.editAddr.provinceId == '' || this.editAddr.cityId == '' || this.editAddr.districtId == '' || this.editAddr.street == '' || this.editAddr.address == ''){
		if(this.editAddr.name == '' || this.editAddr.tel == '' || this.editAddr.provinceId == '' || this.editAddr.cityId == '' || this.editAddr.districtId == '' || this.editAddr.address == ''){
    		// this.open6();
        this.showModuleAuto("请完善资料!")
    	}else{
    		core.addAddr({
	    		'realname': this.editAddr.name,
		    	'mobile':	this.editAddr.tel,
	    	 	'isDefaultAddress': this.isDefault,
	    	 	'deliveryMethod': 'matter',
	    	 	'provinceId':  this.editAddr.provinceId,
	    	 	'cityId': this.editAddr.cityId,
	    	 	'districtId': this.editAddr.districtId,
//	    	 	'street':	this.editAddr.street,
	    		'address': this.editAddr.address,
	    		'addrId': this.addrId
	    	}).then(data =>{                             
	    		if(data.code == '00'){
//	    			location.href = '/plas/manage';
					
					if (this.car == "Y") { 
						this.$router.push('/select/'+ this.idStr +'/'+this.merchantId + "/Y")
					}else if (this.car == "M"){
			            this.$router.push('/manage/'+ this.idStr +'/'+this.merchantId + "/M")
					}else if (this.car == "N"){
						this.$router.push('/select/'+ this.idStr +'/'+this.merchantId + "/N")
					}
	    		}else{
	    			this.showModuleAuto(data.message)
//						this.open5(data.message)
					
	    		}
	    	})
    	}
    },
    getValue: function(){
  		let getQueryString = function(name) {
  			let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  			let r = window.location.search.substr(1).match(reg); 
  			if (r != null) return r[2];
  			return false;
  		}
  		this.addrId = getQueryString("addrId");
  		
  		this.addrId = this.addrId ? this.addrId : "";
  		if(this.addrId){
  			this.fetchSeverData();	
  		}	
  	},
	  open6() {
      this.$alert('请完善资料!', '警告', {
        type: 'warning',
        center: true
      });
    },
    open5(m) {
      console.log(m)
      this.$alert(m, '错误！', {
        type: 'error',
        center: true
      });
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
.vux-add-demo {
   background-color: #fff;
   height: 100%;
   position: fixed;
   width: 100%;
   overflow: scroll;
   max-width: 750px;
	.vux-header {
	  background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
  #matter{border-bottom: 8px solid #f4f4f4;background-color: #fff}
  .w-bar {
    display: block;
    overflow: hidden;
    position: relative;
    padding: 0 14px;
    line-height: 45px;
    color: #525252;
    margin-bottom: -1px;
    border: solid #d5d5d5;
    border-width: 1px 0;
    background: #fff;
    z-index: 100
  }
  .m-user-bar .w-bar {
    margin-bottom: 0;
    border: none;
    border-top: 1px solid #DCDCDC;
    color: #656565;
    font-size: 14px;
  }
  .m-user-bar .w-inputBar {
    margin: 0 0.8em;
  }
  .m-user-bar .w-bar {
    border-top: 0;
  }
  .m-user-bar .w-inputBar:first-child {
    border-top: none;
  }
  .m-user-bar .w-bar:not(:last-child) {
    border-bottom: 1px solid #dcdcdc;
  }
  .w-bar-label {
    width: 6em;
    float: left;
    color: #232323;
  }
  .w-bar-control {
    overflow: hidden;
    position: relative;
    color: #232323;
  }
  .w-bar-input {
    width: 100%;
    height: 38px;
    background: none;
    border: none;
    color: #333;
    outline: none;
    padding: 0;
    margin: 0;
  }
  .w-bar-control > .blank {
    color: #999;
  }
  .m-user-bar { border-bottom: 0; }
  .m-user-bar .w-bar { border-top: 0; }
  .m-user-bar .w-bar:not(:last-child) { border-bottom: 1px solid #dcdcdc; }
  [disabled] { cursor: not-allowed; }
  
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
		color: darkgray;font-size:0.9rem;
	}
	input:-moz-placeholder, textarea:-moz-placeholder {
		color: darkgray;font-size:0.9rem;
	}
	input::-moz-placeholder, textarea::-moz-placeholder {
		color: darkgray;font-size:0.9rem;
	}
	input:-ms-input-placeholder, textarea:-ms-input-placeholder {
		color: darkgray;font-size:0.9rem;
	}
  
  input[type="button"], input[type="password"], input[type="text"],input[type='number'] {
	-webkit-appearance: none;
	border-radius: 0;
  }
  input{font-size:0.9rem;}
  input[type="button"].btn { box-sizing: border-box; display: inline-block; padding: .5em 1em; border: 1px solid #ff8820; border-radius: .25em; font-size: 100%; line-height: 1.4286; text-align: center; text-decoration: none; background: #ff8820; color: #fff; }
  .btn:focus { outline: none; }
  .btn-reverse { background: #fff; color: #ff8820; }
  .btn-block { display: block; width: 96%; margin: 0 auto; }
  textarea.w-bar-input {
    display: block;
    margin: 14px 0;
    resize: none;
  }
  .addrDetail{
    height: 60px;
    padding-top: 2px;
  }
  .m-user-bar #w-auto{border-bottom: none;}
  .default{font-size: 14px;}
  .vux-no-group-title {
    margin-top: 0;
  }
  .weui-cells:before {
    border-top: none;
  }
  .weui-cells:after {
    border-bottom: none;
  }
  
  
 .bottom-btns {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    padding: 0.5em 0;
    text-align: center;
    color: #656565;
    background: transparent;
    max-width: 750px;
    margin: 0 auto;
  }
  .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box {
    border-color: #ff8820;
    background-color: #ff8820;
  }
  .weui-cell {
    padding: 14px 0;
    font-size: 0.875rem;
  }
  .vux-cell-value {
	color: #000;
   }
}
  .el-message-box--center { padding-bottom: 30px; width: 85%; }
  .vux-alert .weui-dialog__btn_primary{color: #ff8820;}
</style>
