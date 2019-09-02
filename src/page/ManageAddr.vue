<template>
    <div class="vux-manage-demo">
      	<div class="header">
	        <x-header :left-options="{backText: ''}">地址管理</x-header>
        </div>
        <div v-if="addSites.length>0" class="m-user-addrList" id="dom_addr_list" style="padding-bottom: 3rem;">
          <section  class="item clearfix" data-id="67840" v-for="(item,index) in addSites">
            <h2 class="title">{{item.name}}<span class="mark">{{item.phone}}</span></h2>
            <div class="info">
              <p class="address">{{item.site}}</p>
            </div>
            <div class="action">
              <input type="radio" checked="" v-if="item.isDefaultAddress == 'Y'">
              <label v-if="item.isDefaultAddress == 'Y'">默认地址</label>
              <button class="btn btn-reverse" data-action="remove" @click="deleteAddr(index)">删除</button>
              <button class="btn btn-reverse" data-href="/user/addr/update?addrId=67840" data-action="edit" @click="editAddr(index)">编辑</button>
            </div>
          </section>  
        </div>
        <div v-else>
            <p style="padding-top:180px;text-align:center;color:#666">你还没填收货地址哟~</p>
        </div>
	 	<div class="bottom-btns">
          <a class="btn btn-block" href="javascript:void(0);" @click="addAddr()">添加地址</a>
        </div>
    </div>
</template>
<script>
import { XHeader ,AlertModule, Alert} from 'vux'
import * as core from '@/core/api'
export default {
  components: {
    XHeader,
    AlertModule, 
    Alert
  },
  // beforeCreate () {
  //   document.querySelector('body').setAttribute('style', 'background:#fff')
  // },
  // beforeDestroy () {
  //   document.querySelector('body').setAttribute('style', '')
  // },
  data () {
    return {
      addSites: [],
      car  :  "",
 	  idStr: '',
 	  merchantId: '',
    }
  },
  created(){
  	this.fetchSeverData();
  	this.idStr = this.$route.params.idStr;
  	this.car = this.$route.params.car;
  	console.log(this.car)
  	
	let _mechantId = this.$route.params.mechantId
  	this.merchantId = Number(_mechantId)
  },
  methods:{
  	fetchSeverData: function(){
      let _this = this
      _this.addSites = []
  		core.selectAddr({
  		}).then(data =>{
        if (data.length <= 0) {return false}
  			_this.addSites = data.map(item=> ({
          isDefaultAddress: item.isDefaultAddress,
          name: item.name,
          phone: item.phone,
          id   : item.id,
          site: item.province + item.city + item.district + item.street + item.address 
        }));
  		})  
  	},
  	editAddr: function(index){
  		
  		if (this.car == "Y") {
    		
    		this.$router.push('/add/'+ this.idStr +'/'+this.merchantId + "/Y" +'?addrId=' + this.addSites[index].id)
    	}else if(this.car == "M"){
    		this.$router.push('/add/'+ this.idStr +'/'+this.merchantId + "/M" +'?addrId=' + this.addSites[index].id)
    	}else if(this.car == "N"){
    		this.$router.push('/add/'+ this.idStr +'/'+this.merchantId + "/N" +'?addrId=' + this.addSites[index].id)
    	}
  		
  	},
  	deleteAddr: function(index){
  		core.deleteAddr({
  			'addrId': this.addSites[index].id
  		}).then(data =>{
  			if(data.code == '00'){
  				// this.open6()
          this.showModuleAuto('删除成功')
  			}
  		})
  	},
  	open6() {
        this.$alert('删除成功', '成功!', {
          type: 'success',
          center: true
        }).then(()=>{
        	this.fetchSeverData();
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
      this.fetchSeverData();
    },
    showModuleAuto (e) {
      this.showModule(e)
      // setTimeout(() => {
      //   AlertModule.hide()
      // }, 3000) 
    },
    addAddr: function(){
    	if (this.car == "Y") {
    		this.$router.push('/add/'+ this.idStr +'/'+this.merchantId + "/Y")
    	}else if (this.car == "M"){
    		this.$router.push('/add/'+ this.idStr +'/'+this.merchantId + "/M")
    	}else if (this.car == "N"){
    		this.$router.push('/add/'+ this.idStr +'/'+this.merchantId + "/N")
    	}
    }
  }
}
</script>

<style lang="less">
.vux-manage-demo{
   font-family: arial,"Microsoft YaHei",simsun;
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
	.m-user-addrList > .item {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border-bottom: .4em solid #f3f3f3;
  }
  .clearfix:before, .clearfix:after {
    content: " ";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }

  .btn { box-sizing: border-box; display: inline-block; padding: .5em 1em; border: 1px solid #ff8820; border-radius: .25em; font-size: 100%; line-height: 1.4286; text-align: center; text-decoration: none; background: #ff8820; color: #fff; }
  .btn:focus { outline: none; }
  .btn-reverse { background: #fff; color: #ff8820;}
  .btn-block { display: block; width: 96%; margin: 0 auto;}
  [type="radio"], [type="checkbox"] { position: absolute; clip: rect(0, 0, 0, 0); }
  [type="radio"] + label:before, [type="checkbox"] + label:before { content: ""; position: relative; top: .125em; display: inline-block; margin-right: .5em; width: 1em; height: 1em; box-sizing: border-box; border: 1px solid #000; color: transparent; }
  [type="radio"] + label:before { border-radius: 50%; }
  [type="checkbox"] + label:before { border-radius: 25%; }
  [type="radio"]:checked + label:before, [type="checkbox"]:checked + label:before { border: 1px solid #ff8820; background: #ff8820 url(//c1.51jujibao.com/rs/img/icon.png) no-repeat; background-size: contain; }
  .item { border-bottom: .8em solid #f3f3f3; }
  .item .title { font-size: 16px; color: #333; }
  .item .mark { float: right;}
  .item .info { font-size: 13px; color: #333333; padding: .5em 0px;  line-height: 16px;}
  .item .info label:before { float: right; top: -2.25em; right: .5em; font-size: 15px; }
  .item .info .mobile { margin-left: .75em; }
  .item .action { font-size: 15px; padding-top: .5em; border-top: 1px solid #e5e5e5; color: #49474e; }
  .item .action .btn { float: right; margin-left: 0.75em; padding: .25em 1em; font-size: 12px; color: #7f7f7f; border: 1px solid #7f7f7f;}
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
}
.el-message-box--center { padding-bottom: 30px; width: 85%; }
.vux-alert .weui-dialog__btn_primary{color: #ff8820;}
</style>
