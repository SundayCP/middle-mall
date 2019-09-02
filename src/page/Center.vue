<template>
    <div class="vux-mine-view">
      <div class="userInfo">
         <div class="user-pic" :style="'background:url('+userPic+') center center / 100% auto no-repeat'"></div>
         <p class="user-name">{{userName}}</p>
         <div  tag="div" class="home-btn"  @click="routerInto"> </div>
         <div style="position: absolute;font-size: 0.625rem;color: darkgray;top: 3rem;right: .631rem;" >更多好货</div>
      </div>

      <div class="my-order">
        <group>
		    <cell class="order-tips" title="我的订单" value="全部订单" is-link link="/orderList/0"></cell>
		</group>
      </div>

        <div slot="content" class="card-demo-flex card-demo-content01">
            <router-link  :to="item.linkUrl" tag="div" v-for="(item , index) in orderStatusList" :key="index">
		        <div class="vux-1px-r" style="position:relative">
			        <img class="icon" slot="icon" :src="item.imgUrl">
		            <p class="icon-tittle">{{item.orderStatus}}</p>
			        <span v-show="item.orderNum > 0" class="card-num">{{item.orderNum}}</span>	
		        </div>
            </router-link>
        </div>

        <div class="action-list">
            <!-- <div class="action-item">
                <div class="item-pic"><img src="../assets/coupon.png"></div>
                <p class="item-title">优惠券</p>
            </div> --> 
             <router-link :to="'/manage/1000/'+merchantId+'/M'" tag="div" class="action-item">
                <div class="item-pic"><img src="../assets/addr-site.png"></div>
                <p class="item-title">收货地址</p>
            </router-link>
<!--              <router-link to="/mytb" tag="div" class="action-item">
                <div class="item-pic"><img src="../assets/my-tb.png"></div>
                <p to="/mytb" tag="div" class="item-title">我的通宝</p>
            </router-link> -->
             <router-link to="/invoice" tag="div" class="action-item">
                <div class="item-pic"><img src="../assets/fa-piao.png"></div>
                <p  tag="div" class="item-title">开具发票</p>
            </router-link>
        </div>

    	<!-- <BottomBar :message="parentMsg"></BottomBar> -->
    </div>

</template>

<script>
import { Group , Cell , CellBox ,Grid, GridItem } from 'vux'
import BottomBar from '../components/BottomBar.vue'
import * as core from '@/core/api' 

export default {
  components: {
    Group,
    Cell,
    CellBox,
    Grid, 
    GridItem,
    BottomBar
   
  },
  // beforeCreate () {
  //   document.querySelector('body').setAttribute('style', 'background:#f1f5f8')
  // },
  // beforeDestroy () {
  //   document.querySelector('body').setAttribute('style', '')
  // },

  data () {
    return {
      parentMsg: 'mine',  
      orderStatusList: [
      {
        orderStatus: '待付款',
        imgUrl: require('../assets/wait-to-pay.png'),
        linkUrl: '/orderList/1',
        orderNum: window.CONFIG.orderStatics.wait_pay
      },
      {
      	orderStatus: '待收货',
      	imgUrl: require('../assets/wait-send.png'),
      	linkUrl: '/orderList/3',
        orderNum: window.CONFIG.orderStatics.wait_receive
      },
      {
      	orderStatus: '已完成',
      	imgUrl: require('../assets/has-send.png'),
      	linkUrl: '/orderList/4',
        orderNum: window.CONFIG.orderStatics.complete
      },
      {
      	orderStatus: '售后',
      	imgUrl: require('../assets/after-sell.png'),
      	linkUrl: '/orderList/5',
        orderNum: window.CONFIG.orderStatics.buyafter
      },
      ],
      userName   : '',
      userPic    : window.CONFIG.userPic,
      merchantId : 0,
    }
  },
  
  created(){
  	let _query = this.$route.params
    let _merchantId = Number(_query.merchantId)
    this.merchantId = _merchantId;
  	this.fetchPersonData();
  },
  methods:{
  	fetchPersonData: function(){
  		core.getPersonIfo({
  			
  		}).then(data =>{
  			if(data.code && data.code == '00'){
  				if(data.result){
  					
  					//alert(JSON.stringify(data.result))
//					this.userName = data.result.nickName;
//					let imgData = data.result.headImageUrl;
//					this.userPic = this.trim(imgData,'g')
					this.userPic = data.result.headImageUrl ? data.result.headImageUrl : window.CONFIG.userPic;
  				}else{
//					this.userName = window.CONFIG.userName
  					this.userPic = window.CONFIG.userPic
  				}
  				//alert(this.userName + '--------name')
  				//alert(this.userPic + '--------pic' )
  			}
  			
  		}),
  		
  		// 新增的店铺名称和头像
  	 	core.getUserName({
  	 		'merchantId': this.merchantId,
  	 	}).then(data =>{
  	 		
  	 		
  	 	})
  		
  	},
  	
  	routerInto:function(){
    	this.$router.push('/index?merchantId=' + this.merchantId);
    },
  	
  	Trim: function(str,is_global) {
	    let result;
	    result = str.replace(/(^\\+)|(\\+$)/g,"");
	    if(is_global.toLowerCase()=="g")
	    {
	        result = result.replace(/\\/g,"");
	    }
	    return result;
	}
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.vux-mine-view {
   background-color: #f1f5f8;
   height: 100%;
   position: fixed;
   width: 100%;
   max-width: 750px;
   overflow: scroll;
	.userInfo{
		padding-top: 2.5rem;
		text-align: center;
		padding-bottom: .75rem;
		background: #fff
	}
	.home-btn{
		width: 2.0625rem;
		height: 2.0625rem;
		position: absolute;
		top: .8125rem;
		right: .9375rem;
		background: url(../assets/icon_home_new.png) no-repeat center;
		background-size: 100%
	}
	.user-pic{
		width: 3.125rem;
		height: 3.125rem;
		border-radius: 50%;
		background-color: pink;
		border: 2px solid #ffc4a4;
		margin: 0 auto;

	}
	.user-name{
		padding-top: .625rem;
	}
	.order-tips{
		color: #333;
		font-size: 1rem;
		padding: 1.25rem .6375rem 1rem;
	}
	.weui-cells {
    	margin-top: .5625rem;
	}
	.order-icon{
		background-color: #fff;
	}
	.icon-tittle{
		text-align: center;
		color: #666666;
		font-size: .75rem;
	}
	.card-demo-flex {
	  display: flex;
	}
	.icon{
		width: 2rem;
		height: 2rem
	}
	.card-demo-content01 {
	  padding: 1.25rem 0;
	  background-color: #fff;
	}
	.card-padding {
	  padding: .9375rem;
	}
	.card-demo-flex > div {
	  flex: 1;
	  text-align: center;
	  font-size: .75rem;
	}
	.card-demo-flex span {
	  color: #f74c31;
	}
	.card-demo-flex .card-num{
		width: .875rem;
		height: .875rem;
		position: absolute;
		display: block;
		top: -2px;
		left: 60%;
		color: #fff;
		transform:translateX(-50%);
		border:1px solid orange;
		border-radius: 50%;
		line-height: .875rem;
		background-color: #ff5331;
	}
	.item-pic{
		width: 1.5625rem;
		height: 1.5625rem;
		position: absolute;
		left: .9375rem;
		transform:translateY(-50%);
		top: 50%;
	}
	img{width:100%}
	.action-item{
		position: relative;
		padding: 1.375rem 0;
		background-color: #fff;
		font-size: 14px;
		color: #333333;
		margin-top: .25rem;
	}
	.item-title{
       padding-left: 3.5625rem;
	}
	.weui-tabbar {
    	position: fixed;
	}
	.weui-cell__ft{
		font-size: .625rem;
	}
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    	color: #ff2c22;
	}
}	

</style>
