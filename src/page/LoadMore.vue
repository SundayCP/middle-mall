<template>
    <div class="vux-lm-view">
      <view-box ref="viewBox">
        <div class="header">
          <x-header :left-options="{backText: ''}">加载更多</x-header>
        </div>
        <div class="index-wrapper">
    	    <scroller :on-infinite="infinite" ref="myscroller" class="my-scroller">
    	        
    	        <div class="shop-box">
    	            <ul>
    	                <li v-for="m in movieList">
    	                    <h4 style="text-align:center;padding:10px 0;">我是第{{m}}条数据</h4>
    	                </li>
    	            </ul>
    	        </div>
    	    </scroller>
  	    </div>

      </view-box>
    </div>
</template>

<script>
import {ViewBox , XHeader} from 'vux'
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller); 

export default {
  components: {
    XHeader,
    ViewBox
  },
  data () {
    return {

        noData: '',
        movieList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }

  },
  methods: {
        infinite(done) {
            console.log(this.noData)
            if(this.noData) {
            setTimeout(()=>{
                this.$refs.myscroller.finishInfinite(2);
            })
            return;
            }
            let self = this;
            let start = this.movieList.length;
            console.log(start)
            setTimeout(() => {
                for(let i = start + 1; i < start + 11; i++) {
                    self.movieList.push(i)
                }
                if(start > 20) {
                    self.noData = "没有更多数据"
                }
                self.$refs.myscroller.resize();
                done()
            }, 1500)

        },


	}
}
</script>

<style lang="less">

.vux-lm-view {
  height: 100%;

	.vux-header {
	  background-color: #fff;
	}
	.vux-header .vux-header-title {
	    color: #252525;
	    font-size: 1.125rem;
	    text-align: center;
	}
  .my-scroller{
    top: 40px
  }

  ._v-container>._v-content>.loading-layer[data-v-ecaca2b0] {
    padding-bottom: 100px
  }
	
}

</style>
