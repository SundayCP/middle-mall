// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import  { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'
import VueWechatTitle from 'vue-wechat-title'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'




Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueWechatTitle)

// Vue.use(Uploader);

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//     routes
// })


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app-box')
