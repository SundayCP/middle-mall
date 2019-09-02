<template>
    <div class="vux-find-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">发现</x-header>
      </div>
      <div class="banner"><img src="http://placeholder.qiniudn.com/750x340/fff/000"></div>
      
      <div style="background-color:#fff;overflow:hidden;padding-bottom:20px;border-bottom:1px solid #f3f3f7">
      	<div><img src="../assets/for_you.png"></div>     
	    <ul>
           <li  v-for="category in categories"
                v-bind:class="{selected:category.key == categoryKey}"
                :key="category.key"
                @click="getOderDetailList(category.key,category.id,category.categoryName)">{{category.categoryName}}</li>
	    </ul> 
	   </div>

	   <div class="recommend">
	   	    <div v-if="status == '达人推荐'">
            <div class="re-item" v-for="(item , index) in goodsList" :key="index">
	          	<router-link  :to="item.url" tag="div">
		          	<div style='position:relative;color:#333333;font-size:15px'>
		              <span class="item-attr">课堂</span>
		              <!-- <span class="item-title"> -->
		              {{item.title}}
		         	  <!-- </span> -->
		            </div>
		            <div class="item-content">{{item.subTitle}}</div>
		            <div class="item-pic">
		                <div class="goods-pic" :style='"background:url("+item.thumbImageUrl+") center/ 100% 100% no-repeat;"'></div>
		              <!--  <div class="goods-pic" style='background:url(http://placeholder.qiniudn.com/130x130/666/000) center/ 100% 100% no-repeat;'></div>
		               <div class="goods-pic" style='background:url(http://placeholder.qiniudn.com/130x130/999/000) center/ 100% 100% no-repeat;'></div> -->
		            </div>
	            </router-link>
            </div>  
            </div>
            <div v-else style="background-color: #fff;">
            <div class="re-sel-item" v-for="(item , index) in goodsList" :key="index">
	            <router-link  :to="item.url" tag="div">
		          	<p class="item-big-title">{{item.title}}</p>
		          	<!-- :style='"background:url("+item.thumbImageUrl+") center/ 200px 200px no-repeat;height:193px"' -->
		            <div class="item-big-pic" >
		            	<img :src="item.thumbImageUrl">
		            </div>
	            </router-link>
            </div> 
            </div> 
	   </div>
	   <BottomBar v-show="isUser=='N'" :message="parentMsg"></BottomBar>
    </div>
</template>

<script>
import {XHeader} from 'vux'
import BottomBar from '../components/BottomBar.vue'
import * as core from '@/core/api'
export default {
  components: {
    XHeader, 
    BottomBar
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#f3f3f7')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
  },
  data () {
    return {
      parentMsg: 'find',  //在data中定义需要传入的值
      categories: [],
      goodsList: [],
      allList:[{
      	    categoryName:"全部",
			isSelected:  true,
			key: 0,
			id : 0
      }],
      categoryKey: 0,
      status: '',
      isUser: 'N'
    }
  },
  created() {
  	let _this = this
  	let _isUser = window.localStorage.getItem("isUser")
  	_this.isUser = _isUser
    _this.fetchServeData()
  },
  methods:{
  	fetchServeData(){
  		let _this = this;
  		_this.categories = []
  	 	core.categoryType({
  	 		'columnType': 'find'
  	 	}).then(data =>{
  	 		if(data.code == '00'){
  	 			let _result = data.result
  	 			if (_result) {
                    let arr = [];
                    for (var i = 0; i < _result.length; i++) {		
  	 					let obj = {};
  	 					obj['categoryName'] = _result[i].categoryName
  	 					obj['isSelected'] = false
  	 					obj['key'] = i
  	 					obj['id'] = _result[i].id
                        arr.push(obj)
 					}
  	 				// _this.categories = _this.allList.concat(arr) 	
  	 				_this.categories = arr
  	 				_this.getOderDetailList(0,arr[0].id,arr[0].categoryName)
  	 			}	
  	 		}
  	 	})
  	},
  	getOderDetailList(e,f,j){
  		let _this = this
        _this.status = j 
        // console.log( _this.status)
  		_this.categoryKey = e
  		core.categoryDetail({
  	 		'columnType': 'find',
  	 		'categoryId': f
  	 	}).then(data =>{
  	 		if(data.code == '00'){
  	 	    if (j == "达人推荐") {
  	 		  _this.goodsList = data.result.map(item=>{
  	 		  	return {
                     url           : item.url,
                     title         : item.title,
                     subTitle      : item.subTitle,
                     thumbImageUrl : item.thumbImageUrl,    
  	 		  	}
  	 		  })
            }else{
  	 		  let _result = data.result
  	 			if (_result) {
                    let arr = [];
                    for (var i = 0; i < _result.length; i++) {
                        let _index = _result.length - i		
  	 					let obj = {};
  	 					obj['url'] = _result[i].url
  	 					obj['title'] = '优选第'+_index+'期'
  	 					obj['thumbImageUrl'] = _result[i].thumbImageUrl
                        arr.push(obj)
 					}	
  	 				_this.goodsList = arr
  	 			}
	        }
  	 		}
  	 	})
  	}

  }
}
</script>

<style lang="less">

.vux-find-view {
	.vux-header {
	  background-color: #fff;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
	.banner{
		margin-bottom: .1875rem;
	}
	.selected{
		color:#ff3000;
		border:1px solid #ff3000;
	}
	img{
		width:100%;
		display: block;
	}
	ul{
		list-style: none;
		padding:0 1.4375rem;
		overflow: hidden;
		margin-top: -10px;
	}
	ul li{
		float: left;
		padding: .125rem .5rem;
		border:1px solid #7f7f7f;
		border-radius: 3px;
		font-size: .875rem;
		color: #7f7f7f;
		margin-top: .625rem
	}
	li{
		margin-left: .75rem;
	}
	.recommend{	
		margin-bottom: 3.375rem
	}
	.re-item{
		// padding: 2.0625rem 0 1.75rem;
		background-color: #ffffff;
		padding: 2.0625rem 1.3125rem 0 1.75rem;
	}
	.re-item + .re-item{
		border-top: 5px solid #f3f3f7
	}

	.item-attr{
		color: #ff3000;
		border:1px solid #ff3000;
		padding: .125rem .3125rem;
		font-size: .6875rem;
		border-radius: 3px
	}
	.item-title{
		// display: inline-block;
		// float: left;
	}
	.item-content{
		padding: .75rem 0;
		font-size: .8125rem;
		color: #666666;
	}
	.item-pic{
		overflow: hidden;
	}
	.goods-pic{
		width: 4.0625rem;
		height: 4.0625rem;
		float: left;
	}
	.item-big-pic{
		// height: 198px;
	}
	.goods-pic + .goods-pic{
		margin-left: .5625rem
	}
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    	color: #ff2c22;
	}
	.re-sel-item{
       background-color: #ffffff;
	}
	.re-sel-item + .re-sel-item{
       margin-top: 10px;
	}
	.item-big-title{
		text-align: center;
		line-height: 2.5rem;
		font-size: .9375rem;
		color: #242424
	}
	
}

</style>
