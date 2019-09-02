<template>
    <div class="vux-strategy-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">攻略</x-header>
      </div>
      
      <div class="main">
      	<h1> {{title}} </h1>
      	<span class="date"> {{date}} </span>
        <div class="mainContent"> {{content}} </div>
      </div>
    </div>

</template>

<script>
import { Group, Cell ,XHeader} from 'vux'
import * as core from '@/core/api'
export default {
  components: {
    Group,
    Cell,
    XHeader
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#fff')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
  },
  data () {
    return {
      title: '纳斯达克流失的祭敖包当升科技哈说句话尼克斯骄傲和覅发蝴蝶卡设计规范还',
      date: '2017-11-11',
      content: ''
    }
  },
  created() {
  	let _this = this
    _this.fetchServeData()
  },
  methods:{
  	fetchServeData(){
  		var _this = this;
  	 	core.categoryDetail({
  	 		'columnType': 'raider'
  	 	}).then(data =>{
  	 		if(data.code == '00'){
  	 				
  	 		}
  	 	})
  	}
  }
}
</script>

<style lang="less">

.vux-strategy-view {
	.vux-header {
	  background-color: #fff;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.main{
		padding: 1.5rem 20px 0 14px;
	}
	h1{
		font-size: 1rem;
		overflow: hidden; 
		text-overflow:ellipsis; 
		white-space: nowrap;
	}
	.date{
		color: #999999;
		font-size: 1rem;
	}
	.mainContent{
		font-size: 13px;
		color: #333333;
		padding-top: 27px;
		line-height: 1.5rem;
		padding-left: 6px;
	}
}

</style>
