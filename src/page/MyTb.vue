<template>
    <div class="vux-my-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">我的通宝</x-header>
      </div>
      
      <div class="mytb-balance">
          <span>{{tb}}</span>
          <p>购买可得更多通宝</p>
      </div>

      <div class="mytb-use">
          <span>小通宝大用处</span>
          <div class="useList">
             <div class="use-item" v-for="(item , index) in useList" :key="index">
             	<a :href="item.linkUrl">
                	<img :src="item.imageUrl">
                </a>
             </div>
          </div>
      </div>
    </div>
</template>

<script>
import {XHeader} from 'vux'
import * as core from '@/core/api'

export default {
  components: {
    XHeader
  },
  data () {
    return {
    	
      tb: "0.00",
      useList:[
//      {
//        linkUrl: 'http://www.baidu.com',
//        imageUrl: 'http://placeholder.qiniudn.com/342x186/333/000'
//      },
//      {
//        linkUrl: 'http://www.baidu.com',
//        imageUrl: 'http://placeholder.qiniudn.com/342x186/333/000'
//      },
//      {
//        linkUrl: 'http://www.baidu.com',
//        imageUrl: 'http://placeholder.qiniudn.com/342x186/333/000'
//      },
//      {
//        linkUrl: 'http://www.baidu.com',
//        imageUrl: 'http://placeholder.qiniudn.com/342x186/333/000'
//      },
      ]
    }
  },
  created() {
	  	this.fetchSeverData();
	},
  methods:{
  	fetchSeverData: function(){
  		core.getMyTB({
	  	 		
	  	 	}).then(data =>{
	  	 		if(data.code == '00'){
	  	 			this.tb = data.result.userAccount.tbBalance;
	  	 			this.useList = data.result.modules.mod_tb_service1;
	  	 		}
	  	 	})	
  		
  		
  		
  	}
  }
  
  
}
</script>

<style lang="less">
.vux-my-view {
    background-color: #fff;
    height: 100%;
    position: fixed;
    width: 100%;
    max-width: 750px;
	.vux-header {
	  background-color: #fff;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.mytb-balance{
        text-align: center;
        font-size: .75rem;
        color: #c3c1c1;
        border-bottom: 1px solid #dbdbdb;
        padding-bottom: 1.125rem
	}
	.mytb-balance span{
		color: #fd8b4b;
		font-size: 3.75rem
	}

	.mytb-use{
	   border-top: 13px solid #f3f3f3;
	   padding-top: 1rem;
	   text-align: center;
	   font-size: 1.125rem;
	   color: #3c3c3c;
	}
	.useList{
		padding-top: 1rem
	}
	.use-item{
		width: 45.2%;
		float: left;
		margin-left: 3.2%;
		margin-top: .5rem 
	}
	img{width: 50%}
}

</style>
