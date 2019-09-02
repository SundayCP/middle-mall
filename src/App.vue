<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.pageTitle' :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
      key() {
          return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
      }
  },

}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #f5f5f5;
  max-width: 750px;
  margin: 0 auto;
}
</style>
