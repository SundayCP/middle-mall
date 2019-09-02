<template>
    <div class="vux-order-list-view">
      <view-box ref="viewBox">
        <div class="header">
        	<x-header :left-options="{backText: ''}">订单列表</x-header>
        </div>
      
        <tab>
            <tab-item
                v-for="category in categories"
                :selected="category.key == categoryKey"
                :key="category.key"
                @on-item-click="runInto(category.key)"
            >
                {{category.name}}
            </tab-item>

            <!-- <tab-item selected>全部</tab-item>	
            <tab-item>待付款</tab-item>	
            <tab-item>待收货</tab-item>	
            <tab-item>已完成</tab-item>	
            <tab-item>售后</tab-item> -->	
        </tab>
        
        <div class="goods-list">
          <div v-if="showStatus==1">
            <scroller :on-infinite="infinite" ref="myscroller" class="my-scroller">
            <div class="shop-box">
            <div class="goods-item" v-for="(item , index) in orderList" :key="index" >
              <router-link v-if="item.isOrderCar"  :to="'/orderDetail/'+item.itemId" tag="div">
               <div class="item-top">
                    <div class="item-date">{{item.createTime}}</div>
                    <div class="item-status" v-if="item.status == '已取消'" style="color: gray;">{{item.status}}</div>
                    <div class="item-status" v-else >{{item.status}}</div>
               </div>
               <div class="item-content" v-for="(item1 , index) in item.orderCarList" :key="index">
                    <div class="item-pic" :style="'background:url('+item1.itemImageUrl+')  center/ 100% 100% no-repeat;'"></div>
                    <div class="item-main">
                        <div class="item-title">{{item1.itemTitle}}</div>
                        <div class="item-subtitle"></div>
                        <div class="item-price">¥&nbsp;{{item1.itemPrice}}</div>
                        <div class="item-num">X{{item1.itemNum}}</div>
                    </div>
               </div>

               <div class="item-bot">
                   <div class="item-tips">
                    共{{item.totalNum}}件商品&nbsp;合计：<span style="color:#f54a00">¥&nbsp;{{item.orderAmount}}</span>
                    <!-- &nbsp;(优惠-6.00) -->
                   </div>
               </div>
              </router-link>

              <router-link v-else  :to="'/orderDetail/'+item.itemId" tag="div">
                  <div class="item-top">
                    <div class="item-date">{{item.createTime}}</div>
                    <!--<div class="item-status">{{item.status}}</div>-->
                    <div class="item-status" v-if="item.status == '已取消'" style="color: gray!important;">{{item.status}}</div>
                    <div class="item-status" v-else >{{item.status}}</div>
               </div>
               <div class="item-content">
                    <div class="item-pic" :style="'background:url('+item.itemImageUrl+')  center/ 100% 100% no-repeat;'"></div>
                    <div class="item-main">
                        <div class="item-title">{{item.itemTitle}}</div>
                        <div class="item-subtitle"></div>
                        <div class="item-price">¥&nbsp;{{item.itemPrice}}</div>
                        <div class="item-num">X{{item.itemNum}}</div>
                    </div>
               </div>
               <div class="item-bot">
                   <div class="item-tips">
                    共{{item.itemNum}}件商品&nbsp;合计：<span style="color:#f54a00">¥&nbsp;{{item.orderAmount}}</span>
                    <!-- &nbsp;(优惠-6.00) -->
                   </div>
               </div>
              </router-link>
            </div>
          </div>
          </scroller>
          </div>
          <div v-else-if="showStatus==2">
              <p style="padding-top:180px;text-align:center;color:#666">这里空空如也~</p>
          </div>
        </div>
      </view-box>
    </div>

</template>

<script>
import {ViewBox , XHeader, Tab, TabItem , dateFormat , Loading} from 'vux'
import store from '../store'
import * as core from '@/core/api' 
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller); 

let page =0;
let prepage = 10;
let firstLoaded = false;
let moreLoaded = true;
export default {
  components: {
    XHeader,
    Tab, 
    TabItem,
    ViewBox,
    Loading
  },
  computed: {
    categoryKey() {
      return this.status;
    },
    categories() {
      return store.getters.categories;
    }
  },
  data () {
    return {
      orderList: [],
      itemStatus:'',
      noData : '',
      status : 0,
      resLen : 0,
      pageIndex : 1,
      isFirst : true,
      showStatus : 0,
      // loading
      text1   : '',
      show1   : false,
    }
  },
  created() {
    let _status = this.$route.params.status
    this.status = _status;
    this.fetchServeData();
  },
  methods:{
      fetchServeData(){
        this.getOderDetailList(this.status,1);    
      },
      getOderDetailList (e,f){
        if (e == this.status && !this.isFirst) {return false}//第一次加载
        this.status = e
        this.isFirst = false
        this.orderList = []
        this.pageIndex = f
        this.noData = ""
        if(this.orderList.length == 0){
          setTimeout(() => {  
            // 加载中
            this.showLoading()
            this.loadMoreDate(e,f) 
          },0)  
        }
      },
      filterStatus(el){
          if (el == 'PAY_NO') {
              this.itemStatus = '待支付'
            }else if (el == 'TO_DELEIVE') {
              this.itemStatus = '待发货'
            }else if (el == 'WAIT_RECEIVE') {
              this.itemStatus = '待收货'
            }else if (el == 'COMPLETED') {
              this.itemStatus = '交易成功'
            }else if (el == 'REFUND'|| el == 'CANCEL_REFUND_SUCESS' || el == 'AUDIT_OK_REFUND_OK') {
              this.itemStatus = '退款成功'
            }else if (el == 'REFUND_FAIL' || el == 'AUDIT_FAIL') {
              this.itemStatus = '退款失败'
            }else if (el == 'REFUND_PROCESS' || el == 'CANCEL_REFUND_PROCESS' || el == 'AUDIT_REFUND_PROCESS' || el == 'AUDIT_OK_REFUND_NO' || el == 'AUDIT_OK') {
              this.itemStatus = '退款中'
            }else if (el == 'CANCEL') {
              this.itemStatus = '已取消'
            }
      },

      loadMoreDate(e,f){
        let _this = this;
        core.getOrderList({//pageIndex pageSize
          'type': e,
          'pageIndex': f,
        }).then(data =>{
           _this.hideLoading()
          if(data.result){
            let resultArr = data.result;
            _this.resLen = resultArr.length
            for (var i = 0; i < resultArr.length; i++) {
              let itemResult = resultArr[i].orderList;
              let orderListObj = {}
              if (itemResult) {
                let _totalAmount = 0;
                let _totalNum = 0;
                for (var y = 0; y < itemResult.length; y++) {
                  _totalAmount += itemResult[y].itemNum * itemResult[y].itemPrice
                  _totalNum += itemResult[y].itemNum
                }

                _this.filterStatus(resultArr[i].status)
                  
                  orderListObj['isOrderCar'] = true;
                  // orderListObj['orderAmount'] = _totalAmount;
                  orderListObj['orderAmount'] = resultArr[i].orderAmount;
                  orderListObj['totalNum'] = _totalNum;
                  orderListObj['status'] = _this.itemStatus ? _this.itemStatus : '';
                  orderListObj['createTime'] = dateFormat(new Date(itemResult[0].createTime), 'YYYY-MM-DD  HH:mm');
                  orderListObj['itemId'] = resultArr[i].id,
                  orderListObj['orderCarList'] = itemResult
                  .map(item=>{
                      return {
                         itemImageUrl : item.itemImageUrl,
                         itemTitle    : item.itemTitle,
                         itemNum      : item.itemNum,
                         itemPrice    : item.itemPrice,                    
                      }
                  })

                  _this.orderList.push(orderListObj)

              }else{
                   _this.filterStatus(resultArr[i].status)

                  orderListObj['isOrderCar'] = false;
                  orderListObj['createTime'] = dateFormat(new Date(resultArr[i].createTime), 'YYYY-MM-DD  HH:mm'),
                  orderListObj['status'] = _this.itemStatus ? _this.itemStatus : '',
                  orderListObj['itemImageUrl'] = resultArr[i].itemImageUrl,
                  orderListObj['itemTitle'] = resultArr[i].itemTitle,
                  orderListObj['itemNum'] = resultArr[i].itemNum,
                  orderListObj['itemPrice'] = resultArr[i].itemPrice,
                  orderListObj['itemId'] = resultArr[i].id,
                  orderListObj['orderAmount'] = resultArr[i].orderAmount,
                  
                 _this.orderList.push(orderListObj) 
              }
            }  
            // 数据加载完成
            if (_this.orderList.length > 0) {//有数据展示
                _this.showStatus = 1 
            } else if (_this.orderList.length == 0) {//无数据展示
                _this.showStatus = 2
            }else{//空白展示
                _this.showStatus = 0
            }
          }         
        }) 
      },

      infinite(done) {
        if(this.noData) {
          setTimeout(()=>{
              this.$refs.myscroller.finishInfinite(2);
          })
          return;
        }
        let self = this;
        setTimeout(() => {
            if (self.resLen<2) {
                self.noData = "没有更多数据"
            }else{
                self.pageIndex++
                self.loadMoreDate(self.status,self.pageIndex)
            }                              
            self.$refs.myscroller.resize();
            done()
        }, 1000)
      },
      runInto(e){
        let _this = this
        if (e == _this.status) {return false}
        _this.showStatus = 0
        _this.$router.push('/orderList/'+e)
        // _this.fetchServeData(e,1);
      },
      showLoading () {
        this.$vux.loading.show({
          text: '加载中'
        })
      },
      hideLoading(){
        this.$vux.loading.hide()
      }
  }
}
</script>

<style lang="less">
.vux-order-list-view {
   background-color: #f5f5f5;
   height: 100%;
   position: fixed;
   width: 100%;
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
  .vux-tab{z-index: 100}
	.vux-tab .vux-tab-item.vux-tab-selected {
	    color: #f54a00;
	    border-bottom: 3px solid #f54a00;
	}
	.vux-tab-ink-bar {
	    background-color: #f54a00;
	}
	.vux-tab .vux-tab-item {
		background: none;
	}
	.goods-item{
		margin-top: 1rem; 
	}
	.item-top{
		background-color: #fff;
		overflow: hidden;
		font-size: .875rem;
		line-height: 2.5rem;
		padding: 0 .6875rem 0 1.25rem;
	}
	.item-date{
		float: left;
	}
	.item-status{
		float: right;
		color: #f54a00;
	}
	.item-content{
		position: relative;
	}
  .item-content + .item-content{
    border-top: 10px solid #fff;
    // border-top: none;
  }
	.item-pic{
		width: 4.9375rem;
		height: 4.9375rem;
		position: absolute;
		top: 50%;
		transform:translateY(-50%);
		left: .75rem;
	}
	.item-main{
		padding: 1.3125rem .6825rem 1.1875rem 6.4375rem;
		color: #242424;
		position: relative;
	}
	.item-title{
		font-size: .8125rem;
		padding-right: 2.5rem;
		overflow: hidden; 
		text-overflow:ellipsis; 
		white-space: nowrap;
	}
	.item-subtitle{
		font-size: .75rem;
		color: #9a9a9a;
    padding-top: .625rem
	}
	.item-price{
		font-size: 1rem;	
	}
	.item-num{
		position: absolute;
		top: 1.3125rem;
		right: .6825rem;
		font-size: .75rem;
		color: #9a9a9a;
	}
	.item-tips{
		text-align: right;
		padding-right: .6825rem;
		font-size: .8125rem;
		background-color: #fff;
		line-height: 2.5rem;
	}
  .my-scroller , ._v-container[data-v-ecaca2b0]{
    top: 90px;
  }
  ._v-container>._v-content>.loading-layer[data-v-ecaca2b0] {
    padding-bottom: 100px
  }
}

</style>
