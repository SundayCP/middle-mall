<template>
      <tabbar slot="bottom" @on-index-change="onIndexChange">
          <tabbar-item :selected = "message == 'xuan'" @on-item-click="JoinMyStore">
            <img slot="icon" src="../assets/xuan.png">
            <img slot="icon-active" src="../assets/xuan-select.png">
            <span slot="label">店主精选</span>
          </tabbar-item>
          <tabbar-item :selected = "message == 'find'" link="/find">
            <img slot="icon" src="../assets/find.png">
            <img slot="icon-active" src="../assets/find-select.png">
            <span slot="label">发现</span>
          </tabbar-item>
          <tabbar-item :selected = "message == 'more'" link="/more">
            <img slot="icon" src="../assets/more.png">
            <img slot="icon-active" src="../assets/more-select.png">
            <span slot="label">更多好货</span>
          </tabbar-item>
          <tabbar-item :selected = "message == 'mine'" link="/center">
            <img slot="icon"  src="../assets/mine.png">
            <img slot="icon-active" src="../assets/mine-select.png">
            <span slot="label">个人中心</span>
          </tabbar-item>
        </tabbar>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
import store from '../store'
export default {
  components: {
    Tabbar, 
    TabbarItem
  },
  props: {
    message: String  //定义传值的类型
  },
  data () {
    return {
      merchantId : 1000
    }
  },
  methods:{
    onIndexChange (newIndex, oldIndex) {
      // console.log(newIndex, oldIndex,this.message)
    },
    JoinMyStore (){
      let _this = this
      let _merchantId = window.localStorage.getItem("merchantId")
      let _isUser = window.localStorage.getItem("isUser")
      if (_merchantId && _isUser) {
        _this.$router.push('/mystore/'+_merchantId+'/'+_isUser)
      }else{
        _this.$router.push('/mystore/0/N')
      }
    } 

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .weui-tabbar {
      position: fixed;
      
      .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
        color: #ff2c22;
      }
  }
  
</style>
