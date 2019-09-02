<template>
    <div class="vux-newGoods-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">新品速递</x-header>
      </div>
      <div class="goods-list">
          <div class="goods-item" v-for="(item , index) in newList" :key="index">
            <router-link :to="'/shop/detail/'+item.itemSku+'/'+mechantId+'/'+isUser" tag="div"> 
              <div class="item-pic" :style="'background:url('+item.bigImageUrl+')  center/ 100% auto no-repeat;height:193px'" >
              	<!-- <img :src="item.thumbImageUrl"> -->
              </div>
              <div class="item-info">
                   <p class="item-title">{{item.title}}</p>
                   <p class="item-price">¥{{item.salePrice}} 
                   	<!-- <span>赚&nbsp;¥23</span> -->
                   </p>
                   <!-- <div class="best-select">精选</div> -->
              </div>
            </router-link>
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
  created() {
    let _merchantId = window.localStorage.getItem("merchantId")
    let _isUser = window.localStorage.getItem("isUser")
    this.mechantId = _merchantId;
    this.isUser = _isUser
  	this.fetchServeData();
  },
  data () {
    return {
      newList : [],
      mechantId  : '',
      isUser     : 'N'
    }
  },
  methods:{
  	fetchServeData(){
	    this.getMoreGoodsDetail();      
  	},
  	getMoreGoodsDetail(){
    	  let _this = this;
    	 	core.getMoreGoodsDetail({
    	 		type : '0'
    	 	}).then(data =>{
    	 		_this.newList = data; 	 				
    	 	})
    	}
    }
  }
</script>

<style lang="less">
.vux-newGoods-view{
	.vux-header {
	  background-color: #fff;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	img{width:100%}
	.goods-item{
		background-color: #fff;
	}
	.goods-item + .goods-item{
		margin-top: .625rem
	}
	.item-info{
		position: relative;
		padding: 0.8125rem 0 0.8125rem 0.75rem;
		font-size: 14px;
		color: #242424;
	}
	.item-price{
       font-size: 13px;
       color: #333333;
	}
	.item-price span{
		display: inline-block;
		padding-left: 1.125rem;
		color: #ff4800
	}
	.best-select{
		position: absolute;
		right: .75rem;
		top: 50%;
		transform:translateY(-50%);
		border:1px solid #fe6000;
		padding: 2px 24px;
		border-radius: 3px;
		color: #fe6000
	}
}

</style>
