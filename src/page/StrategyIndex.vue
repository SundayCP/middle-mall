<template>
    <div class="vux-strategy-view">
      <div class="header">
        <x-header :left-options="{backText: ''}">攻略</x-header>
      </div>
      <div class="main">
          <ul>
           <li  v-for="category in categories"
                v-bind:class="{selected:category.key == categoryKey}"
                :key="category.key"
                @click="getOderDetailList(category.key,category.id)">{{category.categoryName}}</li>
               <!--  <li class="selected">我打开</li>
                <li>我打开</li>
                <li>我打开</li>
                <li>我打开</li>
                <li>我打开</li>
                <li>我打开</li>
                <li>我打开</li>
                <li>我打开</li> -->
          </ul>
      </div>
      <div class="goods-list">
         <div class="goods-item" v-for="(item , index) in goodsList" :key="index">
          <router-link  :to="item.url" tag="div">
             <div class="item-pic" :style="'background:url('+item.thumbImageUrl+')  center/ 100% 100% no-repeat;'"></div>
             <div class="item-info">
                <p class="item-title">{{item.title}}</p>
                <p class="item-subtitle">{{item.subTitle}}</p>
             </div>
          </router-link>
         </div>
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
      categories:[],
      categoryKey:0,
      goodsList :[]

    }
  },
  created() {
  	let _this = this
    _this.fetchServeData()
  },
  methods:{
  	fetchServeData(){
  		var _this = this;
  	 	core.categoryType({
  	 		'columnType': 'raider'
  	 	}).then(data =>{
  	 		if(data.code == '00'){
          if (data.result) {
              let _result = data.result
              let arr = [];
              let _id = _result[0].id
              for (var i = 0; i < _result.length; i++) {    
                  let obj = {};
                  obj['categoryName'] = _result[i].categoryName
                  obj['isSelected'] = false
                  obj['key'] = i
                  obj['id'] = _result[i].id
                  arr.push(obj)
              }

  	 				_this.categories = arr

          _this.getOderDetailList(0,_id)
          }
  	 		}
  	 	})
  	},
    getOderDetailList(e,f){
      let _this = this
      let data
      _this.categoryKey = e
      if (f) {
        data = {
          'columnType': 'raider',
          'categoryId': f
        }
      }else{
        data = {
            'columnType': 'raider',
        }
      }
      core.categoryDetail(data).then(data =>{
        if(data.code == '00'){
          _this.goodsList = data.result 
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
    background-color: #f6f6f6;
    padding: .5rem 0
  }
  ul{
    list-style: none;
    padding:0 8px;
    overflow: hidden;
    margin-top: -10px;
  }
  ul li{
    float: left;
    padding: 4px 12px;
    border-radius: 3px;
    font-size: .875rem;
    color: #333;
    margin-top: .625rem;
    background-color: #fff;
    border:1px solid #fff;
  }
  li{
    margin-left: .75rem;
  }
  .selected{
    border:1px solid #ff3600;
    color: #ff3600;
    box-sizing: border-box;
  }
  .goods-list{
    
  }
  .goods-item{
    padding: 0 15px;
    position: relative;
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
  }
  .goods-item:nth-child(1){
    border-top: 1px solid #ebebeb;
  }
  .item-pic{
    width: 105px;
    height:77px;
    position: absolute;
    top: 50%;
    transform:translateY(-50%);
    left: 1rem;
    // background:url(http://placeholder.qiniudn.com/105x77/333/000) no-repeat center center;
    // background-size: 100% 100%;
  }
	.item-info{
    padding-left: 134px;  
  }
  .item-title{ 
    padding-bottom: 33px
  }
}

</style>
