<template>
    <div class="vux-edit-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">编辑店铺</x-header>
      </div>

      <div class="tips">
        <p class="tips-title">基本信息</p>
      </div>
     
    </div>

</template>

<script>
import {XHeader,} from 'vux'

export default {
  components: {
    XHeader, 
    
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#fff')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less">

.vux-edit-view {
	.vux-header {
	  background-color: #fff;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.tips{
		background-color: #f3f3f7
	}
	.tips-title{
		font-size: 1rem;
		color: #333333;
		padding: 1.125rem 0 .625rem .625rem;
	}
	.tips-title:before{
       width: 2px;
       border-right: 2.5px solid #008aff;
	}
	
	
}

</style>
