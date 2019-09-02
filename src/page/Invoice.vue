<template>
    <div class="vux-invoice-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">按订单开票</x-header>
      </div>

      <div class="goods-list">
      	<div v-if="goodsList.length>0">
	        <div class="goods-item" v-for="(item , index) in goodsList" :key="index">
	            <div class="item-mid">
	                
	                <div v-if="item.isOrderCar">
	                	<i class="check" :class="{checked : item.checked}" @click="choose(index)"></i>
			            <div class="item-top">
			                 <div class="item-date">{{item.createTime}}</div>
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
		            </div>
		            <div v-else>
		            	<i class="check" :class="{checked : item.checked}" @click="choose(index)"></i>
	            		<div class="item-top">
		                	<div class="item-date">{{item.createTime}}</div>    
		             	</div>
		            	<div class="item-content">
		                    <div class="item-pic" :style="'background:url(' +item.itemImageUrl+') no-repeat center center;background-size:100% 100%;'"></div>
			                    <div class="item-main">
			                        <div class="item-title">{{item.itemTitle}}</div>
			                        <div class="item-subtitle">
			                        <!-- 颜色：{{item.color}} -->
			                        </div>
			                        <div class="item-price">¥&nbsp;{{item.itemPrice}}</div>
			                        <div class="item-num">X{{item.itemNum}}</div>
			                    </div>
		                	</div>
			             
			            <div class="item-bot">
			                    <div class="item-tips">
			                    	共{{item.itemNum}}件商品&nbsp;合计：<span style="color:#f54a00">¥&nbsp;{{item.orderAmount}}</span>
			                    <!-- &nbsp;(优惠-{{item.discount}}) -->
			                   </div>
			            </div>
		            </div>
		        </div>
		    </div>
	    </div>
	    
        <div v-else>
              <p style="padding-top:180px;text-align:center;color:#666">这里空空如也~</p>
        </div>
      </div>
      
       <div class="report-bar">
			<div class="report">
				<div class="check-all">
					<i class="check" :class="{checked : allChecked}" @click="chooseAllGoods" v-model="allChecked"></i>
					<span class="num"><span>全选</span></span>
				</div>
				<div class="invoice-detail">
					<span>{{hasChooseNum}}笔</span>
					订单，共
					<span>{{totalMoney}}元</span>
				</div>
				<div class="btn-report"  style="background: #ff8820;" @click="getToNext">下一步</div>
			</div>
		</div>
    </div>

</template>

<script>
import {XHeader,dateFormat} from 'vux'
import * as core from '@/core/api'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      goodsList: [],
      allChecked: false,
      hasChooseNum  : 0,
      totalMoney : 0,
      orderIds:""
    }
  },
  created(){
  	this.fetchSeverData();
  },
  methods: {
  	fetchSeverData: function(){
        let _this = this
  		core.getInvoiceList({
  		}).then(data =>{
        if (data.length <= 0) {return false}
        
        
        let resultArr = data;
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
                  orderListObj['isOrderCar'] = true;
                  orderListObj['orderAmount'] = resultArr[i].orderAmount;
                  orderListObj['totalNum'] = _totalNum;
                  orderListObj['createTime'] = dateFormat(new Date(itemResult[0].createTime), 'YYYY-MM-DD  HH:mm');
                  orderListObj['orderId'] = resultArr[i].id,
                  orderListObj['checked'] = false,
                  orderListObj['orderCarList'] = itemResult
                  .map(item=>{
                      return {
                         itemImageUrl : item.itemImageUrl,
                         itemTitle    : item.itemTitle,
                         itemNum      : item.itemNum,
                         itemPrice    : item.itemPrice,                    
                      }
                  })
                  
                  _this.goodsList.push(orderListObj)
              }else{
                  orderListObj['isOrderCar'] = false;
                  orderListObj['createTime'] = dateFormat(new Date(resultArr[i].createTime), 'YYYY-MM-DD  HH:mm'),
                  orderListObj['itemImageUrl'] = resultArr[i].itemImageUrl,
                  orderListObj['itemTitle'] = resultArr[i].itemTitle,
                  orderListObj['itemNum'] = resultArr[i].itemNum,
                  orderListObj['itemPrice'] = resultArr[i].itemPrice,
                  orderListObj['orderId'] = resultArr[i].id,
                  orderListObj['orderAmount'] = resultArr[i].orderAmount,
                  orderListObj['checked'] = false,
                  
                 _this.goodsList.push(orderListObj) 
              }
			} 
		})
  	},
  	// 单个选择的目标
    choose : function(index) {
      var list = this.goodsList,
      len = list.length;
      console.log(list)
      if ( list['checked'] ) {
        this.goodsList['checked'] = false;
        this.allChecked = false;
        list[index]['checked'] = !list[index]['checked'];
      } else {
        list[index]['checked'] = !list[index]['checked'];  
 
        // 判断是否选择当前店铺的全选
        var flag = true;
        for (var i = 0; i < len; i++ ) {
          if ( list[i]['checked'] == false ) {
            flag = false;
            break;
          }
        }
        flag == true ? this.goodsList['checked'] = true : this.goodsList['checked'] = false;
      }
 
      // 判断是否选择所有商品的全选
      this.isChooseAll();
      // 判断是否有选择商品
      this.hasChoose();

      this.cal();
    },
    // 判断是否选择所有商品的全选
    isChooseAll : function() {
      var flag1 = true;
      for ( var i = 0, len = this.goodsList.length; i < len; i++ ) {
        if ( this.goodsList[i]['checked'] == false ) {
          flag1 = false;
          break;
        }
      }
      flag1 == true ? this.allChecked = true : this.allChecked = false;
    },
    // 全部商品全选
    chooseAllGoods : function() {
      var flag = true;
      if ( this.allChecked ) {
        flag = false;
      }
      for ( var i = 0, len = this.goodsList.length; i < len; i++ ) {
        this.goodsList[i]['checked'] = flag;
      }
      this.allChecked = !this.allChecked;

      // 判断是否有选择商品
      this.hasChoose();

      this.cal();
    },
    // 判断是否有选择商品
    hasChoose : function(){
      this.hasChooseNum = 0;
      for ( var i = 0, len = this.goodsList.length; i < len; i++ ) {
        if ( this.goodsList[i]['checked'] == true ) {
          this.hasChooseNum++;
        }
      }
    },
    // 计算方法集合
    cal : function(index) {
      this.calTotalMoney();
    },
    // 计算商品总金额
    calTotalMoney : function () {
      var oThis = this;
      oThis.orderIds = ""
      this.totalMoney = 0;
      for ( var i = 0, len = this.goodsList.length; i < len; i++ ) {
        var list = this.goodsList;
	    if ( list[i]['checked'] ) {
	      	// console.log(list[i].totalPrice)   str.charAt(str.length – 1)
	        oThis.totalMoney += parseFloat(list[i].orderAmount);
	        oThis.totalMoney = parseFloat(oThis.totalMoney.toFixed(2))
            oThis.orderIds += list[i].orderId+",";
	    }   
      }
      
      let strId = oThis.orderIds.length - 1;
      oThis.orderIds = oThis.orderIds.substr(0,strId)
      console.log(oThis.orderIds)
    },
    getToNext(){
    	
       let _this = this
       _this.orderIds = +_this.orderIds;
      _this.$router.push('/applyRefund/'+_this.orderIds+'/'+_this.totalMoney)
    },

  }
}
</script>

<style lang="less">
.vux-invoice-view {
	.vux-header {
	  background-color: #fff;
	  border-bottom: 1px solid #e5e5e5;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.goods-list{
		margin-bottom: 5rem;
	}
	.goods-item{
		/*margin-top: 1rem;*/
		border-top: 1px solid lightgray;
	}
	.goods-item:nth-child(1){
		margin-top: 0;
	}
	.item-top{
		background-color: #fff;
		overflow: hidden;
		font-size: .875rem;
		line-height: 2.5rem;
		padding: 0 .6875rem 0 1rem;
	}
	.item-mid{
		position: relative;
		padding-left: 3rem;
	}
	.check {
	    width: 1.6rem;
	    height: 1.6rem;
	    background: url(//c1.51jujibao.com/static/mod/tbmall/1.0.0/img/ico_check.png) no-repeat center center;
	    background-size: 100% auto;
	    display: block;
	    position: absolute;
	    top: 50%;
	    left: 0.6rem;
	    margin-top: -0.8rem;
	}
	.item-content{
		position: relative;
	}
	.item-pic{
		width: 4.9375rem;
		height: 4.9375rem;
		position: absolute;
		top: 50%;
		transform:translateY(-50%);
		left: 0;
	}
	.item-main{
		padding: 1.3125rem .6825rem 1.1875rem 5.6875rem;
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
	.report-bar {
	    width: 100%;
	    height: 4rem;
	    // line-height: 3.571rem;
	    color: #fff;
	    position: fixed;
	    left: 0;
	    bottom: 0;
	}
	.report {
	    max-width: 750px;
	    height: 4rem;
	    background: #fff;
	    margin: 0 auto;
	    padding-top: 8px;
	    color: #999999;
	    position: relative;
	}
	.report-bar .check-all {
	    padding-left: 3rem;
	    color: #999;
	    font-size: 1rem;
	    position: relative;
	}
	.report-bar .btn-report {
	    width: 28%;
	    height: 2.0625rem;
	    line-height: 2.0625rem;
	    background: #ff8820;
	    text-align: center;
	    color: #fff;
	    font-size: 1rem;
	    position: absolute;
	    top: 50%;
	    transform:translateY(-50%);
	    right: .875rem;
	    display: block;
	    border-radius: 5px;
	}
	.checked{
		background: url(../assets/icon_checked.png) no-repeat center center;
    	background-size: 100% auto;
	}
	.invoice-detail{
		font-size: .875rem;
		padding-left: .6rem;
		padding-top: .2rem;
	}
	.invoice-detail span{
		color: #f54a00;
	}
	.checked{
		background: url(../assets/icon_checked.png) no-repeat center center;
    	background-size: 100% auto;
	}
	
}

</style>
