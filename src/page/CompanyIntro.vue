<template>
    <div class="companyIntro">
      <div class="header">
        <x-header :left-options="{backText: ''}">公司介绍</x-header>
      </div>
      <div class="main">
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg01.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg02_new.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg03.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg04.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg05.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg06.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg07.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg08.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg09.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg10.jpg' width="100%"/>
      	<img src='//c1.51jujibao.com/static/mkt/2018/04/zddh5/img/bg11.jpg' width="100%"/>
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
//  	bg01: require("../assets/img/pictures/bg01.jpg"),
//  	bg02: require("../assets/img/pictures/bg02.jpg"),
//  	bg03: require("../assets/img/pictures/bg03.jpg"),
//  	bg04: require("../assets/img/pictures/bg04.jpg"),
//  	bg05: require("../assets/img/pictures/bg05.jpg"),
//  	bg06: require("../assets/img/pictures/bg06.jpg"),
//  	bg07: require("../assets/img/pictures/bg07.jpg"),
//  	bg08: require("../assets/img/pictures/bg08.jpg"),
//  	bg09: require("../assets/img/pictures/bg09.jpg"),
//  	bg10: require("../assets/img/pictures/bg10.jpg"),
//  	bg11: require("../assets/img/pictures/bg11.jpg"),
    }
  },
  created() {
  	
  	window.scrollTo(0, 0);
  	
	},
  methods:{
  	
  }
  
}
</script>

<style lang="less">
.companyIntro{
	
	img{display: block;}
	.vux-header{ background-color: #fff;color: #000;border-bottom: 1px solid #dbdbdb;} 
	.vux-header-title,.vux-header-back{color: #000!important;}
	.vux-header-back{display: none;}
}

</style>
