<template>
    <div class="vux-my-rule">
      <div class="header">
        <x-header :left-options="{backText: ''}">我的通宝</x-header>
      </div>
      <div class="main">
      	<div id="" style="padding: 10px 0;">
      		<div class="weChatIcon"></div>
      		<div id="" style="display: inline-block;vertical-align: middle;font-size: 1rem;">
      			客服微信
      		</div>
      	</div>
      	<!--<div id="" class="wetChatPic"></div>-->
      	<div class="" style="text-align: center;">
  			<img src="//c1.51jujibao.com/static/mkt/2018/03/caiqiu/weChatPic.jpg"/>
  		</div>
      	<div class="" style="text-align: center;font-size: 14px;padding: 10px 0 3rem;color: darkgray;">
      		长按扫二维码图案，添加客服微信
      	</div>
      	<div id="" style="padding: 10px 0;">
      		<div class="phone"></div>
      		<div id="" style="display: inline-block;vertical-align: middle;font-size: 1rem;">
      			客服热线
      		</div>
      	</div>
      	<div id="" style="text-align: center;padding: 2rem 0 4rem;">
      		<div class="phoneText"></div>
      		<div id="" style="display: inline-block;vertical-align: middle;font-size: 1rem;color: darkgray;">
      			&nbsp;&nbsp;400-668-0091
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
    	weChatIcon: require('../assets/img/pictures/weChatPic.jpg')
    }
  },
  created() {
  	
	},
  methods:{
  	
  }
  
}
</script>

<style lang="less">
.vux-my-rule {
    background-color: #f2f2f2;
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
	.main{
		margin: 1rem;
		background: #FFF;
	}
	.weChatIcon{
		background: url(../assets/img/pictures/wechat.png) no-repeat center center/100% auto;width: 20px;height: 22px;display: inline-block;vertical-align: middle;
		margin: 0 10px 0 20px;
	}
	.wetChatPic{
		background: url('//c1.51jujibao.com/static/mkt/2018/03/caiqiu/weChatPic.jpg') no-repeat center center/100% auto;width: 150px;height: 160px;vertical-align: middle;    margin: 0 auto;
	}
	.phone{
		background: url(../assets/img/pictures/phone.png) no-repeat center center/100% auto;width: 20px;height: 22px;display: inline-block;vertical-align: middle;
		margin: 0 10px 0 20px;    
	}
	.phoneText{
		background: url(../assets/img/pictures/phonePeople.png) no-repeat center center/100% auto;width: 20px;height: 22px;display: inline-block;vertical-align: middle;
	}
	
}

</style>
