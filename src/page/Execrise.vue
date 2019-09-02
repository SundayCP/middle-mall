<template>
	<div id="execrise">
		<div id="" style="height: 500px;background-color: #0084FF;">
			
		</div>
		
		<div class="tab" ref="tab">
		  <ul class="tab_content" ref="tabWrapper">
		   <li class="tab_item" v-for="item in newList" ref="tabitem">
		     	<div id="" :style="'background: url('+item.thumbImageUrl+') center center / 100% auto no-repeat;height: 150px;width: 150px;'">
		     	</div>
		     	<p style="text-align: center;">{{item.title}}</p>
				<p style="color: #e8732c;font-weight: 700;text-align: center;">￥{{item.salePrice}}</p>
		   </li>
		  </ul>
		</div>
		<div id="" style="height: 500px;background-color: #04BE02;">
			
		</div>
	</div>
 </template>
 <script>
 import BScroll from 'better-scroll';
  export default {
   data() {
    return{
     	newList:[
   			{
   				thumbImageUrl:  'http://prev01.s1.51jujibao.com/images/20180117/debc06ba6b714ca9a89fefdd64da6e29.jpg',
   				title: '哈哈哈哈',
   				salePrice: '100'
   			},
   			{
   				thumbImageUrl:  'http://prev01.s1.51jujibao.com/images/20180117/540330f861ed49c1b3fe6fe18fccff12.jpg',
   				title: '的旷达科技',
   				salePrice: '100'
   			},
   			{
   				thumbImageUrl:  'http://prev01.s1.51jujibao.com/images/20180117/29ee186164d94eacb897928273ea3bc1.jpg',
   				title: '少时诵诗书',
   				salePrice: '100'
   			}
     	]
    }
   },
   created() {
    this.$nextTick(() => {
     this.InitTabScroll();
    });
   },
   methods:{
    InitTabScroll(){
     let width=0
     for (let i = 0; i <this.newList.length; i++) {
       width+=this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
     }
     this.$refs.tabWrapper.style.width=width+'px'
     this.$nextTick(()=>{
       if (!this.scroll) {
        this.scroll=new BScroll(this.$refs.tab, {
         startX:0,
         click:true,
         scrollX:true,
         scrollY:false,
         eventPassthrough:'vertical'
        });
       }else{
        this.scroll.refresh()
       }
     });
    }
   }
  };
 </script>
 <style lang="less" >
 #execrise{
 	.tab{
	  	width: 100vw;
	  	overflow: hidden;
		padding:5px;
		max-width: 750px;
    	box-sizing: border-box;
		.tab_content{
		 	line-height: 2rem;
		 	display: flex;
		.tab_item{
		  	flex: 0 0 60px;
	    	list-style: none;
	    	padding: 10px;
	    	box-sizing: border-box;
	   	} 
	  	}
	 }	
 }
  
 </style>