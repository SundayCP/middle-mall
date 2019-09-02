<template>
    <div class="vux-cart-view">
       <div class="headers"> 
        <x-header :left-options="{backText: ''}">购物车<a v-if="IsEdit == false" class="edit" @click="isEdit" slot="right">编辑</a>
        											   <a v-else @click="overEdit" class="complete" slot="right">完成</a>
        </x-header>
       </div> 

      <section class="cart-list" id="J-cart-list" >
        <div v-if="commonList.length>0">
	      	<div class="citem" data-cartid="477" data-sku="1531" data-price="6" data-num="1" id="sku-1531"  v-for="(item , index) in commonList" :key="index">
	      		<i class="check" :class="{checked : item.checked}" @click="choose(index)"></i>
	      		<div class="pic"><img :src='item.img'  alt=""></div>
	      		<div class="info">
	      			<div class="name">{{item.title}}</div>
	      			<div class="price">¥ {{item.salePrice}}</div>
	      			<div class="count">
	      				<span @click="numChange(index, -1)" class="minus" data-cartid="477" data-sku="1531" :class="{ 'nocheck' : item.num == 1}">-</span>
	      				<!--<group>
						    <x-input @blur="change()" v-model="item.num" class="num" pattern="[0-9]*" data-min="1" data-max="2" type="text" data-cartid="477" data-sku="1531" ></x-input>
						</group>-->
	      				<input @blur="numChange(index, 0)"  v-model="item.num" value='item.num' class="num" pattern="[0-9]*" data-min="1" data-max="2" type="text" data-cartid="477" data-sku="1531" >
	      				<span @click="numChange(index, 1)" class="plus " data-cartid="477" data-sku="1531" :class="{ 'nocheck' : item.num == item.realStock}">+</span>
	      			</div> 
	      		</div>
	      	</div>
      	</div>
      	<div v-else>
          <p style="padding-top:180px;text-align:center;color:#666">这里空空如也~</p>
	    </div>
       
      </section>

      <!-- 底边栏 -->
        <div class="report-bar" id="J-cart-bar" v-if="IsEdit == false">
			<div class="report">
				<div class="check-all">
					<i class="check" :class="{checked : hasChecked}" @click="chooseAllCal"></i>
					<span class="num"><span>{{selectText}}(</span><span class="J-cart-bar-num">{{hasChooseNum}}</span><span>)</span></span>
				</div>
				<div class="report-info">
					<div class="total">合计：<span>¥ <em class="J-cart-bar-total">{{totalMoney}}</em></span></div>
				</div>
				<a href="javascript:void(0);" @click="goBuy()" class="btn-report">立即购买</a>
			</div>
	    </div>

	    <div class="report-bar" id="J-cart-edit-bar" v-else>
			<div class="report">
				<div class="check-all">
					<i class="check" :class="{checked : allChecked}"  @click="chooseAllGoods" v-model="allChecked"></i>
					<span class="num"><span>全选</span></span>
				</div>
				<a href="javascript:void(0);" class="btn-report" @click="delGoods()" style="background: #ff8820;">选中删除</a>
			</div>
		</div>
     
    </div>

</template>

<script>
import { Group, Cell , XHeader,AlertModule, Alert ,XInput} from 'vux'
import * as core from '@/core/api' 

export default {
  components: {
    Group,
    Cell,
    XHeader,
    AlertModule, 
	Alert,
	XInput
  },
  data () {
    return {
      IsEdit:false,
      commonList: [
	      // {
	      	
	      //   name : '麻辣二胖',
	      //   price : 23.00,
	      //   realStock : 10,
	      //   fare : 1.5,
	      //   num : 1,
	      //   checked : false,
	      //   id : 112
	      // },
	    ],
	    totalMoney : 0,
	    allChecked : false,
	    hasChecked : false,
	    hasChooseNum  : 0,
	    cartId: '',
	    merchantId: '',
	    isApp: window.CONFIG.isApp, 
	    selectText: '已选',
    }
  },
  created(){
  	this.fetchServeData()
  	let _mechantId = this.$route.params.mechantId
  	this.merchantId = Number(_mechantId)
  	
  	window.appIcon = this.editChange;
	window.editOver = this.editOverChange;
	this.isAppIcon();
	
	if(this.isApp == '1'){
		jujibao.nativeRightBarConfig(btnCoupon);
	}
	
  },
   mounted(){
   
	
  },
  methods:{
  	isAppIcon: function(){
  		let btnCouponJson = {
			"txt" : "编辑", //显示文本
			"icon" : "", //显示图标
			"callbackLink" : "", //跳转地址
			"callbackFun": 'appIcon' //执行方法
		};
		console.log('1234567')
		let btnCoupon = JSON.stringify(btnCouponJson);
		if(this.isApp == '1'){
			jujibao.nativeRightBarConfig(btnCoupon);
		}
  	},
  	editChange(){
  	    this.IsEdit = true;
  	    for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
          this.commonList[i]['checked'] = false;
        }
        this.allChecked = false;
        
        let btnCouponJson = {
			"txt" : '完成', //显示文本
			"icon" : "", //显示图标
			"callbackLink" : "", //跳转地址
			"callbackFun" : 'editOver'  //执行方法
		};
		let btnCoupon = JSON.stringify(btnCouponJson);
		if(this.isApp == '1'){
			jujibao.nativeRightBarConfig(btnCoupon);
		}
	        
//	    return false;  
  	},
  	editOverChange(){
  		
  		this.IsEdit = false;
//      this.isAppIcon("编辑");
		window.location.reload();
  	},
  	
  	fetchServeData: function(){
  		core.getCartList(
  			{}
  		).then(data =>{
  			if (data) {
				this.commonList = data.cartItems ? data.cartItems : [];
				this.cartId = data.id;
				
				let len = this.commonList.length;
				if(len == 0){
					
				}else{
					for(var i= 0;i<len;i++){
						this.commonList[i]["checked"] = false;
						this.commonList[i]["realStock"] = 100;
					}
					 this.commonList = this.commonList.map(obj =>{
						let reObj = {}
						reObj['title'] = obj.shopItem.title;
						reObj['img'] = obj.shopItem.thumbImageUrl;
						reObj['checked'] = obj.checked;
						reObj['realStock'] = obj.realStock;
//						reObj['realStock'] = obj.shopItem.stockQty;
						reObj['marketPrice'] = obj.shopItem.marketPrice;
						reObj['salePrice'] = obj.shopItem.salePrice;
						reObj['id'] = obj.id;
						reObj['num'] = obj.num;
						return reObj;
					})	
					
					this.chooseAllGoods();
					
					this.cal();
				}
				
				console.log(this.commonList)
			}
  		})
  		
  	},
  	
    isEdit () {
      var _this = this;
  	  _this.IsEdit = true;
  	  for ( var i = 0, len = _this.commonList.length; i < len; i++ ) {
        _this.commonList[i]['checked'] = false;
      }
       _this.allChecked = false;
	},
    overEdit (){
  	  this.IsEdit = false;
	  window.location.reload();
	},
	// 全部商品全选
    chooseAllGoods : function() {
      var flag = true;
      if ( this.allChecked ) {
        flag = false;
      }
      for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
        this.commonList[i]['checked'] = flag;
      }
      this.allChecked = !this.allChecked;
      
      this.hasChoose();
    },
    
    chooseAllCal: function(){
    	var flag = true;
	    if ( this.allChecked ) {
	      flag = false;
	    }
	    for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
	      this.commonList[i]['checked'] = flag;
	    }
	    this.allChecked = !this.allChecked;
	    
	    // 判断是否选择所有商品的全选
	    this.isChooseAll();
	    // 判断是否有选择商品
	    this.hasChoose();
	
	    this.cal();
    	
    },
    
    // 单个选择
    choose : function(index) {
      var list = this.commonList,
      len = list.length;
      
      console.log(this.commonList[index]['checked']  + 'ttttttttttttttttttttttttttttt')
      if ( list['checked'] ) {
        this.commonList['checked'] = false;
        this.allChecked = false;
        list[index]['checked'] = !list[index]['checked'];
        
        console.log('1+1----------------------------')
        this.selectText = '已选'
        
      } else {
        list[index]['checked'] = !list[index]['checked'];
 		for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
	        if ( this.commonList[i]['checked'] == false ) {
	          	this.selectText = '已选'
	          	break;
	        }
	    }
 	
        // 判断是否选择当前店铺的全选
        var flag = true;
        for (var i = 0; i < len; i++ ) {
          if ( list[i]['checked'] == false ) {
            flag = false;
            break;
          }
        }
        flag == true ? this.commonList['checked'] = true : this.commonList['checked'] = false;
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
      for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
        if ( this.commonList[i]['checked'] == false ) {
          flag1 = false;
          break;
        }
      }
      flag1 == true ? this.allChecked = true : this.allChecked = false;
    },

    // 计算方法集合
    cal : function(index) {
      this.calTotalMoney();
    },
    // 删除操作
    delGoods : function() {
        var that = this;
        //方法一 用逆向循环
        // for (var i = that.commonList.length - 1;i >= 0;i--) {
        //      var index = that.commonList[i];
        //      if (index.checked) {
        //          that.commonList.splice(i,1);
        //      }
        //  }
        
        //方法一 直接过滤更简单，直观
//      that.commonList = that.commonList.filter(function(i){ return !i.checked })
		 if (this.hasChooseNum > 0) {
            let idArr = [];
            for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
		        if ( this.commonList[i]['checked'] == true ) {
		           idArr.push(this.commonList[i]['id'])
		        }
		    }
            
//          window.location.href = "http://localhost:8080/page/confirm?idStr="+idArr.join(",")+"&t="+(new Date().getTime() + Math.floor(Math.random() * 100));
			idArr = idArr.join(",");
			core.deleteGoods(
				{
					'cartId': this.cartId,
					'cartItemIds': idArr
				}
			).then(data =>{
				if(data.code == '00'){
					window.location.reload();					
				}
			})
				
        }else{
//      	alert("请选择删除的商品~")
        	this.showModuleAuto("请选择删除的商品~")
        }
      this.cal();
    },
    // 去购买
    goBuy : function() {
        if (this.hasChooseNum > 0) {
            // alert("穷逼，心里没有b数吗？" + "贫穷，抑制了你的想象力")
            var ids = [];
            for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
		        if ( this.commonList[i]['checked'] == true ) {
		           ids.push(this.commonList[i]['id'])
		        }
		    }
            window.location.href = "/plas/confirm/car?idStr="+ids.join(",") + '&merchantId=' + this.merchantId;
        }else{
//      	alert("请选择购买商品~")
			this.showModuleAuto("请选择购买商品~")
        }
    },

    // 判断是否有选择商品
    hasChoose : function(){
      var flag2 = true;
      this.hasChooseNum = 0;
      for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
        if ( this.commonList[i]['checked'] == true ) {
          flag2 = false;
          this.hasChooseNum++;
        }
      }
      flag2 == true ? this.hasChecked = false : this.hasChecked = true;
    },

    // 计算商品总金额
    calTotalMoney : function () {
      var oThis = this;
      this.totalMoney = 0;
      for ( var i = 0, len = this.commonList.length; i < len; i++ ) {
        var list = this.commonList;
	    if ( list[i]['checked'] ) {
	      	console.log(list[i].salePrice,list[i].num)
	        oThis.totalMoney += (parseFloat(list[i].salePrice) * parseFloat(list[i].num));
	        console.log(oThis.totalMoney + '//////////')
	        oThis.totalMoney = parseFloat(oThis.totalMoney.toFixed(2))
			console.log(oThis.totalMoney)
			console.log('---------------------------')
	    }
      }
    },
    
    // 商品数量控制
    numChange : function(index, numChange) {
    	
    	console.log(numChange + 'mmmmmmmmmm')
      var goods = this.commonList[index],
        oThis = this;
      if ( numChange == 1 ) {
        goods.num++;
      } else if ( numChange == -1 ) {
        goods.num--;
      } 
 
      if ( goods.num <= 1 ) {
        goods.num = 1;
        
      } 
      
      
 
      if ( goods.num > goods.realStock ) {
        goods.num = goods.realStock;
//      this.showModuleAuto("商品最大库存是"+goods.realStock)
      }
      goods.num = Number(goods.num).toFixed(0)
      if (isNaN(goods.num)) {
      	  goods.num = 1;
      }
      this.cal();
      this.sendData(this.cartId,this.commonList[index]['id'],goods.num);
    },
    
    //  商品数量传给后台
    sendData: function(id1,id2,num){
//  	console.log(id1)
//      console.log(id2)
//      console.log(num)
        core.sendDataNum({
        	'cartId': id1,
			'cartItemId': id2,
			'num': num
        }).then(data =>{
        	if(data.code == '00'){
//      		alert("成功！")
        	}
        })
    },
    
    showModuleAuto (e) {
	      this.showModule(e)
    },
    showModule (e) {
      AlertModule.show({
        title: '',
        content: e,
        onShow () {
          console.log('Module: I\'m showing')
        },
        onHide () {
          console.log('Module: I\'m hiding now')
        }
      })
    },
    
  }
}
</script>

<style lang="less">
.vux-cart-view {
	.vux-header {
	  background-color: #fff;
	  .edit,.complete{
		  font-size: 15px;
		  color: #5e5e5e;
		}
		
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	}
	.cart-list{
		margin-top: .5rem;
		margin-bottom: 4.171rem;
	}
	.cart-list .citem {
	    height: 7.4rem;
	    background: #fff;
	    margin-bottom: 0.6rem;
	    overflow: hidden;
	    position: relative;
	    padding-left: 8.6rem;
	    padding-right: 0.6rem;
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
	.cart-list .citem .pic {
	    width: 5rem;
	    height: 5rem;
	    // background: #ccc;
	    position: absolute;
	    top: 50%;
	    left: 2.8rem;
	    margin-top: -2.5rem;
	}
	.cart-list .citem .info {
	    width: 100%;
	    height: 5rem;
	    padding-top: 1.6rem;
	    font-size: 1rem;
	    position: relative;
	}
	.cart-list .citem .name {
	    height: 1.5rem;
	    line-height: 1.5rem;
	    word-break: keep-all;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    color: #333333;
	    font-size: 13px;
	}
	.cart-list .citem .price {
	    line-height: 2rem;
	    position: absolute;
	    left: 0;
	    bottom: 0.2rem;
	    font-size: 1rem;
	    color: #e8732b;
	}
	.cart-list .citem .count {
	    width: 7rem;
	    height: 2rem;
	    line-height: 2rem;
	    position: absolute;
	    right: .2rem;
	    bottom: 0.5rem;
	    font-size: 1rem;
	    overflow: hidden;
	    border: 1px solid #999;
	    border-radius: .3rem;
	    overflow: hidden;
	}
	.cart-list .citem .minus {
	    width: 2rem;
	    height: 2rem;
	    float: left;
	    display: block;
	    font-size: 1.4rem;
	    text-align: center;
	    border-right: 1px solid #ccc;
	    box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    text-indent: -999em;
	    background: url(//c1.51jujibao.com/static/mod/tbmall/1.0.0/img/ico_minus_ckeck.png) #fff no-repeat center center;
	    background-size: 44% auto;
	}
	.cart-list .citem .minus.nocheck {
	    background: url(//c1.51jujibao.com/static/mod/tbmall/1.0.0/img/ico_minus_nocheck.png) #f5f5f5 no-repeat center center;
	    background-size: 44% auto;
	}
	.cart-list .citem input.num {
	    border: none;
	    width: 3rem;
	    height: 2rem;
	    line-height: 2rem;
	    display: block;
	    float: left;
	    text-align: center;
	    font-size: 1.2rem;
	    color: #e8732b;
        outline: 0;
	    -webkit-box-sizing: border-box;
	    -webkit-tap-highlight-color: transparent;
	    -webkit-appearance: none;
	}
	.cart-list .citem .plus {
	    width: 2rem;
	    height: 2rem;
	    float: right;
	    display: block;
	    font-size: 1.4rem;
	    text-align: center;
	    border-left: 1px solid #ccc;
	    box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    text-indent: -999em;
	    background: url(//c1.51jujibao.com/static/mod/tbmall/1.0.0/img/ico_plus_ckeck.png) #fff no-repeat center center;
	    background-size: 44% auto;
	}
	.cart-list .citem .plus.nocheck {
	    background: url(//c1.51jujibao.com/static/mod/tbmall/1.0.0/img/ico_plus_nocheck.png) #f5f5f5 no-repeat center center;
	    background-size: 44% auto;
	}
	img{
		width:100%;
	    vertical-align: middle;
	}
	.report-bar {
	    width: 100%;
	    height: 3.571rem;
	    line-height: 3.571rem;
	    color: #fff;
	    position: fixed;
	    left: 0;
	    bottom: 0;
	}
	.report {
	    max-width: 750px;
	    height: 3.571rem;
	    background: #fff;
	    margin: 0 auto;
	    position: relative;
	}
	.report-bar .check-all {
	    padding-left: 3rem;
	    color: #999;
	    font-size: 1rem;
	}
	.report-bar .report-info {
	    width: 40%;
	    font-size: 1rem;
	    position: absolute;
	    top: 0;
	    right: 28%;
	    color: #999;
	    text-align: right;
	    padding-right: 1rem;
	}
	.report-bar .report-info .total {
	    font-size: 1rem;
	    color: #999;
	}
	.report-bar .report-info .total span{
	    color: #e8732b;
	}
	.report-bar a.btn-report {
	    width: 28%;
	    height: 3.571rem;
	    background: #ff8820;
	    text-align: center;
	    color: #fff;
	    font-size: 1rem;
	    position: absolute;
	    top: 0;
	    right: 0;
	    display: block;
	}
	em{
		font: inherit;
	}
	.checked{
		background: url(../assets/icon_checked.png) no-repeat center center;
    	background-size: 100% auto;
	}

	
}

</style>
