<template>
    <div class="vux-demo-sel">
      	<div class="header">
	        <x-header :left-options="{backText: ''}">选择地址<a href="javascript:void(0);" @click="manage()" class="edit"  slot="right">管理</a></x-header>
	    </div>
     	<div style="padding: 0 15px;">
     		<div v-if="addSites.length>0">
	     		<div id="" v-for="(item,index) in addSites" class="add-sites" @click="selectAddr(index)">
	     			<div style="margin: 10px 0 0;overflow: hidden;font-size: 14px;">
						<div style="float: left;">{{item.name}}</div>
						<div style="float: right;padding-right: 20px;">{{item.phone}}</div>
					</div>
					<div style="line-height: 20px;">
						<span style="color: #ff8820;font-weight: normal;" v-if="item.isDefaultAddress == 'Y'">[默认地址]</span>
						<span style="font-size: 0.8rem;">{{item.site}}</span>
					</div>
					<div style="position: absolute;top: 35%; right: 0%;"> ＞ </div>
	     		</div>
     		</div>
     		<div v-else>
	            <p style="padding-top:180px;text-align:center;color:#666">你还没填收货地址哟~</p>
	        </div>
     	</div>
     	<div class="bottom-btns" v-show="weixin">
          <a class="btn btn-block" href="javascript:void(0);" @click="manage()">管理地址</a>
        </div>
    </div>
</template>

<script>
import { XHeader } from 'vux'
import * as core from '@/core/api'
export default {
  components: {
    XHeader
  },
  // beforeCreate () {
  //   document.querySelector('body').setAttribute('style', 'background:#fff')
  // },
  // beforeDestroy () {
  //   document.querySelector('body').setAttribute('style', '')
  // },
  data () {
    return {
    	car  :  "",
     	idStr: '',
    	addrId: '',
     	addSites: [],
     	merchantId: '',
     	isWeixin: window.CONFIG.isWeixin,
		isApp: window.CONFIG.isApp,
		iconLink: '',
		weixin: false,
    }
  },
  created(){
  	this.idStr = this.$route.params.idStr;
  	this.car = this.$route.params.car;
  	this.addrId = this.$route.params.addrId;
  	console.log(this.car)
	this.fetchSeverData();
	let _mechantId = this.$route.params.mechantId
  	this.merchantId = Number(_mechantId)
  	
	this.getManageIcon();
	
	if(this.isWeixin == '1' ){
		this.weixin = true;
	}
	if(this.isApp == '1' ){
		this.weixin = false;
	}
	
  },
  methods:{
  	fetchSeverData: function(){
  		let _this = this
		core.selectAddr({
		}).then(data =>{
			if (data.length <= 0) {return false}
			_this.addSites = data.map(item=> ({
			  isDefaultAddress: item.isDefaultAddress,
			  name: item.name,
			  phone: item.phone,
			  id: item.id,
			  site: item.province + item.city + item.district + item.street + item.address 
			}));
		})
  	},
  	getManageIcon: function(){
  		
  		if (this.car == "Y") {
//			this.iconLink = 'http://prev01.m.upreci-en.com/plas/manage/'+ this.idStr +'/'+this.merchantId + "/Y"
			this.iconLink = 'http://m.upreci-en.com/plas/manage/'+ this.idStr +'/'+this.merchantId + "/Y"
			//this.iconLink = 'http://www.baidu.com'   //////////////////////////   此处应该是 全连接
		}else{
              //this.iconLink = 'http://prev01.m.upreci-en.com/plas/manage/'+ this.idStr +'/'+this.merchantId + "/N"
              this.iconLink = 'http://m.upreci-en.com/plas/manage/'+ this.idStr +'/'+this.merchantId + "/N"
            //this.iconLink = 'http://www.baidu.com'    //////////////////////////   此处应该是 全连接
		}
		
		// alert(this.isApp)
		// alert(this.iconLink)
		console.log(this.iconLink)
  		
  		let btnCouponJson = {
			"txt" : "管理", //显示文本
			"icon" : "", //显示图标
			"callbackLink" : this.iconLink, //跳转地址
			"callbackFun" : "" //执行方法
		};
		let btnCoupon = JSON.stringify(btnCouponJson);
		if(this.isApp == '1'){
			// alert('jujibao')
//			jujibao.nativeRightBarConfig(btnCoupon);
			//alert(btnCoupon)
			jujibao.nativeRightBarConfig(btnCoupon);
		}
		 
//		let icon = window.getIcon ? window.getIcon.icon(btnCoupon) : {};
  	},
  	
  	selectAddr: function(index){
		let _this = this
		core.confirmAddr({
			'idStr': _this.idStr,
			'addrId': _this.addSites[index].id
		}).then(data =>{
			if(data.code == '00'){
				if (_this.car == "Y") {
//					location.href = '/plas/confirm/car?idStr='+ _this.idStr + '&merchantId='+ this.merchantId + '&addrId='+ _this.addSites[index].id;
					_this.$router.push('/confirm/car?idStr='+ _this.idStr + '&merchantId='+ this.merchantId + '&addrId='+ _this.addSites[index].id)
				}else{
                    //location.href = '/plas/confirm/'+ _this.idStr + '/'+ this.merchantId +'?addrId='+ _this.addSites[index].id;
//                  window.location.href = '/plas/confirm?orderSku='+ _this.idStr +'&merchantId='+this.merchantId +'&addrId='+ _this.addSites[index].id;
                    _this.$router.push('/confirm?orderSku='+ _this.idStr +'&merchantId='+this.merchantId +'&addrId='+ _this.addSites[index].id)
				}
			}
		})
  	},
  	manage: function(){
  		if (this.car == "Y") {
			this.$router.push('/manage/'+ this.idStr +'/'+this.merchantId + "/Y")
		}else{
            this.$router.push('/manage/'+ this.idStr +'/'+this.merchantId + "/N")
		}
  		
  		
  	}
  	
  }
}
</script>

<style lang="less">
.vux-demo-sel {
	background-color: #fff;
    height: 100%;
    position: fixed;
    width: 100%;
    overflow: scroll;
	.vux-header {
	  background-color: #fff;
	  border-bottom: 1px solid lightgray;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.vux-header .vux-header-right a{
		color: #ff8820;
		font-size: 1rem;
	}
	.vux-header .vux-header-left .left-arrow:before {
	    content: "";
	    position: absolute;
	    width: 12px;
	    height: 12px;
	    border: 1px solid gray;
	    border-width: 1px 0 0 1px;
	    -webkit-transform: rotate(315deg);
	    transform: rotate(315deg);
	    top: 8px;
	    left: 7px;
	}
	.add-sites{border-bottom: 1px solid lightgray;padding: 5px 15px 10px 5px;;position: relative;}
	img { display: block; max-width: 100%; margin: auto; border: 0; }
	
	
	.bottom-btns { 
	    position: fixed;
	    bottom: 0;
	    right: 0;
	    left: 0;
	    z-index: 100;
	    padding: 0.5em 0;
	    text-align: center;
	    color: #656565;
	    max-width: 750px;
	    margin: 0 auto;
	}
	
	.btn { box-sizing: border-box; display: inline-block; padding: .5em 1em; border: 1px solid #ff8820; border-radius: .25em; font-size: 100%; line-height: 1.4286; text-align: center; text-decoration: none; background: #ff8820; color: #fff; }
	.btn:focus { outline: none; }
	.btn-block { display: block; width: 96%; margin: 0 auto;}
}

</style>
