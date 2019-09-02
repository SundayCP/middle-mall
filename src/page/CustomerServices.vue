<template>
    <div class="vux-services-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">客服</x-header>
      </div>
      <div class="main">
      	<div class="main-info">
          <div class="services-wx"><img :src="img1"></div>
          <div class="qr-code"><img src="//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/erCode.jpg"></div>
          <!--<div class="qr-code"><img :src="img2"></div>-->
          <p class="title-wx">扫二维码图案，关注公众号后留言</p>
          <div class="services-phone"><img :src="img3"></div>
          <div class="mobile-phone">
          	<a class="call" href="tel:0571-87708103">
          		<div ><img :src="img4" style="width: 50%;"></div>
          	</a>
  		 </div>
        </div>
      </div>     
    </div>

</template>

<script>
import {XHeader} from 'vux'

export default {
  components: {
    XHeader
  },
  data () {
    return {
		img1       : require('../assets/services_wx_new.jpg'),
		img2       : require('../assets/erCode.jpg'),
		img3       : require('../assets/services_phone_new.jpg'),
		img4	   :require('../assets/tel_phone.jpg'),
    }
  }
}
</script>
<style lang="less">
body {
    background-color: #f0eff5;
}
.vux-services-view {
	.vux-header {
	  background-color: #fff;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.main{
		padding: 15px 15px 0 13px;
	}
	.main-info{
		background-color: #fff;
		padding-bottom: 70%;
		padding-top: 10px;
		
	}
	.services-wx{
		margin-bottom: 5px;
	}
	.qr-code{
		width: 10rem;
		height: 10rem;
		margin: 0 auto;
		/*border:2px solid #bd0024;*/
	}
	img{
		width:100%
	}
	.title-wx{
		font-size: .9rem;
		color: #666666;
		text-align: center;
		padding-top: .75rem;
		padding-bottom: 2.625rem;
	}
	.mobile-phone{
		text-align: center;
	}
	.icon-phone{
		width: 20px;
		height: 20px;
		position: absolute;
		top: 0;
		left: 0;
		line-height: 20px
	}
	.mobile-phone span{
		color: #389fcf;
	}
	
}

</style>
